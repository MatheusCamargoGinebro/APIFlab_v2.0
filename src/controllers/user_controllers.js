// O========================================================================================O

/*
    O=====================================O
    |   Controllers do objeto usuários    |
    O=====================================O

    Lista de funções:  
    - [X] login_user
    - [X] logout_user
    - [X] email_validation
    - [X] email_code_validation
    - [X] password_recovery
    - [X] register_user
    - [X] edit_user_name
    - [X] edit_user_email
    - [X] edit_user_password
    - [X] edit_user_image
    - [X] get_user_info
*/

// O========================================================================================O

// Importando os módulos necessários:
const user_models = require("../models/user_model");

const campus_models = require("../models/campus_model");

// Importando o módulo de tratamento de senhas:
const bcryptjs = require("bcryptjs");

// jsonwebtoken (JWT) para autenticação:
const JWT = require("jsonwebtoken");

// Importando o módulo de envio de emails:
const nodeMailer = require("nodemailer");

// O========================================================================================O

// Função para realizar o login do usuário:
const login_user = async (request, response) => {
	/* -------------------------------------------------- */

	const { user_email, user_password } = request.body;

	/* -------------------------------------------------- */

	// Verificando se o email existe no banco de dados:
	const user = await user_models.getUserByEmail(user_email);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário ou senha incorretos.",
			token: null,
		});
	}

	/* -------------------------------------------------- */

	try {
		// Verificando se a senha está correta (versão assíncrona):
		const isPasswordValid = await bcryptjs.compare(
			user_password,
			user.data.user_password
		);

		// Se a senha estiver incorreta, retornamos um erro:
		if (!isPasswordValid) {
			return response.status(401).json({
				status: false,
				msg: "Usuário ou senha incorretos.",
				token: null,
			});
		}
	} catch (error) {
		console.error("Erro ao validar senha:", error.message);
		return response.status(500).json({
			status: false,
			msg: "Erro interno ao validar senha.",
			token: null,
		});
	}

	/* -------------------------------------------------- */

	// Se a senha estiver correta, gera um token JWT:
	const token = JWT.sign(
		{ user_id: user.data.user_id },
		process.env.JWT_SECRET,
		{ expiresIn: 86400 }
	);

	/* -------------------------------------------------- */

	// Retornamos a resposta com o token:
	return response.status(200).json({
		status: true,
		msg: "Login realizado com sucesso.",
		token: token,
	});
};

// O========================================================================================O

// Função para realizar o logout do usuário:
const logout_user = async (request, response) => {
	/*-----------------------------------------------------*/

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

	// Enviando o token para a blacklist (lista de bloqueio do banco de dados):
	const result = await user_models.addToBlackList(token);
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao realizar logout.",
		});
	}

	/*-----------------------------------------------------*/

	// Aqui, retornamos uma resposta de sucesso.
	return response.status(200).json({
		status: true,
		msg: "Logout realizado com sucesso.",
	});
};

// O========================================================================================O

