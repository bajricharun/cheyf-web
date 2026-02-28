const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images');

async function processFile(fullPath, file) {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.avif'].includes(ext)) {
    const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
    try {
      await sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log(`Converted ${file} to WEBP`);
      fs.unlinkSync(fullPath); // Delete old file
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

async function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await traverse(fullPath);
    } else {
      await processFile(fullPath, file);
    }
  }
}

traverse(dir).then(() => console.log('Done mapping images!'));
