# AI Audit Report — HW06 API Testing
## Student ID: 23127147
## Date: 2026-08-17

---

> **Declaration:** I use AI tools for the following tasks in this assignment.

---

## Interaction 1 — Understanding API Specification

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 (Antigravity IDE) |
| **Date & Time** | 2026-08-17 23:21 +07:00 |
| **Task** | Analyze EShop API specification to select 3 APIs for testing |

**My Prompt:**
```
Given the EShop API specification (api_specification.md) and requirements in 2026.HW06.md,
analyze all available APIs and suggest which 3 APIs I should select - one from Pool A
(Authentication/Products), one from Pool B (Cart/Orders), one from Pool C (Admin).
Consider testability, complexity, and bug-finding potential.
```

**AI Output:**
The AI analyzed the API spec and recommended:
- Pool A: POST /api/login — rich state machine (lockout), security concerns (plaintext password, no rate limiting)
- Pool B: POST/GET /api/cart — no input validation, client-controlled price, in-memory storage issues
- Pool C: PUT /api/admin/orders/:id/status — complex state machine, missing role checks

**Human Review:** Approved. These selections offer the best coverage of different testing dimensions.

---

## Interaction 2 — Generating Test Cases for API1 (Login)

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 |
| **Date & Time** | 2026-08-17 23:30 +07:00 |
| **Task** | Generate 35+ test cases for POST /api/login |

**My Prompt (Step 1 — Domain Partitions):**
```
For POST /api/login with body {"email": string, "password": string}:
Step 1: Identify all domain partitions for the 'email' parameter.
Consider: valid format, invalid format (no @, no domain), empty, null, very long,
special characters, SQL injection payloads, XSS payloads.
Generate test cases for each partition.
```

**AI Output (Step 1):** Generated 15 test cases covering email partitions:
- Valid email formats (existing user, non-existing user)
- Invalid formats (no @, no domain, spaces)
- Edge cases (empty, null, very long string)
- Attack patterns (SQL injection, XSS)

**My Prompt (Step 2 — State Transitions):**
```
Now for the login endpoint, Step 2: The system has an account lockout feature.
After N failed login attempts, the account is locked for 3 minutes.
Generate test cases covering all state transitions:
State: [unlocked] → failed attempt → [1 attempt] → ... → [locked]
Also cover: login success resets counter, locked account attempt, account unlocking after timeout.
```

**AI Output (Step 2):** Generated 8 state transition test cases.

**Human Corrections Applied:**
- TC-API1-020: AI wrote "after 3 wrong attempts, account locked" but code bug shows it locks after 2 due to `+2` increment
- TC-API1-039: AI missed that JWT has no expiry — added manually

---

## Interaction 3 — Generating Test Cases for API2 (Shopping Cart)

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 |
| **Date & Time** | 2026-08-17 23:45 +07:00 |
| **Task** | Generate 35+ test cases for Shopping Cart APIs |

**My Prompt:**
```
For the Shopping Cart APIs:
- GET /api/cart: returns cart items for authenticated user
- POST /api/cart: adds item to cart with body {id, name, price, quantity}

Step 1: Domain partitions on parameters (id, name, price, quantity).
Step 2: Authentication tests (no token, invalid token, expired token).
Step 3: Security tests (IDOR between users, XSS in name, SQL injection).
Step 4: Schema validation tests (response structure).
Generate at least 35 test cases total.
```

**AI Output:** Generated 35 test cases covering all categories.

**Human Corrections Applied:**
- TC-API2-009, 012: AI labeled these as "expected 400" — but actual response is 200 (bugs). Changed Audit label to INVALID.
- TC-API2-EXT-003, 004: Added manually — AI missed the price chain attack and in-memory cart vulnerability.

---

## Interaction 4 — Generating Test Cases for API3 (Admin Order Status)

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 |
| **Date & Time** | 2026-08-18 00:00 +07:00 |
| **Task** | Generate 35+ test cases for PUT /api/admin/orders/:id/status |

**My Prompt (Step 1 — State Machine):**
```
The order state machine has these transitions:
- pending → confirmed ✓
- pending → canceled ✓
- confirmed → shipping ✓
- confirmed → canceled ✓
- shipping → delivered ✓
All other transitions are INVALID.

Step 1: Generate test cases for ALL valid transitions (should return 200).
Step 2: Generate test cases for ALL invalid transitions (should return 400).
Include self-transitions (pending → pending) and transitions from terminal states.
```

**My Prompt (Step 2 — Security):**
```
Step 2: This is an admin-only endpoint. Generate security test cases:
- Non-authenticated request (no token) → expect 401
- Authenticated but non-admin user → expect 403
- Invalid token → expect 403
- IDOR: accessing orders of other users
```

**AI Output:** Generated 35+ test cases.

**Human Corrections Applied:**
- TC-API3-013: AI assumed canceled is terminal. After reading source code (server.js:550), found `canceled → delivered` is allowed (BUG). Marked as INVALID.
- TC-API3-017: AI assumed admin routes have role checks. After reading source code, no role validation found. Marked as INVALID (BUG).
- TC-API3-038: AI tested non-authenticated GET /api/admin/orders but not non-admin authenticated access. Added manually.

---

## Interaction 5 — Creating Postman Collection

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 |
| **Date & Time** | 2026-08-18 00:15 +07:00 |
| **Task** | Generate Postman collection JSON with test scripts |

**My Prompt:**
```
Create a Postman collection JSON for the EShop API tests with:
1. Collection-level pre-request script that adds X-Student-Id: 23127147 header to ALL requests
2. Setup folder: login as user, login as admin, add to cart, checkout
3. API1 folder: 12 key login test cases with test assertions
4. API2 folder: 10 key cart test cases with test assertions
5. API3 folder: 10 key order status test cases with state machine coverage
Use pm.test() for assertions, pm.collectionVariables.set() for token storage.
```

**AI Output:** Generated the Postman collection JSON structure.

**Human Corrections Applied:**
- Fixed token extraction path (`json.token` vs `json.data.token`)
- Added BUG documentation in test scripts as `console.log` messages
- Adjusted test assertions for known bugs (expected-vs-actual documentation)

---

## Interaction 6 — Agent Skill Design

| Field | Detail |
|-------|--------|
| **AI Tool** | Claude Sonnet 4.6 |
| **Date & Time** | 2026-08-18 00:30 +07:00 |
| **Task** | Design AI-driven test generator architecture |

**My Prompt:**
```
Help me design (NOT implement) an AI-driven API test generator system.
Given an API specification as input, the system should:
1. Parse the API spec (endpoints, parameters, schemas)
2. Use AI to generate test cases covering all dimensions
3. Output executable Postman collection
Describe the architecture with components and data flow.
I will draw the diagram myself.
```

**AI Output:** Described a pipeline: Parser → Analyzer → Prompt Builder → AI Engine → Test Generator → Output Formatter.

**Human Design Decision:** Chose to add a "Human Audit Gate" between AI Engine and Output — this is my own design decision not from the AI.
