/**
 * fixtures/bug-logger.cjs
 *
 * Collects structured "bug" records during a test run and writes them to
 * test/test_summary/bugs-<timestamp>.json (+ a human-readable .md) at the
 * end of the run via the custom reporter (see reporters/bug-reporter.cjs).
 *
 * A "bug" here means: actual behavior diverged from the EXPECTED behavior
 * documented in the BVA/Domain-Testing analysis — including cases flagged
 * as gaps (`notes` in the test-case file) where the analysis predicted two
 * possible outcomes and we want to record which one actually happened.
 *
 * Usage inside a spec:
 *   const { logBug } = require('../fixtures/bug-logger.cjs');
 *   logBug({
 *     testId: tc.id,
 *     title: tc.title,
 *     severity: 'HIGH',
 *     expected: tc.expectedStatus,
 *     actual: response.status(),
 *     requestPayload: tc.testData,
 *     responseBody: bodyText,
 *     gapRef: tc.notes,
 *   });
 */

const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "test", "test_summary");
const RUN_FILE = path.join(OUT_DIR, "_current-run-bugs.ndjson");

function ensureDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

/**
 * Appends one bug record as a line of newline-delimited JSON.
 * NDJSON is used (rather than holding an array in memory) so that
 * parallel Playwright workers can all append safely without clobbering
 * each other's writes.
 */
function logBug(record) {
  ensureDir();
  const line =
    JSON.stringify({
      timestamp: new Date().toISOString(),
      ...record,
    }) + "\n";
  fs.appendFileSync(RUN_FILE, line, "utf-8");
}

function resetRunLog() {
  ensureDir();
  fs.writeFileSync(RUN_FILE, "", "utf-8");
}

module.exports = { logBug, resetRunLog, RUN_FILE, OUT_DIR };
