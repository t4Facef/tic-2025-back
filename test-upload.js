// Script para testar se as imagens estão sendo salvas corretamente
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

function listUploads(dir, level = 0) {
  if (!fs.existsSync(dir)) {
    console.log('Pasta uploads não existe ainda');
    return;
  }
  
  const items = fs.readdirSync(dir);
  const indent = '  '.repeat(level);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      listUploads(itemPath, level + 1);
    } else {
      const size = (stats.size / 1024).toFixed(2);
      console.log(`${indent}📄 ${item} (${size} KB)`);
    }
  });
}

console.log('📂 Estrutura de uploads:');
listUploads(uploadsDir);