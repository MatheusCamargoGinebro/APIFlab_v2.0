const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");
const os = require("os");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3333;
const host = getLocalIP();
const useHttps = process.env.USE_HTTPS === "true"; // controle via variável de ambiente

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

if (useHttps) {
	const options = {
		key: fs.readFileSync("certs/key.pem"),
		cert: fs.readFileSync("certs/cert.pem"),
	};

	https.createServer(options, app).listen(port, host, () => {
		console.log(`HTTPS server running at https://${host}:${port}`);
	});
} else {
	http.createServer(app).listen(port, host, () => {
		console.log(`HTTP server running at http://${host}:${port}`);
	});
}
