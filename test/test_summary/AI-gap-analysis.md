# AI GAP Report
## EShop BVA Test Generation - AI Performance Assessment
**Scope:** `prompt_log_01.txt` through `prompt_log_04.txt` | **Reference:** `api_specification.md`
**Analyst lens:** AI capability gaps, not code defects

---

## 1. Current AI Performance

### 1.1 Output Quality Assessment

The AI demonstrated strong performance across structured, code-visible logic. Across four features it generated **280+ total test cases** (53 + 57 + 85 + 85), with the following strengths confirmed from log content:

| Dimension | Assessment |
|-----------|------------|
| BVA boundary coverage (Min/Max/±1) |  Consistently applied - e.g., INT32 Min-1/Max+1 on `total_amount` (log_02), array length 0/1/2 on `products` (log_03) |
| Equivalence partitioning |  Valid/Invalid partitions explicit for all fields |
| State machine transition coverage |  All 25 transitions in the 5×5 matrix covered (log_04) |
| Known code defect surfacing |  DEFECT-01 (`canceledtodelivered`) and DEFECT-02 (shipping cancel bug) identified from source comments |
| Mass assignment attack vectors |  Covered in all four logs |
| SQL Injection via parameterized fields |  Consistently tested across all endpoints |
| Automation readiness |  Deterministic exact values in every test case - Postman/Cypress-importable |
| Security depth (input-layer) |  XSS stored, SQLi, null byte, homograph, JWT `alg:none` tested |

**Estimated coverage of basic, directly readable workflows: ~85–90%.** The AI's coverage degrades sharply at the boundary between what is readable from code and what requires system-level or business-context knowledge.

---

### 1.2 Critical Workflows Completely Missed

The following categories were **entirely absent** across all four logs, confirmed by cross-referencing the `api_specification.md`:

#### A - Account Registration (`POST /api/register`) - Missed Workflows

| Missed Area | Why It Matters |
|-------------|----------------|
| **Rate limiting / brute-force protection on registration** | The `login_attempts` and `locked_until` fields exist in the DB schema - but the AI focused on these only as "system-managed fields not in scope." It never tested whether rapid repeated registration attempts (e.g., 100 POSTs/min) trigger any throttle. With no rate limiting, an attacker can enumerate valid emails via duplicate-detection responses. |
| **Account enumeration via error message differentiation** | The AI tested duplicate email to 400/409, but never tested whether the error message for "email already exists" vs "invalid format" leaks different information. Timing attacks on registration are also untested. |
| **Bot/CAPTCHA bypass testing** | No test for automated registration loops. The API spec provides no CAPTCHA, and the AI correctly noted this is missing - but never escalated it as a critical architectural gap in the security section. |
| **Email verification / OTP flow** | The spec shows `POST /api/forgot-password` and `POST /api/reset-password` as separate flows. The AI never tested the linkage: a registered but unverified account should not be able to log in. No test verifies whether a freshly registered account is immediately active. |
| **Password storage audit** | The AI mentioned bcrypt 72-char truncation (GAP-008, log_01) but never tested whether password is actually hashed in storage - i.e., no test that sends a plaintext password and checks the DB column is not plaintext. This is a structural security test entirely absent from all logs. |
| **Response body data leakage on success** | The spec says success returns `{"message": "...", "id": 1}`. The AI never tested whether the success response leaks sensitive fields (e.g., password hash, role, reset_token). |

#### B - Checkout (`POST /api/checkout`) - Missed Workflows

| Missed Area | Why It Matters |
|-------------|----------------|
| **Cart validation before checkout** | The spec shows `POST /api/cart` and `GET /api/cart` as prerequisite flows. The AI tested checkout as a standalone endpoint with direct `total_amount` injection - but never tested whether a user can checkout with `total_amount` that doesn't match their actual cart contents (price manipulation). |
| **Coupon integration at checkout** | `POST /api/apply-coupon` exists in the spec. The AI's TC-CHECKOUT-037 listed `"coupon_code": "FREE"` as an "unknown field" to be ignored - but never raised the question of whether the checkout endpoint *should* accept and validate coupon codes, and what happens if an invalid coupon reduces `total_amount` to zero or negative. |
| **Stock/inventory validation** | No test checks whether a user can checkout for a product with `quantity = 0` in stock. The checkout endpoint only validates `total_amount` and `shipping_address` - there is no product-level integrity check tested. |
| **Order deduplication across sessions** | The AI tested double-submit via concurrent requests (TC-CHECKOUT-035), but never tested replay attacks using the same JWT token on an already-placed order within a session context. |

