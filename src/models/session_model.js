// O========================================================================================O

/*
    O====================================================O
    |   Funções de models das informações das sessões    |
    O====================================================O

    Lista de funções:  
    - [X] getSessionById
	- [X] checkDate
	- [X] createSession
	- [X] deleteSession
	- [X] startSession
	- [X] finishSession
	- []
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

const getSessionById = async (sessionId) => {
	const query = "CALL getSessionById(?)";

	const [result] = await connection.execute(query, [sessionId]);

	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

const checkDate = async (lab_id, date, starts_at, ends_at) => {
	const query = "CALL checkDate(?, ?, ?, ?)";
	const [result] = await connection.execute(query, [
		lab_id,
		date,
		starts_at,
		ends_at,
	]);

	if (result[0].length === 0) {
		return { status: true };
	} else {
		return { status: false };
	}
};

// O========================================================================================O

const createSession = async (
	userId,
	lab_id,
	session_date,
	session_starts_at,
	session_ends_at,
	elements_list,
	equipment_list
) => {
	const query = "CALL createSession(?, ?, ?, ?, ?)";
	const [result] = await connection.execute(query, [
		userId,
		lab_id,
		session_date,
		session_starts_at,
		session_ends_at,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	}

	const session_id = result[0][0].session_id;

	// Inserindo os elementos na sessão:
	for (let i = 0; i < elements_list.length; i++) {
		const { element_id } = elements_list[i];
		const insertElementQuery = "CALL relateElementInSession(?, ?)";
		await connection.execute(insertElementQuery, [session_id, element_id]);
	}

	// Inserindo os equipamentos na sessão:
	for (let i = 0; i < equipment_list.length; i++) {
		const { equipment_id } = equipment_list[i];
		const insertEquipmentQuery = "CALL relateEquipmentInSession(?, ?)";
		await connection.execute(insertEquipmentQuery, [session_id, equipment_id]);
	}

	return { status: true };
};

// O========================================================================================O

const deleteSession = async (session_id) => {
	const query = "CALL deleteSession(?)";
	const [result] = await connection.execute(query, [session_id]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

const startSession = async (session_id) => {
	const query = "CALL startSession(?)";
	const [result] = await connection.execute(query, [session_id]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

const finishSession = async (session_id) => {
	const query = "CALL finishSession(?)";
	const [result] = await connection.execute(query, [session_id]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
	getSessionById,
	checkDate,
	createSession,
	deleteSession,
	startSession,
	finishSession,
};

// O========================================================================================O
