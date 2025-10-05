const fs = require('fs');
const path = require('path');

const consoleScript = fs.readFileSync(path.join(__dirname, '../public/dashboard-console-capture.js'), 'utf8');

const scriptTag = `<script>${consoleScript}</script>`;

function injectScript(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  if (html.includes('dashboard-console-capture')) {
    return;
  }
  
  html = html.replace('</head>', `${scriptTag}</head>`);
  
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ Injected console capture script into ${htmlPath}`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

const outDir = path.join(__dirname, '../.next/server/pages');
if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log('✅ Console capture script injection complete');
} else {
  console.log('⚠️ Output directory not found. Run build first.');
}