// O========================================================================================O

/*
    O===================================================O
    |   Funções de models das informações dos campus    |
    O===================================================O

    Lista de funções:  
    - [X] getAllCampus
    - [X] getCampusByName
    - [X] registerNewCampus
    - [X] getCampusById
    - [X] getAllUsersByCampusId
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

const getAllCampus = async () => {
	const query = "CALL getAllCampus()";

	const [result] = await connection.execute(query);

	if (result.length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

const getCampusByName = async (campus_name) => {
	const query = "CALL getCampusByName(?)";

	const [result] = await connection.execute(query, [campus_name]);

	if (result.length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

const registerNewCampus = async (campus_name, campus_uf) => {
	const query = "CALL registerNewCampus(?, ?)";

	const [result] = await connection.execute(query, [campus_name, campus_uf]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

const getCampusById = async (campus_id) => {
	const query = "CALL getCampusById(?)";
	const [result] = await connection.execute(query, [campus_id]);
	if (result.length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

const getAllUsersByCampusId = async (campus_id) => {
	const query = "CALL getAllUsersByCampusId(?)";
	const [result] = await connection.execute(query, [campus_id]);
	if (result.length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0] };
	}
};

// O========================================================================================O

module.exports = {
	getAllCampus,
	getCampusByName,
	registerNewCampus,
	getCampusById,
	getAllUsersByCampusId,
};

// O========================================================================================O
