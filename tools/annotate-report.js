const fs = require('fs');
const path = require('path');

const reportPath = path.resolve(__dirname, '..', 'playwright-report', 'index.html');
const studentId = process.argv[2] || process.env.TEST_RUN_BY || 'PStudentID';

if (!fs.existsSync(reportPath)) {
  console.error('Report file not found:', reportPath);
  process.exit(2);
}

let html = fs.readFileSync(reportPath, 'utf8');

const bannerId = 'annotated-run-by-banner';
const timestamp = new Date().toISOString();
const bannerHtml = `\n<!-- Run-by banner injected by tools/annotate-report.js -->\n<div id="${bannerId}" style="position:fixed;left:0;right:0;top:0;background:#0b5cff;color:white;padding:6px 12px;font-family:Arial,sans-serif;z-index:9999;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.2)">Run by: <strong>${studentId}</strong> — ${timestamp}</div>\n`;

if (html.includes(`id=\"${bannerId}\"`) || html.includes(`id='${bannerId}'`)) {
  console.log('Banner already present. Updating timestamp and student id.');
  html = html.replace(/<div id="${bannerId}"[\s\S]*?<\/div>/, bannerHtml);
} else {
  // Insert banner right after opening <body>
  const bodyIdx = html.search(/<body[\s\S]*?>/i);
  if (bodyIdx === -1) {
    console.error('Could not find <body> tag in report HTML');
    process.exit(3);
  }
  const insertPos = html.indexOf('>', bodyIdx) + 1;
  html = html.slice(0, insertPos) + bannerHtml + html.slice(insertPos);
}

fs.writeFileSync(reportPath, html, 'utf8');
console.log('Banner injected into', reportPath);
console.log('Banner HTML:');
console.log(bannerHtml);
