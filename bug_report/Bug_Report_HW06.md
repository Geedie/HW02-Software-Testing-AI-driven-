# HW06 - Comprehensive Bug Audit Report (EShop SUT)

**Student ID:** 23127147  
**Repository:** [HW02-Software-Testing-AI-driven-](https://github.com/Geedie/HW02-Software-Testing-AI-driven-)  
**Target Branch:** `HW06-API-Testing-Xuan`  
**Date:** August 18, 2026  

---

## 1. Executive Summary

During the HW06 API testing pipeline execution across the 3 selected features (FR-02 Login, FR-07 Shopping Cart, FR-18 Admin Order Status Management), a total of **14 genuine software bugs and security vulnerabilities** were identified in the SUT backend (`backend/server.js`).

- **Total Bugs Discovered:** 14
- **Critical Severity:** 3
- **High Severity:** 6
- **Medium Severity:** 4
- **Low Severity:** 1

---

## 2. Bug Severity Breakdown

| Bug ID | Feature / Endpoint | Bug Name & Description | Severity | Source Location (`server.js`) | Verification Method |
|---|---|---|---|---|---|
| **BUG-001** | FR-02 `POST /api/login` | Account locked after 2 wrong attempts (Spec requires 3) | **High** | `server.js:54` (`login_attempts += 2`) | Newman CLI & HTML Report |
| **BUG-002** | FR-02 `POST /api/login` | JWT signed without `exp` expiration claim (tokens never expire) | **High** | `server.js:51` (`jwt.sign(payload, SECRET)`) | Postman Script / Newman |
| **BUG-003** | FR-02 `POST /api/register` | Passwords stored in plain text without bcrypt hashing | **Critical** | `server.js:45` | Source Code Inspection |
| **BUG-004** | FR-02 Auth Architecture | JWT Secret Key hardcoded in backend source code | **High** | `server.js:9` (`SECRET_KEY = "..."`) | Source Code Inspection |
| **BUG-005** | FR-02 `POST /api/login` | Missing rate limiting on authentication endpoint (Brute Force risk) | **Medium** | `server.js:35` | Source Code Inspection |
| **BUG-006** | FR-07 `POST /api/cart` | Negative quantity accepted (`quantity: -1`) with status 200 | **High** | `server.js:290` | Newman CLI & HTML Report |
| **BUG-007** | FR-07 `POST /api/cart` | Negative price accepted (`price: -100`) with status 200 | **Critical** | `server.js:290` | Newman CLI & HTML Report |
| **BUG-008** | FR-07 `POST /api/cart` | Unsanitized XSS payload stored in item name | **Medium** | `server.js:290` | Newman CLI & HTML Report |
| **BUG-009** | FR-07 `POST /api/cart` | Client-controlled price trusted without DB verification (`price: 1`) | **Critical** | `server.js:290` | Newman CLI & HTML Report |
| **BUG-010** | FR-04 `PUT /api/users/me` | Privilege escalation: Regular user can change own role to `admin` | **High** | `server.js:124` | Newman CLI & HTML Report |
| **BUG-011** | FR-07 Cart Storage | Shopping cart stored in volatile memory (`userCarts`), lost on restart | **Medium** | `server.js:292` | Server Process Restart Test |
| **BUG-012** | FR-18 `PUT /api/admin/orders/:id/status` | Missing `isAdmin` middleware on order status update route | **High** | `server.js:525` | Newman CLI & HTML Report |
| **BUG-013** | FR-18 `GET /api/admin/orders` | Missing role verification on admin order list route | **High** | `server.js:510` | Newman CLI & HTML Report |
| **BUG-014** | FR-10 / FR-18 Order State Machine | Invalid state transition from `canceled` to `delivered` allowed | **Medium** | `server.js:550` | Code & State Machine Test |

---

## 3. Detailed Bug Specifications & Reproduction Steps

### 🔴 BUG-001: Account Lockout Threshold Logic Error
- **Endpoint:** `POST /api/login`
- **Severity:** High
- **Description:** Per specification FR-02, a user account should be locked out after 3 consecutive failed login attempts. However, line 54 increments `login_attempts` by `+2` per failed attempt instead of `+1`. As a result, the 2nd failed attempt sets `login_attempts = 4`, locking the account prematurely.
- **Steps to Reproduce:**
  1. Send 1st failed login attempt to `POST /api/login` with wrong password -> Returns 401.
  2. Send 2nd failed login attempt to `POST /api/login` -> Returns 403 (Locked).
- **Impact:** Legitimate users locked out after only 2 typos.

---

### 🔴 BUG-002: JWT Token Lacks Expiration Claim (`exp`)
- **Endpoint:** `POST /api/login`
- **Severity:** High
- **Description:** `jwt.sign({ id, role }, SECRET_KEY)` is called without passing an `expiresIn` option. The issued JWT token has no `exp` payload claim and remains valid indefinitely.
- **Impact:** Stolen authentication tokens can be used forever to impersonate users.

---

### 🔴 BUG-006 & BUG-007: Shopping Cart Accepts Negative Quantity & Negative Price
- **Endpoint:** `POST /api/cart`
- **Severity:** Critical (Price) / High (Quantity)
- **Description:** `POST /api/cart` accepts any JSON body without validating numeric parameters:
  ```json
  { "id": 1, "name": "iPhone", "price": -100, "quantity": -1 }
  ```
  The server responds with `200 OK` (`{"message": "Added to cart"}`).
- **Impact:** Attackers can manipulate cart totals to zero or negative values during checkout.

---

### 🔴 BUG-009: Trust Boundary Violation on Item Price
- **Endpoint:** `POST /api/cart`
- **Severity:** Critical
- **Description:** The backend trusts the `price` parameter provided in the request body instead of querying the actual price from the `products` database table.
- **Impact:** An attacker can purchase a $1,000 product for $0.01 by modifying the HTTP request payload.

---

### 🔴 BUG-010: Privilege Escalation via User Profile Update
- **Endpoint:** `PUT /api/users/me`
- **Severity:** High
- **Description:** Line 124 of `server.js` dynamically builds the SQL UPDATE query based on request body fields. If `role` is included in the payload (e.g. `{"role": "admin"}`), the query updates `users.role` without checking caller permissions.
- **Impact:** Any registered user can elevate their account privileges to `admin`.

---

### 🔴 BUG-012 & BUG-013: Missing Admin Access Control Middleware
- **Endpoints:** `PUT /api/admin/orders/:id/status`, `GET /api/admin/orders`
- **Severity:** High
- **Description:** Both admin endpoints only check `authenticateToken` but omit `isAdmin` verification middleware. A token belonging to a regular user is granted access to view all customer orders and modify order status.
- **Impact:** Violation of SEC-04 (Role-Based Access Control) and IDOR/Privilege Escalation.

---

## 4. GitHub Issues Synchronization

The bugs identified above have been documented on the project's official GitHub Issues page:
- **Repository URL:** [https://github.com/Geedie/HW02-Software-Testing-AI-driven-/issues](https://github.com/Geedie/HW02-Software-Testing-AI-driven-/issues)
- **Evidence Screenshots:** Saved under `bug_report/images/`.

---
