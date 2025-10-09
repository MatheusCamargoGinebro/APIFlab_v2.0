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

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");

// Importando o módulo de elementos:
const element_models = require("../models/element_model");

// Importando o módulo de equipamentos:
const equipment_models = require("../models/equipment_model");

// O========================================================================================O

// Função para criar sessão:
async function create_new_session(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o userId::
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

	// Recebendo os dados do corpo da requisição:
	const {
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at,
		elements_list,
		equipment_list,
	} = request.body;

	/* -------------------------------------------------- */

	// Verificando se o horário desejado está disponível:
	const check_date = await session_models.checkDate(
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

	/* -------------------------------------------------- */

	// Verificando se os elementos estão no mesmo laboratório que a sessão:
	const elements = await Promise.all(
		elements_list.map(({ element_id }) =>
			element_models.getElementById(element_id)
		)
	);

	for (let i = 0; i < elements_list.length; i++) {
		const info = elements[i];

		if (!info.status) {
			return response.status(404).json({
				status: false,
				msg: "Um dos elementos não foi encontrado no banco de dados.",
			});
		}

		if (info.data.lab_id !== lab_id) {
			return response.status(403).json({
				status: false,
				msg: "Um dos elementos não pertence ao laboratório que você quer reservar.",
			});
		}
	}

	/* -------------------------------------------------- */

	// Verificando se os equipamentos estão no mesmo laboratório:
	const equipments = await Promise.all(
		equipment_list.map(({ equipment_id }) =>
			equipment_models.getEquipmentById(equipment_id)
		)
	);

	for (let i = 0; i < equipment_list.length; i++) {
		const info = equipments[i];

		if (!info.status) {
			return response.status(404).json({
				status: false,
				msg: "Um dos equipamentos não foi encontrado no banco de dados.",
			});
		}

		if (info.data.lab_id !== lab_id) {
			return response.status(403).json({
				status: false,
				msg: "Um dos equipamentos não pertence ao laboratório que você quer reservar.",
			});
		}
	}

	/* -------------------------------------------------- */

	// Criando a sessão no banco de dados:
	const create_session = await session_models.createSession(
		userId,
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at,
		elements_list,
		equipment_list
	);

	if (!create_session.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao criar a sessão.",
		});
	}

	/* -------------------------------------------------- */

	// Retorno de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Sessão criada com sucesso.",
	});
}

// Função para deletar sessão:
async function delete_session(request, response) {}

// Função para iniciar sessão:
async function start_session(request, response) {}

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
