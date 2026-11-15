// Minimal zero-dependency static server for the BizTrade site.
// Usage: node serve.js  (PORT env var optional, defaults to 3000)
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = path.join(root, path.normalize(urlPath).replace(/^(\.\.[/\\])+/, ''));
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // fall back to the landing page for unknown paths
        fs.readFile(path.join(root, 'index.html'), (e2, home) => {
          if (e2) return res.writeHead(404).end('Not found');
          res.writeHead(200, { 'Content-Type': types['.html'] }).end(home);
        });
        return;
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      }).end(data);
    });
  })
  .listen(port, '0.0.0.0', () => console.log('BizTrade site on http://0.0.0.0:' + port));
