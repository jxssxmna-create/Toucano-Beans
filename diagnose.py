const fs = require('fs');
const path = require('path');

console.log("🔍 Inspecting Toucano Beans project for Vercel 404 deployment issues...\n");

const errors = [];
const warnings = [];

// 1. Check for index.html in Root
if (!fs.existsSync('index.html')) {
  errors.push("❌ Missing index.html file in the root directory.");
} else {
  console.log("✅ index.html exists in the root directory.");
  const htmlContent = fs.readFileSync('index.html', 'utf8');

  // Check if index.html incorrectly references raw JSX directly in standard static mode
  if (htmlContent.includes('.jsx') && !fs.existsSync('vite.config.js')) {
    errors.push("❌ index.html imports a (.jsx) file, but no build tool (e.g., Vite) is detected.");
  }
}

// 2. Check for React source directory and package.json configuration
const hasSrcFolder = fs.existsSync('src');
const hasPackageJson = fs.existsSync('package.json');

if (hasSrcFolder && !hasPackageJson) {
  errors.push("❌ React source files detected in '/src', but 'package.json' is missing. Vercel will fail to execute a build step.");
}

// 3. Check for vercel.json configuration
if (fs.existsSync('vercel.json')) {
  warnings.push("⚠️ 'vercel.json' detected in root. Ensure its rewrite rules point to valid routes.");
}

// 4. Verify public assets directory
if (fs.existsSync('public/assets') || fs.existsSync('public')) {
  console.log("✅ Public assets directory verified.");
} else {
  warnings.push("⚠️ 'public/assets' directory was not found in the expected path.");
}

// Print final audit report
console.log("\n--------------------------------------------------");
if (errors.length === 0 && warnings.length === 0) {
  console.log("🎉 No project structure errors detected. Any remaining 404 issue is related to Vercel dashboard settings.");
} else {
  if (errors.length > 0) {
    console.log("🚨 Errors causing potential 404 build failures:");
    errors.forEach(err => console.log(err));
  }
  if (warnings.length > 0) {
    console.log("\n⚠️ Warnings & Notes:");
    warnings.forEach(warn => console.log(warn));
  }
}
