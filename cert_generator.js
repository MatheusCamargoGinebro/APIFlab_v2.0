// scripts/generate-cert.js
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

// Detecta IP local
const ip = Object.values(os.networkInterfaces())
  .flat()
  .find((iface) => iface.family === "IPv4" && !iface.internal)?.address;

if (!ip) {
  console.error("IP local não detectado.");
  process.exit(1);
}

// Caminhos dos arquivos
const CERT_DIR = path.resolve("certs");
const CA_KEY = path.join(CERT_DIR, "IFLabCA.key");
const CA_CERT = path.join(CERT_DIR, "IFLabCA.crt");
const SERVER_KEY = path.join(CERT_DIR, "key.pem");
const SERVER_CERT = path.join(CERT_DIR, "cert.pem");
const CERT_CRT = path.join(CERT_DIR, "cert.crt");

// Cria diretório se necessário
fs.mkdirSync(CERT_DIR, { recursive: true });

// Gera CA se não existir
if (!fs.existsSync(CA_KEY) || !fs.existsSync(CA_CERT)) {
  console.log("Criando autoridade certificadora (IFLabCA)...");
  execSync(
    `openssl req -x509 -new -nodes -keyout ${CA_KEY} -out ${CA_CERT} -days 365 -subj "/CN=IFLabCA"`
  );
}

// Gera chave e CSR
console.log("Gerando chave privada e CSR com IP atual...");
execSync(
  `openssl req -newkey rsa:2048 -nodes -keyout ${SERVER_KEY} -out cert.csr -subj "/CN=${ip}"`
);

// Assina certificado
console.log("\nAssinando certificado com IFLabCA...");
execSync(
  `openssl x509 -req -in cert.csr -CA ${CA_CERT} -CAkey ${CA_KEY} -CAcreateserial -out ${SERVER_CERT} -days 365`
);

// Converte para DER (.crt)
console.log("\nConvertendo certificado para DER (.crt)...");
execSync(`openssl x509 -outform der -in ${SERVER_CERT} -out ${CERT_CRT}`);

// Limpa arquivos temporários
fs.rmSync("cert.csr", { force: true });
fs.rmSync("IFLabCA.srl", { force: true });

console.log("\nCertificados gerados com sucesso na pasta /certs para o IP:", ip,"\n");