#### C - Import Products (`POST /api/admin/import-products`) - Missed Workflows

| Missed Area | Why It Matters |
|-------------|----------------|
| **CSV file parsing errors (pre-JSON conversion)** | The feature is called "Import from CSV" but the endpoint receives JSON. The AI never tested what happens when the client-side CSV parser produces malformed JSON (e.g., misaligned columns produce `{"name": "100", "price": "Product A"}`). |
| **Transactional integrity across import batches** | GAP-010 (log_03) mentions no rollback - but the AI never proposed a test that verifies *partial* import results are queryable via `GET /api/products` and don't break catalog display. |
| **Admin token expiry mid-import** | No test for what happens when a long-running bulk import (e.g., 1000 rows) begins with a valid token that expires mid-execution. |

#### D - Order State Machine - Missed Workflows

| Missed Area | Why It Matters |
|-------------|----------------|
| **Webhook/notification triggers on status change** | Real order systems fire email or push notifications on status transitions. The AI never tested whether a transition fires duplicate notifications on retry, or whether the `canceled to delivered` defect triggers a "your order has been delivered" email for a canceled order. |
| **Admin impersonation of user cancel via EP1** | An admin can set `status = "canceled"` via EP1 without the ownership restriction of EP2. The AI noted EP2 ownership but never tested the asymmetry: admin can cancel anyone's order silently through the status update endpoint, bypassing the user-facing cancel audit trail. |
| **Status rollback via EP1 after user cancels via EP2** | User cancels order (EP2 to `canceled`). Admin then tries EP1 `canceled to delivered` (DEFECT-01). The AI flagged DEFECT-01 but never framed this as a combined EP1+EP2 cross-endpoint attack scenario in a single test sequence. |

---

## 2. Data Readiness

### 2.1 Why the AI Required So Many Assumptions (A1–A8 per log)

Across all four logs, the AI generated between 6–8 labeled assumptions per feature. The root cause is a systematic **under-specification of the input context**. The following table maps assumption categories to their source deficiency:

| Assumption Category | Frequency Across Logs | Root Cause |
|--------------------|-----------------------|------------|
| Required vs. optional field status | Every log | No `required: true/false` markers in the provided DB schema or validation snippet |
| HTTP status codes for validation errors | Every log | Server.js snippet shows only the `500` and success paths; `400` validation paths are inferred |
| String min/max lengths | Every log | No `VARCHAR(255)` schema - SQLite TEXT has no inherent limit |
| Float vs. integer type enforcement | log_02, log_03 | Column type is "INTEGER" but JavaScript's loose typing means the server may accept floats silently |
| Admin role check existence | log_03, log_04 | Middleware name (`authenticateToken`) was provided but its implementation (does it check role?) was not |
| FK constraint enforcement | log_03 | SQLite FK constraints are OFF by default; the AI had to assume they may not be enforced |
| bcrypt 72-char truncation | log_01 | Password hashing implementation not shown in the source snippet |
| JWT algorithm restriction | log_02 | JWT library configuration not provided |

### 2.2 Input Data Quality Verdict

The input context is **partially clean but structurally incomplete** for AI analysis. Specifically:

**What was clean:** The DB schema column names and types, the SQL INSERT/UPDATE/SELECT snippets, seed data emails, and the state transition table (log_04) were machine-readable and produced the AI's strongest outputs.

**What was missing and caused assumptions:**
- No OpenAPI/Swagger schema with `required`, `format`, `minimum`, `maximum` annotations
- No middleware implementation code - only the name `authenticateToken` was provided
- No error-handling middleware (no global 400/422 handler shown)
- No `.env` or config showing JWT secret algorithm, token expiry, or bcrypt rounds
- No FK pragma (`PRAGMA foreign_keys = ON`) visible, leaving FK enforcement unknown
- No frontend context showing which fields are rendered as HTML, making XSS impact severity unquantifiable

