/**
 * fixtures/auth.cjs
 *
 * Shared helper to obtain JWT tokens for seeded accounts via POST {LOGIN_PATH}.
 * Used by any spec that needs an authenticated request context
 * (e.g. CHECKOUT, IMPORT, OSM — added in later iterations).
 *
 * Usage:
 *   const { loginAs } = require('../fixtures/auth.cjs');
 *   const token = await loginAs(request, 'user');   // or 'admin'
 */

const ACCOUNTS = {
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  user: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  },
};

const LOGIN_PATH = process.env.LOGIN_PATH || "/api/login";

/**
 * Logs in as the given role ('admin' | 'user') using Playwright's
 * `request` fixture and returns the raw bearer token string.
 * Throws a descriptive error if login fails, so failures surface
 * clearly in the bug report rather than as a confusing downstream 401.
 */
async function loginAs(request, role) {
  const account = ACCOUNTS[role];
  if (!account || !account.email) {
    throw new Error(
      `[auth.cjs] No credentials configured for role "${role}". Check .env (ADMIN_EMAIL/USER_EMAIL).`
    );
  }

  const response = await request.post(LOGIN_PATH, {
    data: { email: account.email, password: account.password },
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => "<unreadable body>");
    throw new Error(
      `[auth.cjs] Login failed for role "${role}" (${account.email}) at ${LOGIN_PATH}. ` +
        `Status: ${response.status()}. Body: ${body}`
    );
  }

  const json = await response.json();
  const token = json.token || json.accessToken || json.jwt;

  if (!token) {
    throw new Error(
      `[auth.cjs] Login succeeded but no token field found in response for role "${role}". ` +
        `Response keys: ${Object.keys(json).join(", ")}. ` +
        `Update auth.cjs to match the actual field name your API returns.`
    );
  }

  return token;
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

module.exports = { loginAs, authHeader, ACCOUNTS, LOGIN_PATH };
