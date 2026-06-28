/**
 * reporters/bug-reporter.cjs
 *
 * Custom Playwright reporter. On top of whatever built-in reporters are
 * configured (list/html/json), this one:
 *
 *  1. Resets fixtures/bug-logger.cjs's NDJSON file at the start of the run.
 *  2. Walks every finished test result at the end of the run.
 *  3. Merges:
 *       - explicit logBug() records written by specs (gap/ambiguous-status cases)
 *       - any test that simply FAILED (assertion mismatch — a clear-cut bug)
 *  4. Writes:
 *       test/test_summary/bugs-<runId>.json   (machine-readable)
 *       test/test_summary/bugs-<runId>.md     (human-readable, grouped by feature/severity)
 *
 * Register in playwright.config.cjs via:
 *   reporter: [['list'], ['html', {...}], ['./reporters/bug-reporter.cjs']]
 */

const fs = require("fs");
const path = require("path");
const { resetRunLog, RUN_FILE, OUT_DIR } = require("../fixtures/bug-logger.cjs");

class BugReporter {
  onBegin() {
    resetRunLog();
    this._failedTests = [];
  }

  onTestEnd(test, result) {
    if (result.status === "failed" || result.status === "timedOut") {
      this._failedTests.push({
        title: test.title,
        file: test.location?.file
          ? path.relative(process.cwd(), test.location.file)
          : undefined,
        status: result.status,
        error: result.error?.message,
        retries: result.retry,
      });
    }
  }

  onEnd() {
    const runId = new Date().toISOString().replace(/[:.]/g, "-");

    let explicitBugs = [];
    if (fs.existsSync(RUN_FILE)) {
      const lines = fs
        .readFileSync(RUN_FILE, "utf-8")
        .split("\n")
        .filter(Boolean);
      explicitBugs = lines.map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return { parseError: true, raw: l };
        }
      });
    }

    const report = {
      runId,
      generatedAt: new Date().toISOString(),
      summary: {
        explicitBugCount: explicitBugs.length,
        failedAssertionCount: this._failedTests.length,
      },
      explicitBugs,
      failedAssertions: this._failedTests,
    };

    fs.mkdirSync(OUT_DIR, { recursive: true });
    const jsonPath = path.join(OUT_DIR, `bugs-${runId}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf-8");

    const md = renderMarkdown(report);
    const mdPath = path.join(OUT_DIR, `bugs-${runId}.md`);
    fs.writeFileSync(mdPath, md, "utf-8");

    // Also refresh a stable "latest" pointer for convenience.
    fs.writeFileSync(path.join(OUT_DIR, "bugs-latest.json"), JSON.stringify(report, null, 2), "utf-8");
    fs.writeFileSync(path.join(OUT_DIR, "bugs-latest.md"), md, "utf-8");

    console.log(`\n[bug-reporter] ${explicitBugs.length} flagged gap(s) + ${this._failedTests.length} failed assertion(s)`);
    console.log(`[bug-reporter] Report written to:\n  ${jsonPath}\n  ${mdPath}`);
  }
}

function renderMarkdown(report) {
  const lines = [];
  lines.push(`# Bug & Gap Report — ${report.runId}`);
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push(`- Explicit gap/ambiguous-outcome records: **${report.summary.explicitBugCount}**`);
  lines.push(`- Hard test failures (assertion mismatch): **${report.summary.failedAssertionCount}**`);
  lines.push("");

  if (report.explicitBugs.length) {
    lines.push("## Flagged Gaps / Ambiguous Outcomes");
    lines.push("");
    lines.push("| Test ID | Title | Severity | Expected | Actual | Notes |");
    lines.push("|---|---|---|---|---|---|");
    for (const b of report.explicitBugs) {
      lines.push(
        `| ${b.testId || "-"} | ${b.title || "-"} | ${b.severity || "-"} | ${JSON.stringify(
          b.expected
        )} | ${b.actual ?? "-"} | ${b.gapRef || ""} |`
      );
    }
    lines.push("");
  }

  if (report.failedAssertions.length) {
    lines.push("## Hard Test Failures");
    lines.push("");
    for (const f of report.failedAssertions) {
      lines.push(`### ${f.title}`);
      lines.push(`- File: \`${f.file}\``);
      lines.push(`- Status: ${f.status}${f.retries ? ` (retry ${f.retries})` : ""}`);
      if (f.error) {
        lines.push("```");
        lines.push(f.error.slice(0, 2000));
        lines.push("```");
      }
      lines.push("");
    }
  }

  if (!report.explicitBugs.length && !report.failedAssertions.length) {
    lines.push("_No bugs or gaps detected in this run._");
  }

  return lines.join("\n");
}

module.exports = BugReporter;
