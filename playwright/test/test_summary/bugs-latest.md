# Bug & Gap Report — 2026-06-28T18-56-10-883Z

Generated: 2026-06-28T18:56:10.883Z

- Explicit gap/ambiguous-outcome records: **0**
- Hard test failures (assertion mismatch): **63**

## Hard Test Failures

### TC-OSM-001 — TC-OSM-001: :id = valid existing order
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-002 — TC-OSM-002: :id = 0 (Min-1)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-003 — TC-OSM-003: :id = non-existent integer (99999)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-004 — TC-OSM-004: :id = negative (-1)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-005 — TC-OSM-005: :id = string "abc"
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-006 — TC-OSM-006: :id = float "1.5"
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-007 — TC-OSM-007: :id = SQL Injection
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-008 — TC-OSM-008: No Authorization header
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-009 — TC-OSM-009: Regular user token on admin endpoint
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-010 — TC-OSM-010: pending -> confirmed (VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-011 — TC-OSM-011: pending -> canceled (VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-012 — TC-OSM-012: pending -> shipping (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-013 — TC-OSM-013: pending -> delivered (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-014 — TC-OSM-014: pending -> pending (Self-transition INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-015 — TC-OSM-015: confirmed -> shipping (VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-016 — TC-OSM-016: confirmed -> canceled (VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-017 — TC-OSM-017: confirmed -> pending (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-018 — TC-OSM-018: confirmed -> delivered (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-019 — TC-OSM-020: shipping -> delivered (VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-020 — Unknown
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-021 — TC-OSM-021: shipping -> canceled (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-022 — TC-OSM-022: shipping -> confirmed (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-023 — TC-OSM-023: shipping -> pending (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-024 — TC-OSM-024: shipping -> shipping (Self-transition INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-025 — TC-OSM-025: delivered -> confirmed (INVALID - Terminal State)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-026 — TC-OSM-026: delivered -> pending (INVALID - Terminal State)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-027 — TC-OSM-027: delivered -> shipping (INVALID - Terminal State)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-028 — TC-OSM-028: delivered -> canceled (INVALID - Terminal State)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-029 — TC-OSM-029: delivered -> delivered (Self-transition INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-030 — TC-OSM-030: canceled -> delivered (DEFECT-01 - Anomalous VALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-031 — TC-OSM-031: canceled -> pending (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-032 — TC-OSM-032: canceled -> confirmed (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-033 — TC-OSM-033: canceled -> shipping (INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-034 — TC-OSM-034: canceled -> canceled (Self-transition INVALID)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-035 — TC-OSM-035: status = null
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-036 — TC-OSM-036: status missing from body
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-037 — TC-OSM-037: status = "" (Empty String)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-038 — TC-OSM-038: status = "Confirmed" (Wrong Case)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-039 — TC-OSM-039: status = "CONFIRMED" (Uppercase)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-040 — TC-OSM-040: status = "refunded" (Out of Enum)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-041 — TC-OSM-041: status = "processing" (Out of Enum)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-042 — TC-OSM-042: status = " confirmed" (Leading Space)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-043 — TC-OSM-043: status = 1 (Wrong Type)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-044 — TC-OSM-044: Empty Request Body
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-045 — TC-OSM-045: Happy Path - Cancel Own Pending Order
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-046 — TC-OSM-046: Cancel Own Confirmed Order
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-047 — TC-OSM-047: Cancel Another User's Order (BOLA / IDOR)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-048 — TC-OSM-048: Cancel Non-existent Order
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-049 — TC-OSM-049: No Authorization Header on Cancel Endpoint
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-050 — TC-OSM-050: :id = 0 on Cancel Endpoint
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-051 — TC-OSM-051: :id = -1 on Cancel Endpoint
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-052 — TC-OSM-052: :id = "abc" on Cancel Endpoint
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-053 — TC-OSM-053: Cancel pending Order (ALLOWED)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-054 — TC-OSM-054: Cancel confirmed Order (ALLOWED)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-055 — TC-OSM-055: Cancel shipping Order (DEFECT-02 - Currently ALLOWED, Should Be BLOCKED)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-056 — TC-OSM-056: Cancel delivered Order (BLOCKED)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-057 — TC-OSM-057: Cancel Already Canceled Order (BLOCKED)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-058 — TC-OSM-058: Concurrent Admin Status Update on Same Order
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-059 — TC-OSM-059: Admin Updates Status While User Cancels Concurrently
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-060 — TC-OSM-060: Full Happy Path Lifecycle (pending -> confirmed -> shipping -> delivered)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-061 — TC-OSM-061: Update After Terminal State
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-062 — TC-OSM-062: User Cancels Pending Order Then Admin Tries Update
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

### TC-OSM-063 — TC-OSM-063: Admin Cancels Then Attempts canceled -> delivered (DEFECT-01 Path)
- File: `tests\osm.api.spec.cjs`
- Status: failed
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```
