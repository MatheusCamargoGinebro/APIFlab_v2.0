// O========================================================================================O

/*
  Agendador de tarefas periódicas do sistema:
  - Limpar logoutList removendo tokens expirados/inválidos
  - Remover mailCodes expirados
  - Atualizar status das sessões (Agendada -> Andamento -> Finalizada)

  Roda a cada 5 minutos (configurável alterando INTERVAL_MS).
*/

const connection = require("../utils/connection");
const JWT = require("jsonwebtoken");

const INTERVAL_MS = 5 * 60 * 1000; // 5 minutos

async function purgeLogoutList() {
	try {
		const [rows] = await connection.execute(
			"SELECT logoutId, token FROM logoutList"
		);

		for (const row of rows) {
			const { logoutId, token } = row;
			try {
				// Se o token for válido e não expirado, apenas continua
				JWT.verify(token, process.env.JWT_SECRET);
			} catch (err) {
				// Remove tokens expirados ou inválidos para manter a tabela limpa
				if (
					err &&
					(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
				) {
					try {
						await connection.execute(
							"DELETE FROM logoutList WHERE logoutId = ?",
							[logoutId]
						);
						console.log(
							`[scheduler] Removed logoutList id=${logoutId} (reason=${err.name})`
						);
					} catch (delErr) {
						console.error(
							`[scheduler] Error deleting logoutList id=${logoutId}:`,
							delErr
						);
					}
				} else {
					// Em qualquer outro caso apenas loga sem interromper o agendador
					console.warn(
						`[scheduler] Unexpected token verification error for logoutId=${logoutId}:`,
						err
					);
				}
			}
		}
	} catch (error) {
		console.error("[scheduler] purgeLogoutList error:", error);
	}
}

async function purgeMailCodes() {
	try {
		const [result] = await connection.execute(
			"DELETE FROM mailCode WHERE expiresAt <= NOW()"
		);

		if (result && typeof result.affectedRows !== "undefined") {
			console.log(
				`[scheduler] Removed ${result.affectedRows} expired mailCodes`
			);
		}
	} catch (error) {
		console.error("[scheduler] purgeMailCodes error:", error);
	}
}

async function updateSessionStatuses() {
	try {
		// Passa Agendada -> Andamento quando horário de início já chegou e ainda não terminou
		const [startResult] = await connection.execute(
			"UPDATE session SET statusOf = 'Andamento' WHERE statusOf = 'Agendada' AND CONCAT(dateOf, ' ', LPAD(hourStart,8,'0')) <= NOW() AND CONCAT(dateOf, ' ', LPAD(hourEnd,8,'0')) > NOW()"
		);

		// Passa Agendada/Andamento -> Finalizada quando horário de término já passou
		const [finishResult] = await connection.execute(
			"UPDATE session SET statusOf = 'Finalizada' WHERE statusOf IN ('Agendada','Andamento') AND CONCAT(dateOf, ' ', LPAD(hourEnd,8,'0')) <= NOW()"
		);

		if (startResult && typeof startResult.affectedRows !== "undefined") {
			console.log(
				`[scheduler] Marked ${startResult.affectedRows} session(s) as Andamento`
			);
		}
		if (finishResult && typeof finishResult.affectedRows !== "undefined") {
			console.log(
				`[scheduler] Marked ${finishResult.affectedRows} session(s) as Finalizada`
			);
		}
	} catch (error) {
		console.error("[scheduler] updateSessionStatuses error:", error);
	}
}

async function runOnce() {
	await Promise.all([
		purgeLogoutList(),
		purgeMailCodes(),
		updateSessionStatuses(),
	]);
}

function startScheduler() {
	console.log("[scheduler] Starting periodic tasks (interval = 5 minutes)");
	// Executa imediatamente e depois em intervalos
	runOnce().catch((e) => console.error("[scheduler] initial run error:", e));
	setInterval(() => {
		runOnce().catch((e) =>
			console.error("[scheduler] scheduled run error:", e)
		);
	}, INTERVAL_MS);
}

// Inicia automaticamente ao requerer o módulo.
startScheduler();

module.exports = {
	purgeLogoutList,
	purgeMailCodes,
	updateSessionStatuses,
	startScheduler,
};

// O========================================================================================O
