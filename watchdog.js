require("dotenv").config();
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const http = require("http");
const https = require("https");
const os = require("os");
const zlib = require("zlib");

const logDir = path.join(__dirname, "logs");
const logFile = path.join(logDir, "logs.txt");
const pidFile = path.join(__dirname, "api.pid");

const port = process.env.PORT || 3333;
const protocol = process.env.USE_HTTPS === "true" ? "https" : "http";
const checkInterval = 60 * 1000; // 1 minuto
const updateInterval = 60 * 60 * 1000; // 1 hora
const logRotationInterval = 24 * 60 * 60 * 1000; // 1 dia

let lastUpdate = Date.now();
let lastRotation = Date.now();

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

function log(message = "", type = "normal") {
	const timestamp = new Date().toISOString();
	let formatted = "";

	switch (type) {
		case "line":
			formatted = `[${timestamp}] ----------------------------------------`;
			break;
		case "block":
			formatted = `[${timestamp}] ========================================`;
			break;
		case "spacer":
			formatted = `[${timestamp}]`;
			break;
		default:
			formatted = `[${timestamp}] ${message}`;
	}

	fs.appendFileSync(logFile, formatted + "\n");
}

function isApiOnline(callback) {
	const client = protocol === "https" ? https : http;
	const host = getLocalIP();

	client
		.get(`${protocol}://${host}:${port}`, (res) => {
			callback(res.statusCode >= 200 && res.statusCode < 500);
		})
		.on("error", () => callback(false));
}

function killApi() {
	if (fs.existsSync(pidFile)) {
		const pid = fs.readFileSync(pidFile, "utf-8").trim();
		try {
			process.kill(pid, "SIGTERM");
			log(`Encerrando API (PID ${pid})`);
		} catch (err) {
			log(`Erro ao encerrar API: ${err.message}`);
		}
		fs.unlinkSync(pidFile);
		log("", "line");
		log("", "spacer");
	}
}

function startApi() {
	log("", "block");
	log("🔄 Iniciando nova instância da API...");
	log("", "spacer");

	const out = fs.openSync(logFile, "a");
	const apiProcess = spawn("node", ["src/services/server.js"], {
		detached: true,
		stdio: ["ignore", out, out],
	});
	fs.writeFileSync(pidFile, apiProcess.pid.toString());
	apiProcess.unref();

	log(`✅ API iniciada (PID ${apiProcess.pid})`);
	log("========================================", "block");
	log(
		"\n-------------------------------------------------------------------\n"
	);
}

function updateProject() {
	log("🛠️ Atualizando projeto...");
	try {
		execSync("git pull origin main", { stdio: "inherit" });
		log("✅ git pull concluído.");
	} catch (err) {
		log(`❌ Erro no git pull: ${err.message}`);
	}

	try {
		execSync("npm install", { stdio: "inherit" });
		log("✅ npm install concluído.");
	} catch (err) {
		log(`❌ Erro no npm install: ${err.message}`);
	}
}

async function rotateLogsIfNeeded() {
	const now = Date.now();
	if (now - lastRotation >= logRotationInterval && fs.existsSync(logFile)) {
		const dateStr = new Date().toISOString().split("T")[0];
		const rotatedFile = path.join(logDir, `logs-${dateStr}.txt`);
		const compressedFile = rotatedFile + ".gz";

		fs.renameSync(logFile, rotatedFile);

		const input = fs.createReadStream(rotatedFile);
		const output = fs.createWriteStream(compressedFile);
		const gzip = zlib.createGzip();

		input.pipe(gzip).pipe(output);

		output.on("finish", async () => {
			await fsp.unlink(rotatedFile);
			log(`📦 Log rotacionado e compactado: ${compressedFile}`);
		});

		lastRotation = now;
	}
}

function watchdogLoop() {
	isApiOnline((isOnline) => {
		if (!isOnline) {
			log("", "line");
			log("🚨 API fora do ar. Reiniciando...");
			log("", "spacer");
			killApi();
			startApi();
		}
	});

	if (Date.now() - lastUpdate >= updateInterval) {
		log("🛠️ Executando atualização programada...");
		log("", "line");
		killApi();
		updateProject();
		startApi();
		lastUpdate = Date.now();
	}

	rotateLogsIfNeeded();
}

// Inicialização
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
log("\n-------------------------------------------------------------------");
log("========================================", "block");
log("🚀 Watchdog iniciado.");
log("========================================", "block");
log("", "spacer");

watchdogLoop();
setInterval(watchdogLoop, checkInterval);
