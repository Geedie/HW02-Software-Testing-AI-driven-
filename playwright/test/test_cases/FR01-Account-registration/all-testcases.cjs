/**
 * test/test_cases/FR01-Account-registration/all-testcases.cjs
 *
 * Auto-derived from BVA/Domain-Testing analysis of POST /api/register (FR01).
 * Source: prompt_log_01.txt (TC-REG-001 .. TC-REG-035)
 *
 * Schema (kept identical to the user's existing all-testcases.cjs convention):
 * {
 *   id: string,
 *   title: string,
 *   requirementId: string,
 *   testData: object,        // request body to send
 *   expectedStatus: number | number[],  // some cases have ambiguous/unknown expected status (gap in spec)
 *   sourceFile: string,
 *   notes?: string            // optional — flags "Unknown"/gap-driven expectations
 * }
 *
 * NOTE: Several cases in the original analysis have dual possible expected
 * statuses (e.g. "201 / 400") because the spec did not confirm validation
 * behavior. Where that happens, expectedStatus is an array; the test
 * treats ANY status in that array as a PASS, but logs which one actually
 * occurred so it can be reviewed as a potential bug/gap in the bug report.
 */

const BASE = {
  name: "John Doe",
  email: "newuser@test.com",
  password: "Password123!",
  phone: "0901234567",
  shipping_address: "123 Main St",
};