**Bottom line:** The provided context was sufficient for ~80% of test case generation but insufficient for the remaining 20% that requires knowing *how* middleware, configuration, and runtime behavior interact. The AI correctly flagged these as "Unknown" but could not resolve them without additional context.


---

## 3. Skills Gap (AI Capability Gap)

### 3.1 Static Inference vs. System Design Requirements

The AI operates exclusively as a **static text analyst**. It reads source code snippets as structured documents and applies pattern-matching against known vulnerability categories. It cannot:

| What Requires System Design | AI's Actual Behavior |
|------------------------------------|----------------------|
| Reason about what happens when the JWT token expires mid-request | Assumes tokens are either valid or invalid at request start; no temporal reasoning |
| Know that SQLite FK constraints are disabled by default without `PRAGMA` | Flagged as "Unknown" rather than confidently stating FK is not enforced |
| Infer that a `login_attempts` field implies a lockout mechanism to test | Classified the field as "not user input during registration" and stopped analysis |
| Connect `POST /api/apply-coupon` to `POST /api/checkout` as a dependency | Treated each endpoint as isolated; no cross-endpoint dependency graph was built |
| Recognize that `GET /api/products?search=keyword` is a separate SQL injection surface | This endpoint appears in the API spec but was never raised in any of the four logs |

### 3.2 Identified Weak Areas

**Weakest - Network/Infrastructure Security Layer:** The AI produced zero test cases for: rate limiting, IP-based throttling, DDoS payload amplification through the import endpoint, TLS misconfiguration, or CORS policy validation. These are invisible from source code alone.

**Weak - Business Logic Chains:** The AI analyzed each endpoint in isolation. The spec shows a clear flow: `cart to checkout to order to status update`. None of the logs tested cross-endpoint integrity (e.g., does `total_amount` in the checkout body match the server-computed cart total?).

**Moderate - Temporal/State Behaviors:** Race conditions were flagged in every log, but the AI did not propose concrete concurrency test tooling (e.g., use `Promise.all` with N=10 simultaneous requests, or Apache JMeter thread groups). The tests are conceptually correct but execution-incomplete.

**Strong - Input Boundary and Injection Testing:** The AI's strongest capability is systematic enumeration of field-level boundary points and injection payloads. This is where the log output is most directly usable without human modification.

---

## 4. Root Cause of AI's Misses

### 4.1 Core Causation Map

The AI's blind spots cluster around **three root causes**, which interact:

**Root Cause 1: Prompt scope was field-level, not feature-level**
The input prompt for each feature was structured as a field mapping table (`Input Data Mapping Specification`). This framing caused the AI to analyze the feature as a collection of independent variables rather than as a node in a larger business workflow. When the prompt says "analyze `total_amount` and `shipping_address`," the AI correctly and thoroughly analyzes exactly those two fields - and nothing more. The coupon integration, cart validation, and stock checks exist outside the declared field scope, so the AI never looked for them.

**Root Cause 2: Static code analysis cannot observe runtime behavior**
Several of the most important gaps - FK enforcement, bcrypt hashing, token algorithm restriction, rate limiting middleware - are configuration and runtime decisions that do not appear in source code snippets. The AI cannot execute code, observe network behavior, or read infrastructure configuration. It correctly flags these as "Unknown" but this is the ceiling of its capability without additional context. This is an inherent LLM limitation, not a prompting failure.

**Root Cause 3: Security knowledge is categorically complete but architecturally shallow**
The AI's security test cases (SQL injection, XSS, mass assignment, BOLA) are drawn from a well-internalized OWASP Top 10 pattern library. This produces comprehensive input-layer attack coverage. However, the AI lacks the architectural reasoning to ask "what happens *between* the time this request is received and the time it touches the database?" - where rate limiting, authentication middleware chains, WAF rules, and session management operate. These are not addressed by any of the four logs.

---

## 5. Business Impact (AI's Blind Spots)

