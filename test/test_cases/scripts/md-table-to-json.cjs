const fs = require('fs');
const path = require('path');

// Định nghĩa thư mục gốc chứa các folder FR
const TEST_CASES_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(TEST_CASES_DIR, 'all-testcases.json');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Bỏ qua thư mục scripts để không quét nhầm chính nó
      if (file !== 'scripts') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.toLowerCase().endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

function parseMdToTestCase(filePath) {
  // Đọc file và chuẩn hóa toàn bộ xuống dòng về dạng \n để tránh lỗi trên Windows
  const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
  
  // Trích xuất các thông tin bằng Regex
  const titleMatch = content.match(/^#\s+(.*)/m);
  const reqIdMatch = content.match(/## Requirement ID\s*\n\s*(.*)/);
  const statusMatch = content.match(/HTTP Status\s*=\s*(\d+)/);
  
  // Trích xuất bảng Test data linh hoạt hơn
  const data = {};
  const lines = content.split('\n');
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Nhận diện dòng bắt đầu của bảng Test data
    if (trimmed.toLowerCase().includes('| field | value |')) {
      inTable = true;
      continue;
    }
    
    // Nếu đang ở trong bảng
    if (inTable) {
      // Nếu gặp dòng trống hoặc kết thúc bảng (không bắt đầu bằng |) thì dừng lại
      if (!trimmed.startsWith('|')) {
        if (trimmed !== '') { // Chỉ dừng khi thực sự hết bảng
          inTable = false;
        }
        continue;
      }
      
      // Bỏ qua dòng phân cách |---------|---------|
      if (trimmed.includes('---')) {
        continue;
      }
      
      // Tách dữ liệu của từng dòng trong bảng
      const parts = trimmed.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        const key = parts[0];
        const value = parts[1];
        data[key] = value;
      }
    }
  }

  return {
    id: path.basename(filePath, '.md'),
    title: titleMatch ? titleMatch[1].trim() : 'Unknown',
    requirementId: reqIdMatch ? reqIdMatch[1].trim() : null,
    testData: data,
    expectedStatus: statusMatch ? parseInt(statusMatch[1], 10) : null,
    sourceFile: path.basename(filePath)
  };
}

function main() {
  console.log("Đang bắt đầu quét các file TC...");
  
  if (!fs.existsSync(TEST_CASES_DIR)) {
    console.error(`Lỗi: Không tìm thấy thư mục ${TEST_CASES_DIR}`);
    return;
  }

  const allMdFiles = getAllFiles(TEST_CASES_DIR);
  console.log(`Tìm thấy ${allMdFiles.length} file .md đang xử lý...`);

  const allTestCases = allMdFiles.map(file => parseMdToTestCase(file));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allTestCases, null, 2));
  
  console.log(`\nThành công! Đã tổng hợp ${allTestCases.length} test cases vào: ${OUTPUT_FILE}`);
}

main();