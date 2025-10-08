// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:
    - [] register_equipment
    - [] delete_equipment
    - [] list_lab_equipments
    - [] list_session_equipments
    - [] get_equipment_info
    - [] edit_equipment_name
    - [] edit_equipment_quantity
    - [] edit_equipment_quality
    - [] edit_equipment_description
    - [] edit_equipment_administration
    - [] edit_equipment_image
*/

// O========================================================================================O

// Importando os módulos necessários:
const equiments_models = require("../models/equipment_model");

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");
const { equipmentId } = require("../middlewares/equipment_middlewares");

// O========================================================================================O

async function register_equipment(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
		equipment_name,
		equipment_image,
		equipment_description,
		equipment_quantity,
		equipment_quality,
		equipment_admin_level,
	} = request.body;

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(lab_id, userId);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// Registrando o equipamento:
	const register = await equiments_models.registerEquipments(
		equipment_name,
		equipment_description,
		equipment_quantity,
		equipment_quality,
		equipment_admin_level,
		equipment_image,
		lab_id
	);

	if (!register.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível registrar equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Equipamento registrado com sucesso.",
	});
}

// O========================================================================================O

async function delete_equipment(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function list_lab_equipments(request, response) {}

// O========================================================================================O

async function list_session_equipments(request, response) {}

// O========================================================================================O

async function get_equipment_info(request, response) {}

// O========================================================================================O

async function edit_equipment_name(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function edit_equipment_quantity(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function edit_equipment_quality(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function edit_equipment_description(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function edit_equipment_administration(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

async function edit_equipment_image(request, response) {
	/* -------------------------------------------------- */

	const token = request.headers["x-access-token"];

	// desmonta o token para obter o user_id:
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
	const { equipment_id } = request.body;

	// Verificando se o equipamento existe:
	const equipment = await equiments_models.getEquipmentById(equipment_id);

	if (!equipment.status) {
		return response.status(404).json({
			status: false,
			msg: "Equipamento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(
		equipment.data.lab_id,
		userId
	);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar/acessar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// :
}

// O========================================================================================O

// Exportando as funções controllers:
module.exports = {
	register_equipment,
	delete_equipment,
	list_lab_equipments,
	list_session_equipments,
	get_equipment_info,
	edit_equipment_name,
	edit_equipment_quantity,
	edit_equipment_quality,
	edit_equipment_description,
	edit_equipment_administration,
	edit_equipment_image,
};

// O========================================================================================O
