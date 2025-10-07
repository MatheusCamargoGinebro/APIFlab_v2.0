// O========================================================================================O

/*
    O=====================================================O
    |   Funções de models das informações dos usuários    |
    O=====================================================O

    Lista de funções:  
    - [X] getUserByEmail
    - [X] addToBlackList
    - [X] getFromBlackList
    - [X] saveVerificationCode
    - [X] validateVerificationCode
    - [X] discardCode
    - [X] updateUserPassword
    - [X] getUserByName
    - [X] registerNewUser
    - [X] updateUserName
    - [X] updateUserEmail
    - [X] updateUserImage
    - [X] getUserById

*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

// Função para obter um usuário pelo email:
const getUserByEmail = async (user_email) => {
	const query = "CALL getUserByEmail(?)";

	const [result] = await connection.execute(query, [user_email]);

	// Verificando se o resultado está vazio:
	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Função para adicionar um token à blacklist:
const addToBlackList = async (token) => {
	const query = "CALL addToBlackList(?)";

	const [result] = await connection.execute(query, [token]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para verificar se um token está na blacklist:
const getFromBlackList = async (token) => {
	const query = "CALL getFromBlackList(?)";

	const [result] = await connection.execute(query, [token]);

	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Função para salvar um código de verificação:
const saveVerificationCode = async (
	user_email,
	code,
	creationToken,
	reason_for_code
) => {
	const query = "CALL saveVerificationCode(?, ?, ?, ?)";

	const [result] = await connection.execute(query, [
		user_email,
		code,
		creationToken,
		reason_for_code,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para validar um código de verificação:
const validateVerificationCode = async (user_email, code, reason_for_code) => {
	const query = "CALL validateVerificationCode(?, ?, ?)";

	const [result] = await connection.execute(query, [
		user_email,
		code,
		reason_for_code,
	]);

	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Função para descartar um código de verificação:
const discardCode = async (email_code_id) => {
	const query = "CALL discardCode(?)";

	const [result] = await connection.execute(query, [email_code_id]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para atualizar a senha do usuário:
const updateUserPassword = async (user_id, new_password) => {
	const query = "CALL updateUserPassword(?, ?)";

	const [result] = await connection.execute(query, [user_id, new_password]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para obter um usuário pelo nome:
const getUserByName = async (user_name) => {
	const query = "CALL getUserByName(?)";

	const [result] = await connection.execute(query, [user_name]);

	// Verificando se o resultado está vazio:
	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Função para registrar um novo usuário:
const registerNewUser = async (
	userName,
	userEmail,
	userPassword,
	userType,
	userAccessLevel,
	campusId
) => {
	const query = "CALL registerNewUser(?, ?, ?, ?, ?, ?)";

	const [result] = await connection.execute(query, [
		userName,
		userEmail,
		userPassword,
		userType,
		userAccessLevel,
		campusId,
	]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para atualizar o nome do usuário:
const updateUserName = async (userId, newUserName) => {
	const query = "CALL updateUserName(?, ?)";

	const [result] = await connection.execute(query, [userId, newUserName]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para atualizar o email do usuário:
const updateUserEmail = async (userId, newUserEmail) => {
	const query = "CALL updateUserEmail(?, ?)";

	const [result] = await connection.execute(query, [userId, newUserEmail]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para atualizar a imagem do usuário:
const updateUserImage = async (userId, newImage) => {
	const query = "CALL updateUserImage(?, ?)";

	const [result] = await connection.execute(query, [userId, newImage]);

	if (result.affectedRows === 0) {
		return { status: false };
	} else {
		return { status: true };
	}
};

// O========================================================================================O

// Função para obter um usuário pelo ID:
const getUserById = async (userId) => {
	const query = "CALL getUserById(?)";
	const [result] = await connection.execute(query, [userId]);

	// Verificando se o resultado está vazio:
	if (result[0].length === 0) {
		return { status: false, data: null };
	} else {
		return { status: true, data: result[0][0] };
	}
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
	getUserByEmail,
	addToBlackList,
	getFromBlackList,
	saveVerificationCode,
	validateVerificationCode,
	discardCode,
	updateUserPassword,
	getUserByName,
	registerNewUser,
	updateUserName,
	updateUserEmail,
	updateUserImage,
	getUserById,
};

// O========================================================================================O