| Blind Spot | Business Impact | Severity |
|------------|----------------|----------|
| No rate limiting test on `POST /api/register` | An attacker can create thousands of accounts programmatically, or enumerate existing emails via timing differences in duplicate-detection responses. A credential-stuffing or fake-account farming campaign goes undetected until production incident. | **CRITICAL** |
| No cart-vs-checkout price validation test | A client that manipulates `total_amount` in the checkout body (e.g., sets `total_amount: 1`) places a real order for any cart value. This is a **direct revenue loss** - orders fulfilled at attacker-chosen prices. | **CRITICAL** |
| No coupon integration test at checkout | An expired or already-used coupon applied via `POST /api/apply-coupon` may reduce `total_amount` to zero. If checkout doesn't re-validate the coupon server-side, free orders are possible. | **HIGH** |
| No password storage audit | If the development team skipped bcrypt and stored plaintext passwords (a common mistake in early-stage projects), the AI's test suite would never catch it. A database breach exposes all user passwords in cleartext. | **HIGH** |
| `GET /api/products?search=keyword` SQL injection untested | The search endpoint is a classic reflected SQLi target. The AI's logs cover INSERT/UPDATE queries but never mention GET query parameter injection. If the `search` parameter is not parameterized, the entire database is exfiltrable via a single crafted URL. | **HIGH** |
| No email verification test after registration | If accounts are immediately active without email verification, attackers can register with victim email addresses, potentially locking out legitimate users from their own email domain. | **MEDIUM** |
| No admin-cancels-user-order via EP1 test | An admin can silently cancel any order via the status update endpoint, bypassing the user-facing cancel audit trail. This creates customer service disputes with no system record of who canceled the order. | **MEDIUM** |
| No audit log coverage | Without testing that status change history is recorded, a production defect (DEFECT-01: `canceled to delivered`) may be exploited and leave no forensic trail. | **MEDIUM** |

**Cost estimate for missed coverage:** Discovering the cart price-manipulation vulnerability post-production - even for a single week before detection - could result in orders fulfilled at attacker prices. The `GET /api/products?search` SQLi miss could result in a full database breach, with GDPR/PDPA regulatory penalties, user notification costs, and reputational damage far exceeding the cost of including 10 additional test cases in the current run.

---

## 6. Feasibility to Fix AI Gaps

### 6.1 Gap Closure Effort Estimation

| Gap Category | Fix Approach | Effort | Impact |
|-------------|-------------|--------|--------|
| Add OpenAPI/JSON Schema to input | Run `swagger-autogen` or write a 50-line YAML schema per endpoint | **Low**  | Eliminates ~70% of "Unknown" dual-status test cases |
| Add middleware implementation to prompt | Copy `authenticateToken`, `isAdmin`, `rateLimiter` source into context | **Low**  | Resolves all role-check and rate-limit assumption gaps |
| Add business flow paragraph per feature | Write a 5-sentence pre/post-condition description | **Low** | Unlocks cross-endpoint test generation (carttocheckout, coupon to checkout) |
| Add security architecture config section | Document rate limiting settings, CAPTCHA status, email verification flow | **Medium** (requires Ops/Infra input) | Enables network-layer and authentication flow testing |
| Add `GET` endpoint analysis | Extend prompt to include read endpoints (`GET /api/products?search`, `GET /api/orders/my-orders`) | **Low** (add to feature scope) | Closes the search SQLi and order enumeration blind spots |
| Dynamic testing (runtime behavior) | Cannot be solved by prompting - requires integration with actual test execution tools (Postman/Newman, Cypress, k6) | **High** (separate tooling investment) | Resolves FK enforcement, rate limit effectiveness, bcrypt verification |

**Overall verdict:** ~80% of the AI's blind spots can be closed by enriching the input context. The remaining 20% (runtime behavior, infrastructure security) requires complementary dynamic testing tooling and cannot be resolved through prompting alone.

---

## 7. Risks and Compliance (AI Governance & Risk)

### 7.1 Risks of Misusing AI in Security Testing

**Risk 1 - Completeness Illusion**
The AI's structured output (numbered test cases, clearly labeled Gap IDs, precise HTTP status codes) creates a strong visual impression of thoroughness. A junior team member reviewing the log may interpret "53 test cases covering all BVA boundaries" as equivalent to comprehensive security coverage. In reality, the 53 cases cover field-level input validation but miss system-level attack surfaces entirely.