// Função para validar o email do usuário enviando um código de verificação:
const email_validation = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_email, reason_for_code } = request.body;

	/*-----------------------------------------------------*/

	// Verificando se o email já está cadastrado:
	const user = await user_models.getUserByEmail(user_email);

	// Caso o usuário não exista, e o motivo do código for troca de senha ou troca de email, retornamos um erro:
	if (reason_for_code === 3 && !user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	// Caso o usuário exista, e o motivo do código for registro, retornamos um erro:
	if (reason_for_code !== 3 && user.status === true) {
		return response.status(400).json({
			status: false,
			msg: "Email já cadastrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Gerando um código de verificação de 5 dígitos:
	const verificationCode = Math.floor(10000 + Math.random() * 90000);

	// Gerando um token de criação para o código de verificação:
	const creationToken = JWT.sign(
		{ user_email: user_email, verificationCode: verificationCode },
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);

	/*-----------------------------------------------------*/

	// Registrando no banco de dados o código de verificação salvo, junto com o email:
	const result = await user_models.saveVerificationCode(
		user_email,
		verificationCode,
		creationToken,
		reason_for_code === 1
			? "registro"
			: reason_for_code === 2
			? "email"
			: "senha"
	);

	// Se o registro falhar, retornamos um erro:
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao gerar código de verificação.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, é enviado por email o código de verificação:
	const transporter = nodeMailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.MAIL_USER,
		to: user_email,
		subject: "Código de Verificação",
		html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Código de Verificação</h2>
        <p style="font-size: 16px; color: #333;">Olá,</p>
        <p style="font-size: 16px; color: #333;">
            Seu código de verificação para ${
							reason_for_code === 1
								? "registrar sua conta"
								: reason_for_code === 2
								? "alterar seu email"
								: "redefinir sua senha"
						} é:
        </p>
        </p>
        <div style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px; background-color: #4CAF50; color: white; border-radius: 5px;">
            ${verificationCode}
        </div>
        <p style="font-size: 14px; color: #777;">Esse código é válido por 1 hora.</p>
        <p style="font-size: 14px; color: #777;">Se você não solicitou esse código, ignore este e-mail.</p>
        <p style="font-size: 14px; color: #777; text-align: center;">
            <em>Equipe IFLab</em>
        </p>
    </div>
    `,
	};

	transporter.sendMail(mailOptions).catch((error) => {
		console.error("Erro ao enviar email:", error.message);
		return response.status(500).json({
			status: false,
			msg: "Erro ao enviar código de verificação por email.",
		});
	});

	/*-----------------------------------------------------*/

	// Retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Código de verificação enviado por email.",
	});
};

// O========================================================================================O

// Função para validar o código de verificação do email:
const email_code_validation = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_email, user_validation_code } = request.body;

	/*-----------------------------------------------------*/
	// Verificando se o código de verificação é válido:
	const result = await user_models.validateVerificationCode(
		user_email,
		user_validation_code,
		"registro"
	);

	// Se o código for inválido, retornamos um erro:
	if (!result.status) {
		return response.status(400).json({
			status: false,
			msg: "Código de verificação inválido.",
		});
	}

	/*-----------------------------------------------------*/

	// Descartando o código de verificação após a validação:
	const discardResult = await user_models.discardCode(
		result.data.email_code_id
	);

	// Se o descarte falhar, retornamos um erro:
	if (!discardResult.status) {
		return response.status(500).json({
			status: true,
			msg: "Erro ao descartar código de verificação.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Código de verificação válido.",
		authToken: result.data.verification_token,
	});
};

// O========================================================================================O

// Função para recuperar a senha do usuário:
const password_recovery = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_email, user_validation_code, user_password } = request.body;

	/*-----------------------------------------------------*/

	// Verificando se o código de verificação é válido:
	const result = await user_models.validateVerificationCode(
		user_email,
		user_validation_code,
		"senha"
	);

	// Se o código for inválido, retornamos um erro:
	if (!result.status) {
		return response.status(400).json({
			status: false,
			msg: "Código de verificação ou email inválido.",
		});
	}

	/*-----------------------------------------------------*/

	// Descartando o código de verificação após a validação:
	const discardResult = await user_models.discardCode(
		result.data.email_code_id
	);

	// Se o descarte falhar, retornamos um erro:
	if (!discardResult.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao descartar código de verificação.",
		});
	}

	/*-----------------------------------------------------*/

	// Verificando se o email existe no banco de dados:
	const user = await user_models.getUserByEmail(user_email);
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Criptografando a nova senha do usuário:
	let hashedPassword;
	try {
		hashedPassword = await bcryptjs.hash(user_password, 12);
	} catch (error) {
		console.error("Erro ao criptografar a senha:", error.message);
		return response.status(500).json({
			status: false,
			msg: "Erro ao criptografar a senha.",
		});
	}

	/*-----------------------------------------------------*/

	// Atualizando a senha do usuário no banco de dados:
	const updateResult = await user_models.updateUserPassword(
		user.data.user_id,
		hashedPassword
	);

	// Se a atualização falhar, retornamos um erro:
	if (!updateResult.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao atualizar a senha.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Senha atualizada com sucesso.",
	});
};

// O========================================================================================O

// Função para registrar um novo usuário:
const register_user = async (request, response) => {
	/*-----------------------------------------------------*/

	const {
		user_email,
		user_password,
		user_name,
		user_creation_token /* authToken, recebido pela rota que verificou o email */,
		campus_id,
	} = request.body;

	const user_type = user_email.includes("@aluno") ? "Aluno" : "Funcionário";

	/*-----------------------------------------------------*/

	// Verificando se o token de criação é válido:
	try {
		const decoded = JWT.verify(user_creation_token, process.env.JWT_SECRET);
		if (decoded.user_email !== user_email) {
			return response.status(400).json({
				status: false,
				msg: "Token de criação inválido.",
			});
		}
	} catch (error) {
		return response.status(400).json({
			status: false,
			msg: "Token de criação inválido.",
		});
	}

	/*-----------------------------------------------------*/

	// Verificando se o email já está cadastrado:
	const existingUser = await user_models.getUserByEmail(user_email);

	if (existingUser.status) {
		return response.status(400).json({
			status: false,
			msg: "Email já cadastrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Criptografando a senha do usuário:
	let hashedPassword;
	try {
		hashedPassword = await bcryptjs.hash(user_password, 12);
	} catch (error) {
		console.error("Erro ao criptografar a senha:", error.message);
		return response.status(500).json({
			status: false,
			msg: "Erro ao criptografar a senha.",
		});
	}

	/*-----------------------------------------------------*/

	// Verifica se o nome do usuário já está cadastrado:
	const existingUserName = await user_models.getUserByName(user_name);

	if (existingUserName.status) {
		return response.status(400).json({
			status: false,
			msg: "Nome de usuário já cadastrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Verifica se o campus existe:
	const campus = await campus_models.getCampusById(campus_id);

	if (!campus.status) {
		return response.status(404).json({
			status: false,
			msg: "Campus não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Verifica quantos usuários já existem no campus:
	const usersInCampus = await campus_models.getAllUsersByCampusId(campus_id);

	const accessLevel = usersInCampus.data.length === 0 ? "3" : "1";

	/*-----------------------------------------------------*/

	// Registrando o novo usuário no banco de dados:
	const result = await user_models.registerNewUser(
		user_name,
		user_email,
		hashedPassword,
		user_type,
		accessLevel,
		campus_id
	);

	// Se o registro falhar, retornamos um erro:
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao registrar novo usuário.",
		});
	}

	/*-----------------------------------------------------*/
	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(201).json({
		status: true,
		msg: "Usuário registrado com sucesso.",
	});
};

// O========================================================================================O

// Função para editar o nome do usuário:
const edit_user_name = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_name } = request.body;

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

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

	/*-----------------------------------------------------*/

	// Verificando se o usuário existe no banco de dados:
	const user = await user_models.getUserById(userId);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Verifica se o nome de usuário já está cadastrado:
	const existingUser = await user_models.getUserByName(user_name);

	if (existingUser.status) {
		return response.status(400).json({
			status: false,
			msg: "Nome de usuário já cadastrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Atualizando o nome do usuário no banco de dados:
	const result = await user_models.updateUserName(userId, user_name);

	// Se a atualização falhar, retornamos um erro:
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao atualizar o nome do usuário.",
		});
	}
	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Nome do usuário atualizado com sucesso.",
	});
};

// O========================================================================================O

// Função para editar o email do usuário:
const edit_user_email = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_email, user_validation_code } = request.body;

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

	// Verificando se o código de verificação é válido:
	const result = await user_models.validateVerificationCode(
		user_email,
		user_validation_code,
		"email"
	);

	// Se o código for inválido, retornamos um erro:
	if (!result.status) {
		return response.status(400).json({
			status: false,
			msg: "Código de verificação inválido.",
		});
	}

	/*-----------------------------------------------------*/

	// Descartando o código de verificação após a validação:
	const discardResult = await user_models.discardCode(
		result.data.email_code_id
	);

	// Se o descarte falhar, retornamos um erro:
	if (!discardResult.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao descartar código de verificação.",
		});
	}

	/*-----------------------------------------------------*/

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

	/*-----------------------------------------------------*/

	// Verificando se o usuário existe no banco de dados:
	const user = await user_models.getUserById(userId);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Verificando se o email já está cadastrado:
	const existingUser = await user_models.getUserByEmail(user_email);

	if (existingUser.status) {
		return response.status(400).json({
			status: false,
			msg: "Email já cadastrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Atualizando o email do usuário no banco de dados:
	const updateResult = await user_models.updateUserEmail(userId, user_email);

	// Se a atualização falhar, retornamos um erro:
	if (!updateResult.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao atualizar o email do usuário.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Email do usuário atualizado com sucesso.",
	});
};

//
// O========================================================================================O

// Função para editar a senha do usuário:
const edit_user_password = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_password } = request.body;

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

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

	/*-----------------------------------------------------*/

	// Verificando se o usuário existe no banco de dados:
	const user = await user_models.getUserById(userId);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Criptografando a nova senha do usuário:
	let hashedPassword;
	try {
		hashedPassword = await bcryptjs.hash(user_password, 12);
	} catch (error) {
		console.error("Erro ao criptografar a senha:", error.message);
		return response.status(500).json({
			status: false,
			msg: "Erro ao criptografar a senha.",
		});
	}

	/*-----------------------------------------------------*/

	// Atualizando a senha do usuário no banco de dados:
	const result = await user_models.updateUserPassword(userId, hashedPassword);

	// Se a atualização falhar, retornamos um erro:
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao atualizar a senha do usuário.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Senha do usuário atualizada com sucesso.",
	});
};

// O========================================================================================O

// Função para editar a imagem do usuário:
const edit_user_image = async (request, response) => {
	/*-----------------------------------------------------*/

	const { user_image } = request.body;

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

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

	/*-----------------------------------------------------*/

	// Verificando se o usuário existe no banco de dados:
	const user = await user_models.getUserById(userId);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Atualizando a imagem do usuário no banco de dados:
	const result = await user_models.updateUserImage(userId, user_image);

	// Se a atualização falhar, retornamos um erro:
	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao atualizar a imagem do usuário.",
		});
	}

	/*-----------------------------------------------------*/

	// Se tudo estiver correto, retornamos uma resposta de sucesso:

	return response.status(200).json({
		status: true,
		msg: "Imagem do usuário atualizada com sucesso.",
	});
};

// O========================================================================================O

// Função para obter as informações do usuário:
const get_user_info = async (request, response) => {
	/*-----------------------------------------------------*/

	const token = request.headers["x-access-token"];

	/*-----------------------------------------------------*/

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

	/*-----------------------------------------------------*/

	// Verificando se o usuário existe no banco de dados:
	const user = await user_models.getUserById(userId);

	// Se o usuário não existir, retornamos um erro:
	if (!user.status) {
		return response.status(404).json({
			status: false,
			msg: "Usuário não encontrado.",
		});
	}

	/*-----------------------------------------------------*/

	// Retornando as informações do usuário:
	return response.status(200).json({
		status: true,
		data: user.data,
		msg: "Informações do usuário obtidas com sucesso.",
	});
};

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
	login_user,
	logout_user,
	email_validation,
	email_code_validation,
	password_recovery,
	register_user,
	edit_user_name,
	edit_user_email,
	edit_user_password,
	edit_user_image,
	get_user_info,
};

// O========================================================================================O
