// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:
  - [] create_new_session
  - [] delete_session
  - [] start_session
  - [] finish_session
  - [] list_user_sessions
  - [] get_utilization_form
  - [] save_utilization_form
*/

// O========================================================================================O

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");

// Importando o módulo de elementos:
const element_models = require("../models/element_model");

// Importando o módulo de equipamentos:
const equipment_models = require("../models/equipment_model");

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// O========================================================================================O

// Função para criar nova sessão:
async function create_new_session(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	let userId;

	try {
		const decoded = JWT.verify(token, process.env.JWT_SECRET);
		userId = decoded.user_id;
	} catch (error) {
		return response.status(401).json({
			status: false,
			msg: "Token inválido.",
		});
	}

	/* -------------------------------------------------- */

	const {
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at,
		elements_list,
		equipments_list,
	} = request.body;

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(lab_id, userId);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para reservar sessões no laboratório.",
		});
	}
	/* -------------------------------------------------- */

	// Verifica se o horário está disponível:
	const check_date = await session_models.checkDate(
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at
	);

	if (!check_date.status) {
		return response.status(403).json({
			status: false,
			msg: "Horário indisponível.",
		});
	}

	// Verifica se o horário de início é menor que o horário de término:
	if (session_starts_at >= session_ends_at) {
		return response.status(400).json({
			status: false,
			msg: "Horário de início deve ser menor que o horário de término.",
		});
	}

	// Verifica se a sessão tem mais de 16h:
	const start = new Date(`1970-01-01T${session_starts_at}:00`);
	const end = new Date(`1970-01-01T${session_ends_at}:00`);
	const diff = (end - start) / (1000 * 60 * 60); // Diferença em horas

	if (diff > 16) {
		return response.status(400).json({
			status: false,
			msg: "Sessão não pode ter mais de 16 horas.",
		});
	}

	/* -------------------------------------------------- */

	// Verifica se há elementos duplicados:
	const elementIds = elements_list.map(({ element_id }) => element_id);
	const uniqueElementIds = new Set(elementIds);

	if (uniqueElementIds.size !== elementIds.length) {
		return response.status(400).json({
			status: false,
			msg: "Lista de elementos contém IDs duplicados.",
		});
	}

	/* -------------------------------------------------- */

	// Verifica se há equipamentos duplicados:
	const equipmentIds = equipments_list.map(({ equipment_id }) => equipment_id);
	const uniqueEquipmentIds = new Set(equipmentIds);

	if (uniqueEquipmentIds.size !== equipmentIds.length) {
		return response.status(400).json({
			status: false,
			msg: "Lista de equipamentos contém IDs duplicados.",
		});
	}

	/* -------------------------------------------------- */

	// Verifica se os elementos e equipamentos pertencem ao laboratório:
	const elements = await Promise.all(
		elements_list.map(({ element_id }) =>
			element_models.getElementById(element_id)
		)
	);

	/* -------------------------------------------------- */

	// Verifica se os elementos pertencem ao laboratório:
	for (let i = 0; i < elements_list.length; i++) {
		const info = elements[i];
		const { element_id } = elements_list[i];

		if (!info.status) {
			return response.status(404).json({
				status: false,
				msg: `Elemento com ID ${element_id} não foi encontrado no banco de dados.`,
			});
		}

		if (info.data.lab_id !== lab_id) {
			return response.status(403).json({
				status: false,
				msg: `Elemento com ID ${element_id} não pertence ao laboratório ${lab_id}.`,
			});
		}
	}

	/* -------------------------------------------------- */

	// Verifica se os equipamentos pertencem ao laboratório:
	const equipments = await Promise.all(
		equipments_list.map(({ equipment_id }) =>
			equipment_models.getEquipmentById(equipment_id)
		)
	);

	for (let i = 0; i < equipments_list.length; i++) {
		const info = equipments[i];
		const { equipment_id } = equipments_list[i];

		if (!info.status) {
			return response.status(404).json({
				status: false,
				msg: `Equipamento com ID ${equipment_id} não foi encontrado no banco de dados.`,
			});
		}

		if (info.data.lab_id !== lab_id) {
			return response.status(403).json({
				status: false,
				msg: `Equipamento com ID ${equipment_id} não pertence ao laboratório ${lab_id}.`,
			});
		}
	}

	/* -------------------------------------------------- */

	const create_session = await session_models.createSession(
		userId,
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at,
		elements_list,
		equipments_list
	);

	if (!create_session.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao criar a sessão.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(200).json({
		status: true,
		msg: "Sessão criada com sucesso.",
	});
}

// Função para deletar sessão:
async function delete_session(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	let userId;

	try {
		const decoded = JWT.verify(token, process.env.JWT_SECRET);
		userId = decoded.user_id;
	} catch (error) {
		return response.status(401).json({
			status: false,
			msg: "Token inválido.",
		});
	}

	/* -------------------------------------------------- */

	// Recuperando daados do corpo da requisição:
	const { session_id } = request.body;

	/* -------------------------------------------------- */

	// Verificando se a sessão existe:
	const session = await session_models.getSessionById(session_id);

	if (!session.status) {
		return response.status(404).json({
			status: false,
			msg: "Sessão não encontrada.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão para deletar:
	const userLab = await lab_models.getUserLabRole(session.data.lab_id, userId);

	if (
		!userLab.status ||
		(parseInt(userLab.data.user_access_level) < 3 &&
			userId !== session.data.user_id)
	) {
		return response.status(404).json({
			status: false,
			msg: "Sem vínculo com a sessão ou o laboratório da sessão.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// Função para iniciar sessão:
async function start_session(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	let userId;

	try {
		const decoded = JWT.verify(token, process.env.JWT_SECRET);
		userId = decoded.user_id;
	} catch (error) {
		return response.status(401).json({
			status: false,
			msg: "Token inválido.",
		});
	}

	/* -------------------------------------------------- */

	// Recuperando daados do corpo da requisição:
	const { session_id } = request.body;

	/* -------------------------------------------------- */

	// Verificando se a sessão existe:
	const session = await session_models.getSessionById(session_id);

	if (!session.status) {
		return response.status(404).json({
			status: false,
			msg: "Sessão não encontrada.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão para deletar:
	const userLab = await lab_models.getUserLabRole(session.data.lab_id, userId);

	if (
		!userLab.status ||
		(parseInt(userLab.data.user_access_level) < 3 &&
			userId !== session.data.user_id)
	) {
		return response.status(404).json({
			status: false,
			msg: "Sem vínculo com a sessão ou o laboratório da sessão.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// Função para terminar sessão:
async function finish_session(request, response) {}

// Função para listar sessão:
async function list_user_sessions(request, response) {}

// Função para recuperar formulário de sessão:
async function get_utilization_form(request, response) {}

// Função para salvar formulário de sessão:
async function save_utilization_form(request, response) {}

// O========================================================================================O

module.exports = {
	create_new_session,
	delete_session,
	start_session,
	finish_session,
	list_user_sessions,
	get_utilization_form,
	save_utilization_form,
};
