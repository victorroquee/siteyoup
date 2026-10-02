/* Servidor de teste do site. Existe por um motivo só: o
   `python3 -m http.server` não responde a pedido de faixa (Range), e sem isso
   o navegador não consegue arrastar o vídeo da órbita pelo scroll: ele fica
   parado no primeiro quadro. Na Netlify isso funciona sozinho.

   node servidor.js      e abre http://127.0.0.1:8787  */
const http = require("http"), fs = require("fs"), path = require("path");
const RAIZ = __dirname, PORTA = 8787;
const TIPOS = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".mp4": "video/mp4", ".webm": "video/webm",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon"
};

http.createServer(function (req, res) {
  var caminho = decodeURIComponent(req.url.split("?")[0]);
  if (caminho.endsWith("/")) caminho += "index.html";
  var arquivo = path.join(RAIZ, caminho);
  if (!arquivo.startsWith(RAIZ) || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("não achei");
  }
  var tamanho = fs.statSync(arquivo).size;
  var tipo = TIPOS[path.extname(arquivo)] || "application/octet-stream";
  var faixa = req.headers.range;
  if (faixa) {
    var m = /bytes=(\d*)-(\d*)/.exec(faixa);
    var ini = m[1] ? +m[1] : 0, fim = m[2] ? +m[2] : tamanho - 1;
    res.writeHead(206, {
      "Content-Type": tipo, "Accept-Ranges": "bytes",
      "Content-Range": "bytes " + ini + "-" + fim + "/" + tamanho,
      "Content-Length": fim - ini + 1
    });
    return fs.createReadStream(arquivo, { start: ini, end: fim }).pipe(res);
  }
  res.writeHead(200, { "Content-Type": tipo, "Accept-Ranges": "bytes", "Content-Length": tamanho });
  fs.createReadStream(arquivo).pipe(res);
}).listen(PORTA, function () { console.log("YOUP no ar em http://127.0.0.1:" + PORTA); });
