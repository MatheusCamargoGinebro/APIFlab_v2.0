const fs = require("fs");
const https = require("https");
const app = require("./app");
const os = require("os");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3333;

// Pega IP local dinamicamente
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}
const host = getLocalIP();

// Lê os arquivos do certificado
const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

// Cria o servidor HTTPS
https.createServer(options, app).listen(port, host, () => {
  console.log(`HTTPS server running at https://${host}:${port}`);
});
