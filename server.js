const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const BASE_DIR = __dirname;
const PROFILI_DIR = path.join(BASE_DIR, 'gruppi_salvati');

if (!fs.existsSync(PROFILI_DIR)) {
  fs.mkdirSync(PROFILI_DIR, { recursive: true });
}

// Trova l'IP locale della macchina per la rete dell'ufficio / Wi-Fi
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254')) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIp = getLocalIp();

const server = http.createServer((req, res) => {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // API: info rete locale
  if (url.pathname === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ip: localIp, port: PORT }));
    return;
  }

  // API: lista profili salvati sul PC
  if (url.pathname === '/api/profili' && req.method === 'GET') {
    try {
      const files = fs.readdirSync(PROFILI_DIR).filter(f => f.endsWith('.json'));
      const list = files.map(f => {
        try {
          const raw = fs.readFileSync(path.join(PROFILI_DIR, f), 'utf8');
          return JSON.parse(raw);
        } catch(e) {
          return null;
        }
      }).filter(Boolean);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // API: salva profilo sul PC
  if (url.pathname.startsWith('/api/profili/') && req.method === 'POST') {
    const nome = decodeURIComponent(url.pathname.replace('/api/profili/', ''));
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const filePath = path.join(PROFILI_DIR, `Profilo_${nome.replace(/\s+/g, '_')}.json`);
        fs.writeFileSync(filePath, body, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, file: filePath }));
      } catch(err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // File statici
  let filePath = path.join(BASE_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(BASE_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File non trovato');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Server Investimenti Attivo con successo!`);
  console.log(`-------------------------------------------------------`);
  console.log(`💻 Da questo computer:          http://localhost:${PORT}`);
  console.log(`📱 Da cellulare o altri PC LAN: http://${localIp}:${PORT}`);
  console.log(`📁 Cartella profili condivisi:   ${PROFILI_DIR}`);
  console.log(`=======================================================`);
  console.log(`Premi Ctrl+C in questa finestra per arrestare il server.`);
});