**Risk 2 - Hallucinated Expected Results for Unknowns**
Across all four logs, the AI assigns expected HTTP status codes (e.g., `400 / 200` or `201 / 400`) to cases it marks as "Unknown." A test engineer automating these cases against a real server will either accept the first option as the baseline, embedding incorrect expected results into the regression suite, or be confused by dual-status expectations and skip automation. Both outcomes degrade test suite reliability.

**Risk 3 - Context Anchoring on Provided Code Only**
The AI never looked beyond the four features explicitly provided, even though the `api_specs.md` contains 15+ endpoints. The `POST /api/apply-coupon`, `GET /api/products?search`, `PUT /api/users/me`, and `DELETE /api/admin/users/:id` endpoints are all visible in the spec and all carry significant security test implications - but were never mentioned in any log. Teams that provide context A get analysis of context A only; they will not be warned about context B.

**Risk 4 - AI-Generated Tests as the Sole Security Gate**
If the CI/CD pipeline runs only AI-generated test cases as its security gate, the pipeline will pass for vulnerabilities that require dynamic observation (rate limiting effectiveness, actual password hashing, session fixation) - giving a false green status before deployment.

---

### 7.2 Proposed AI Governance Process

**Stage 1 - Input Standardization (Before Each AI Run)**

Establish a mandatory input template that includes:
- Full endpoint source code (handler + all middleware in the call chain)
- OpenAPI/JSON Schema with `required`, `type`, `format`, `minimum`, `maximum`
- Business flow description (pre/post conditions, integration points)
- Security architecture summary (rate limits, CAPTCHA, auth mechanism, hashing algorithm)
- Scope boundary declaration (list all related endpoints the AI should cross-reference)

*Governance rule:* No AI test generation run is initiated without a completed input template reviewed by a senior engineer.

**Stage 2 - AI Output Review Checklist (Human-in-the-Loop)**

After each AI run, a qualified reviewer completes a fixed checklist before the test cases are merged into the regression suite:

- [ ] Are all cross-endpoint dependencies (carttocheckout, coupontocheckout) represented?
- [ ] Are rate limiting and bot-mitigation tests present?
- [ ] Are all "Unknown" dual-status expected results resolved against actual implementation?
- [ ] Are GET endpoints covered, not just write endpoints?
- [ ] Is a password storage audit test present for any endpoint that processes credentials?
- [ ] Are network-layer tests (rate limits, CORS, TLS) flagged for dynamic testing?

**Stage 3 - Dual-Track Testing (AI Static + Dynamic Runtime)**

AI-generated test cases cover static field-level boundary and injection scenarios. A separate dynamic test track (Newman collection, k6 load test, OWASP ZAP scan) covers the runtime behavior gaps the AI cannot observe. These two tracks are mandatory and complementary - neither alone constitutes a complete security test pass.

**Stage 4 - Assumption Resolution Log**

Every assumption labeled by the AI (e.g., `Assumption A1` through `A8`) must be resolved to a confirmed true/false value by the human reviewer before test cases depending on that assumption are marked as automation-ready. Unresolved assumptions are tagged `PENDING-CLARIFICATION` and excluded from CI gates.

**Stage 5 - Regression Governance**

AI-generated test cases for known defects (DEFECT-01, DEFECT-02 in log_04) are promoted to the permanent regression suite with a `defect-regression` label. Any future deployment that causes these tests to pass when they should fail (indicating a reintroduced bug) triggers a mandatory code review before merge.

---

### 8.3 Anti-Hallucination Measures Specific to This Context

The AI in these logs exhibited two hallucination-adjacent behaviors that require active governance:

**Dual-status inflation:** The AI frequently outputs `400 / 200` or `201 / 400` as expected results when behavior is unknown. This is epistemically honest but operationally useless for automation. Governance fix: require the AI to output only one expected result per test case, with uncertainty communicated as a separate `confidence: low/medium/high` field, not as a dual value. When confidence is low, the test is flagged for human resolution rather than automated execution.

**Scope boundary drift in security section:** In log_03 SEC-011, the AI proposes a ReDoS test case (`name: "aaaa...a!" (50,000 chars)`) despite having noted earlier that there is no name validation regex in the code. This creates a test case that tests a non-existent code path. Governance fix: require the AI to tag each security test with a `precondition` field stating which code element it targets, allowing reviewers to immediately identify tests with no valid target in the current codebase.