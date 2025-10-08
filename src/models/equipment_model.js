// O========================================================================================O

/*
    O======================================================O
    |   Funções de models das informações dos elementos    |
    O======================================================O

    Lista de funções:  
    - [] registerEquipments
    - [] getEquipmentById
    - [] deleteEquipment
    - [] ListLabEquipments
    - [] getEquipmentsBySession
    - [] editEquipmentName
    - [] editEquipmentQuantity
    - [] editEquipmentQuality
    - [] editEquipmentDescription
    - [] editEquipmentAdmin
    - [] editEquipmentImage
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

// Função para registrar equipamentos:
const registerEquipments = async (
	equipment_name,
	equipment_description,
	equipment_quantity,
	equipment_quality,
	equipment_admin_level,
	equipment_image,
	lab_id
) => {
	const query = "CALL registerEquipments(?, ?, ?, ?, ?, ?, ?)";
	const [result] = await connection.execute(query, [
		equipment_name,
		equipment_description,
		equipment_quantity,
		equipment_quality,
		equipment_admin_level,
		equipment_image,
		lab_id,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para pegar equipamento pelo ID:
const getEquipmentById = async (equipment_id) => {
	const query = "CALL getEquipmentById(?)";
	const [result] = await connection.execute(query, [equipment_id]);

	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Função para deletar equipamento:
const deleteEquipment = async (equipment_id) => {
	const query = "CALL deleteEquipment(?)";
	const [result] = await connection.execute(query, [equipment_id]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para listar equipamentos do laboratório:
const ListLabEquipments = async (lab_id) => {
	const query = "CALL ListLabEquipments(?)";
	const [result] = await connection.execute(query, [lab_id]);
	if (result[0].length === 0) {
		return { status: false, data: [] };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

// Função para pegar equipamentos pela sessão:
const getEquipmentsBySession = async (session_id) => {
	const query = "CALL getEquipmentsBySession(?)";

	const [result] = await connection.execute(query, [session_id]);
	if (result[0].length === 0) {
		return { status: false, data: [] };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

// Função para editar nome do equipamento:
const editEquipmentName = async (equipment_id, equipment_name) => {
	const query = "CALL editEquipmentName(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_name,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para editar quantidade do equipamento:
const editEquipmentQuantity = async (equipment_id, equipment_quantity) => {
	const query = "CALL editEquipmentQuantity(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_quantity,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para editar qualidade do equipamento:
const editEquipmentQuality = async (equipment_id, equipment_quality) => {
	const query = "CALL editEquipmentQuality(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_quality,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para editar descrição do equipamento:
const editEquipmentDescription = async (
	equipment_id,
	equipment_description
) => {
	const query = "CALL editEquipmentDescription(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_description,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para editar nível de administração do equipamento:
const editEquipmentAdmin = async (equipment_id, equipment_admin_level) => {
	const query = "CALL editEquipmentAdmin(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_admin_level,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para editar imagem do equipamento:
const editEquipmentImage = async (equipment_id, equipment_image) => {
	const query = "CALL editEquipmentImage(?, ?)";
	const [result] = await connection.execute(query, [
		equipment_id,
		equipment_image,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Exportando as funções:
module.exports = {
	registerEquipments,
	getEquipmentById,
	deleteEquipment,
	ListLabEquipments,
	getEquipmentsBySession,
	editEquipmentName,
	editEquipmentQuantity,
	editEquipmentQuality,
	editEquipmentDescription,
	editEquipmentAdmin,
	editEquipmentImage,
};

// O========================================================================================O