module.exports = [
  {
    id: "TC-REG-001",
    title: "TC-REG-001: Happy path — valid full registration",
    requirementId: "FR-REG-01",
    testData: { ...BASE },
    expectedStatus: 201,
    sourceFile: "TC-REG-001.md",
  },
  {
    id: "TC-REG-002",
    title: "TC-REG-002: Happy path — minimal required fields only",
    requirementId: "FR-REG-01",
    testData: { name: "Jane", email: "minimal@test.com", password: "pass" },
    expectedStatus: 201,
    sourceFile: "TC-REG-002.md",
  },
  {
    id: "TC-REG-003",
    title: "TC-REG-003: Duplicate email rejected",
    requirementId: "FR-REG-01",
    testData: { name: "Dup User", email: "admin@eshop.com", password: "pass123" },
    expectedStatus: 400,
    sourceFile: "TC-REG-003.md",
  },
  {
    id: "TC-REG-004",
    title: "TC-REG-004: Duplicate email (case variant) — gap candidate",
    requirementId: "FR-REG-01",
    testData: { name: "Dup User 2", email: "Admin@Eshop.com", password: "pass123" },
    expectedStatus: [201, 400],
    notes: "GAP-006 / ENH-008: case-insensitive uniqueness not confirmed.",
    sourceFile: "TC-REG-004.md",
  },
  {
    id: "TC-REG-005",
    title: "TC-REG-005: role omitted defaults to user (covered again at REG-025)",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "roledefault2@test.com", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-005.md",
  },
  {
    id: "TC-REG-006",
    title: "TC-REG-006: Valid email + valid password nominal",
    requirementId: "FR-REG-01",
    testData: { name: "Nominal User", email: "nominal@test.com", password: "Nominal123!" },
    expectedStatus: 201,
    sourceFile: "TC-REG-006.md",
  },
  {
    id: "TC-REG-007",
    title: "TC-REG-007: Missing name field",
    requirementId: "FR-REG-01",
    testData: { email: "noname@test.com", password: "pass123" },
    expectedStatus: [201, 400],
    notes: "GAP-001: name required-ness unknown.",
    sourceFile: "TC-REG-007.md",
  },
  {
    id: "TC-REG-008",
    title: "TC-REG-008: Missing password field",
    requirementId: "FR-REG-01",
    testData: { name: "NoPass", email: "nopass@test.com" },
    expectedStatus: 400,
    sourceFile: "TC-REG-008.md",
  },
  {
    id: "TC-REG-009",
    title: "TC-REG-009: Empty string email",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "", password: "pass123" },
    expectedStatus: 400,
    sourceFile: "TC-REG-009.md",
  },
  {
    id: "TC-REG-010",
    title: "TC-REG-010: Empty string password",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "emptypass@test.com", password: "" },
    expectedStatus: 400,
    sourceFile: "TC-REG-010.md",
  },
  {
    id: "TC-REG-011",
    title: "TC-REG-011: email = null",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: null, password: "pass123" },
    expectedStatus: 400,
    sourceFile: "TC-REG-011.md",
  },
  {
    id: "TC-REG-012",
    title: "TC-REG-012: password = null",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "nullpass@test.com", password: null },
    expectedStatus: 400,
    sourceFile: "TC-REG-012.md",
  },
  {
    id: "TC-REG-013",
    title: "TC-REG-013: Email without @ symbol",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "invalidemail.com", password: "pass123" },
    expectedStatus: [400, 201],
    notes: "GAP-002: email format validation unconfirmed.",
    sourceFile: "TC-REG-013.md",
  },
  {
    id: "TC-REG-014",
    title: "TC-REG-014: Email with no domain",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "user@", password: "pass123" },
    expectedStatus: [400, 201],
    notes: "GAP-002: email format validation unconfirmed.",
    sourceFile: "TC-REG-014.md",
  },
  {
    id: "TC-REG-015",
    title: "TC-REG-015: Email with no local part",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "@example.com", password: "pass123" },
    expectedStatus: [400, 201],
    notes: "GAP-002: email format validation unconfirmed.",
    sourceFile: "TC-REG-015.md",
  },
  {
    id: "TC-REG-016",
    title: "TC-REG-016: Email at RFC min length (6 chars)",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "a@b.co", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-016.md",
  },
  {
    id: "TC-REG-017",
    title: "TC-REG-017: Email at 254 chars (RFC max)",
    requirementId: "FR-REG-01",
    testData: {
      name: "A",
      email: `${"a".repeat(248)}@b.co`, // 248 + 6 = 254 chars total
      password: "pass123",
    },
    expectedStatus: [201, 400],
    notes: "GAP boundary: max length not confirmed.",
    sourceFile: "TC-REG-017.md",
  },
  {
    id: "TC-REG-018",
    title: "TC-REG-018: Email at 255 chars (RFC max+1)",
    requirementId: "FR-REG-01",
    testData: {
      name: "A",
      email: `${"a".repeat(249)}@b.co`, // 249 + 6 = 255 chars total
      password: "pass123",
    },
    expectedStatus: [400, 201],
    notes: "GAP-008: no max length enforced — likely returns 201 (bug candidate).",
    sourceFile: "TC-REG-018.md",
  },
  {
    id: "TC-REG-019",
    title: "TC-REG-019: Password = 1 character (Min)",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "pw1@test.com", password: "a" },
    expectedStatus: [201, 400],
    notes: "GAP-003: min length not enforced — likely 201 (bug candidate).",
    sourceFile: "TC-REG-019.md",
  },
  {
    id: "TC-REG-020",
    title: "TC-REG-020: Password = 1000 chars (stress Max)",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "pw1000@test.com", password: "a".repeat(1000) },
    expectedStatus: 201,
    sourceFile: "TC-REG-020.md",
  },
  {
    id: "TC-REG-021",
    title: "TC-REG-021: name = empty string",
    requirementId: "FR-REG-01",
    testData: { name: "", email: "emptyname@test.com", password: "pass123" },
    expectedStatus: [201, 400],
    notes: "GAP-001: name required-ness unknown.",
    sourceFile: "TC-REG-021.md",
  },
  {
    id: "TC-REG-022",
    title: "TC-REG-022: name = null",
    requirementId: "FR-REG-01",
    testData: { name: null, email: "nullname@test.com", password: "pass123" },
    expectedStatus: [201, 400],
    notes: "GAP-001: name required-ness unknown.",
    sourceFile: "TC-REG-022.md",
  },
  {
    id: "TC-REG-023",
    title: "TC-REG-023: name = 1 char (Min)",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "name1@test.com", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-023.md",
  },
  {
    id: "TC-REG-024",
    title: "TC-REG-024: name = 500 chars (stress)",
    requirementId: "FR-REG-01",
    testData: { name: "A".repeat(500), email: "namelong@test.com", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-024.md",
  },
  {
    id: "TC-REG-025",
    title: "TC-REG-025: role omitted → defaults to 'user'",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "roledefault@test.com", password: "pass123" },
    expectedStatus: 201,
    assertRoleInDb: "user",
    sourceFile: "TC-REG-025.md",
  },
  {
    id: "TC-REG-026",
    title: "TC-REG-026: role = 'user' explicitly",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "roleuser@test.com", password: "pass123", role: "user" },
    expectedStatus: 201,
    assertRoleInDb: "user",
    sourceFile: "TC-REG-026.md",
  },
  {
    id: "TC-REG-027",
    title: "TC-REG-027: Mass assignment — role = 'admin'",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "roleadmin@test.com", password: "pass123", role: "admin" },
    expectedStatus: [201, 400],
    assertRoleInDb: "user",
    notes: "GAP-005/SEC-005: CRITICAL — mass assignment privilege escalation check.",
    sourceFile: "TC-REG-027.md",
  },
  {
    id: "TC-REG-028",
    title: "TC-REG-028: role = invalid enum value",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "roleinvalid@test.com", password: "pass123", role: "superuser" },
    expectedStatus: [400, 201],
    notes: "GAP-009: enum validation on role unconfirmed.",
    sourceFile: "TC-REG-028.md",
  },
  {
    id: "TC-REG-029",
    title: "TC-REG-029: phone optional — omitted",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "nophone@test.com", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-029.md",
  },
  {
    id: "TC-REG-030",
    title: "TC-REG-030: phone = valid nominal",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "phone@test.com", password: "pass123", phone: "0901234567" },
    expectedStatus: 201,
    sourceFile: "TC-REG-030.md",
  },
  {
    id: "TC-REG-031",
    title: "TC-REG-031: phone = non-numeric string",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "phonestr@test.com", password: "pass123", phone: "not-a-phone" },
    expectedStatus: 201,
    sourceFile: "TC-REG-031.md",
  },
  {
    id: "TC-REG-032",
    title: "TC-REG-032: shipping_address optional — omitted",
    requirementId: "FR-REG-01",
    testData: { name: "A", email: "noaddr@test.com", password: "pass123" },
    expectedStatus: 201,
    sourceFile: "TC-REG-032.md",
  },
  {
    id: "TC-REG-033",
    title: "TC-REG-033: Empty request body {}",
    requirementId: "FR-REG-01",
    testData: {},
    expectedStatus: 400,
    sourceFile: "TC-REG-033.md",
  },
  // TC-REG-034 (non-JSON content type) and TC-REG-035 (concurrency) are
  // handled separately in tests/reg.spec.cjs because they need custom
  // request mechanics (raw body / parallel fire) rather than a JSON testData
  // object — see SPECIAL_CASES below.
];

/**
 * Special-mechanic cases that don't fit the flat JSON-body schema above.
 * Consumed directly by tests/reg.spec.cjs.
 */
module.exports.SPECIAL_CASES = {
  nonJsonContentType: {
    id: "TC-REG-034",
    title: "TC-REG-034: Non-JSON content type",
    rawBody: "name=A&email=nonjson@test.com&password=pass",
    contentType: "text/plain",
    expectedStatus: [400, 415],
    sourceFile: "TC-REG-034.md",
  },
  concurrentDuplicate: {
    id: "TC-REG-035",
    title: "TC-REG-035: Concurrent duplicate registration",
    email: "race@test.com",
    payload: { name: "Racer", password: "pass123" },
    expectedOutcome: "exactly one 201, the other 400/409",
    sourceFile: "TC-REG-035.md",
  },
};
