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

	// Deletando o equipamento:
	const delete_equipment = await equiments_models.deleteEquipment(equipment_id);

	if (!delete_equipment.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível deletar equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Equipamento deletado com sucesso.",
	});
}

// O========================================================================================O

async function list_lab_equipments(request, response) {
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

	// Recebendo os dados dos parâmetros da requisição:
	const { labId } = request.params;

	/* -------------------------------------------------- */

	// Verificando relação usuário-laboratório:
	const userLab = await lab_models.getUserLabRole(labId, userId);

	if (!userLab.status) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem permissão para acessar o laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// Lendo lista de equipamentos do laboratório:
	const equipmentsByLab = await equiments_models.ListLabEquipments(labId);

	if (!equipmentsByLab.status) {
		return response.status(404).json({
			status: true,
			msg: "Nenhum equipamento encontrado.",
			data: [],
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Equipamentos encontrados.",
		equipmentsList: equipmentsByLab.data,
	});
}

// O========================================================================================O

async function list_session_equipments(request, response) {
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

	// Recebendo os dados dos parâmetros da requisição:
	const { sessionId } = request.params;

	/* -------------------------------------------------- */

	// Verificando a sessão:
	const session = await session_models.getSessionById(sessionId);

	// Verificando se o usuário tem relação com o laboratório em que a sessão está relacionada:
	const userLab = await lab_models.getUserLabRole(session.data.lab_id, userId);

	if (!userLab.status) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem permissão para acessar essa informação.",
		});
	}

	/* -------------------------------------------------- */

	// Lendo equipamentos de sessão:
	const equipmentsBySession = await equiments_models.getEquipmentsBySession(
		sessionId
	);

	if (!equipmentsBySession.status) {
		return response.status(404).json({
			status: true,
			msg: "Não foram encontrados equipamentos no lab.",
			equipmentsList: [],
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Equipamentos encontrados.",
		equipmentsList: equipmentsBySession.data,
	});
}

// O========================================================================================O

async function get_equipment_info(request, response) {
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

	if (!userLab.status) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem permissão para acessar dados.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Dados obtidos com sucesso.",
		equipment: equipment.data,
	});
}

// O========================================================================================O

async function edit_equipment_name(request, response) {
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
	const { equipment_id, equipment_name } = request.body;

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

	// editando nome do equipamento:
	const edit = await equiments_models.editEquipmentName(
		equipment_id,
		equipment_name
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar nome do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Nome do equipamento editado com sucesso.",
	});
}

// O========================================================================================O

async function edit_equipment_quantity(request, response) {
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
	const { equipment_id, equipment_quantity } = request.body;

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

	// editando  do equipamento:
	const edit = await equiments_models.editEquipmentQuantity(
		equipment_id,
		equipment_quantity
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar quantidade do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Quantidade do equipamento editado com sucesso.",
	});
}

// O========================================================================================O

async function edit_equipment_quality(request, response) {
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
	const { equipment_id, equipment_quality } = request.body;

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

	// editando qualidade do equipamento:
	const edit = await equiments_models.editEquipmentQuality(
		equipment_id,
		equipment_quality
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar qualidade do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Qualidade do equipamento editado com sucesso.",
	});
}

// O========================================================================================O

async function edit_equipment_description(request, response) {
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
	const { equipment_id, equipment_description } = request.body;

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

	// editando descrição do equipamento:
	const edit = await equiments_models.editEquipmentDescription(
		equipment_id,
		equipment_description
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar descrição do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Descrição do equipamento editado com sucesso.",
	});
}

// O========================================================================================O

async function edit_equipment_administration(request, response) {
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
	const { equipment_id, equipment_admin_level } = request.body;

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

	// editando nível de administração do equipamento:
	const edit = await equiments_models.editEquipmentAdmin(
		equipment_id,
		equipment_admin_level
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar nível de administração do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Nível de administração do equipamento editado com sucesso.",
	});
}

// O========================================================================================O

async function edit_equipment_image(request, response) {
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
	const { equipment_id, equipment_image } = request.body;

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

	// editando imagem do equipamento:
	const edit = await equiments_models.editEquipmentImage(
		equipment_id,
		equipment_image
	);

	if (!edit.status) {
		return response.status(500).json({
			status: false,
			msg: "Não foi possível editar imagem do equipamento.",
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Imagem do equipamento editado com sucesso.",
	});
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
