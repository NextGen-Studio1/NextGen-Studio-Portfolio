const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const htmlPath = path.join(__dirname, 'resume.html');
const pdfPath = path.join(__dirname, 'resume.pdf');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const bin = fs.existsSync(chromePath) ? chromePath : edgePath;

console.log('Using binary:', bin);
try {
  execSync(`"${bin}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`);
  console.log('PDF created successfully at:', pdfPath);
} catch (err) {
  console.error('Error generating PDF:', err);
}
