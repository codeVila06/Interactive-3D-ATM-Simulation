const fs = require('fs');

const mdPath = 'C:/Users/PROGRESSIVE/.gemini/antigravity/brain/aadd2e09-aacf-4679-ad2e-159a5a96f843/technical_report.md';
const htmlOutPath = './technical_report.html';

const mdContent = fs.readFileSync(mdPath, 'utf8');

const htmlWrapper = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D ATM Simulation - Technical Report</title>
    <!-- Use marked to parse markdown on the client side -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f4f7f6; 
            margin: 0; 
            padding: 40px 20px; 
        }
        .container { 
            background: #fff; 
            padding: 50px 60px; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
            max-width: 900px; 
            margin: 0 auto; 
        }
        h1, h2, h3, h4 { color: #2c3e50; margin-top: 1.5em; }
        h1 { border-bottom: 2px solid #eaeaea; padding-bottom: 15px; text-align: center; font-size: 2.2em; }
        h2 { border-bottom: 1px solid #eaeaea; padding-bottom: 8px; color: #34495e; }
        code { background: #fdf6e3; padding: 4px 6px; border-radius: 4px; font-family: Consolas, monospace; color: #d14;}
        pre { background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
        pre code { background: none; color: inherit; padding: 0; }
        ul, ol { padding-left: 25px; }
        li { margin-bottom: 8px; }
        hr { border: 0; height: 1px; background: #eaeaea; margin: 30px 0; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container" id="content"></div>
    <textarea id="markdown-source" style="display:none;">
${mdContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
    </textarea>
    <script>
        // Extract the content and decode HTML entities back
        let rawMd = document.getElementById('markdown-source').value;
        rawMd = rawMd.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        
        // Parse and inject
        document.getElementById('content').innerHTML = marked.parse(rawMd);
    </script>
</body>
</html>`;

fs.writeFileSync(htmlOutPath, htmlWrapper);
console.log('Successfully exported technical report to ' + htmlOutPath);
