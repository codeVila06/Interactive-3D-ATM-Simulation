const fs = require('fs');
const path = require('path');

const distDir = './dist';
const indexPath = path.join(distDir, 'index.html');
const outPath = './Standalone_ATM_Simulation.html';

let html = fs.readFileSync(indexPath, 'utf8');

// Find all css and js files
const files = fs.readdirSync(distDir);
const jsFiles = files.filter(f => f.endsWith('.js'));
const cssFiles = files.filter(f => f.endsWith('.css'));

// Replace external script tags with inline scripts at the END of the document
for (const jsFile of jsFiles) {
    const jsContent = fs.readFileSync(path.join(distDir, jsFile), 'utf8');
    const regex = new RegExp(`<script defer(?:="defer"|) src="${jsFile}"></script>`);
    html = html.replace(regex, ''); // Remove from head
    html = html.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`); // Inject at bottom
}

// Replace external link tags with inline styles
for (const cssFile of cssFiles) {
    const cssContent = fs.readFileSync(path.join(distDir, cssFile), 'utf8');
    const regex = new RegExp(`<link href="${cssFile}" rel="stylesheet">`);
    html = html.replace(regex, `<style>\n${cssContent}\n</style>`);
}

fs.writeFileSync(outPath, html);
console.log('Successfully created ' + outPath + ' with deferred body scripts!');
