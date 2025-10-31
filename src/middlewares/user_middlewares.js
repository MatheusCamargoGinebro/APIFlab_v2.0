// O============================================================================================O

/*
    O=================================================================O
    |   Arquivo de configuração de entradas para o objeto usuários    |
    O=================================================================O

    Lista de entradas possíveis na API:
    - [X] user_email
    - [X] user_password
    - [X] user_validation_code
    - [X] reason_for_code
    - [X] user_name
    - [X] user_image
    - [X] user_admin_level
    - [X] user_id
    - [X] user_creation_token 
    - [X] check_token
*/

// O============================================================================================O

// Importando as dependências:
const JWT = require("jsonwebtoken");

// Importando o modelo de blacklist:
const blackListModels = require("../models/user_model");

// O============================================================================================O

// Validação para o email do usuário:
const user_email = (request, response, next) => {
	const { user_email } = request.body;

	if (
		typeof user_email !== "string" ||
		user_email.trim().length === 0 ||
		user_email.length > 256
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_email" é obrigatório e deve ser uma string não vazia, com no máximo 256 caracteres.',
		});
	}

	const ifEmailRegex =
		/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(?:ifac|ifal|ifap|ifam|ifb|ifba|ifbaiano|ifce|ifc|ifes|iff|iffar|ifg|ifgoiano|ifma|ifms|ifmt|ifmg|ifnmg|ifpa|ifpe|ifpb|ifpi|ifrj|ifro|ifrn|ifrr|ifrs|ifsul|ifsertaope|ifsc|ifs|ifsp|ifsuldeminas|ifsudestemg|ifto|ifpr)\.edu\.br$/i;

	if (!ifEmailRegex.test(user_email.trim())) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_email" deve ser um email válido de um Instituto Federal.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para a senha do usuário:
const user_password = (request, response, next) => {
	const { user_password } = request.body;

	if (typeof user_password !== "string" || !user_password.trim()) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_password" é obrigatório e deve ser uma string.',
		});
	}

	// não há tamanho máximo para a senha, mas deve ter pelo menos 8 caracteres
	if (user_password.length < 8) {
		return response.status(400).json({
			status: false,
			msg: "A senha deve ter pelo menos 8 caracteres.",
		});
	}

	if (!/[a-z]/.test(user_password)) {
		return response.status(400).json({
			status: false,
			msg: "A senha deve conter pelo menos uma letra minúscula.",
		});
	}

	if (!/[A-Z]/.test(user_password)) {
		return response.status(400).json({
			status: false,
			msg: "A senha deve conter pelo menos uma letra maiúscula.",
		});
	}

	if (!/[0-9]/.test(user_password)) {
		return response.status(400).json({
			status: false,
			msg: "A senha deve conter pelo menos um número.",
		});
	}

	if (!/[.!@#$%^&*(),?":{}|<>]/.test(user_password)) {
		return response.status(400).json({
			status: false,
			msg: "A senha deve conter pelo menos um caractere especial.",
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o código de validação do usuário:
const user_validation_code = (request, response, next) => {
	const { user_validation_code } = request.body;

	if (
		typeof user_validation_code !== "string" ||
		user_validation_code.trim().length !== 5
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_validation_code" é obrigatório e deve ser uma string de tamanho exato de 5 caracteres.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o motivo do código de validação do usuário:
const reason_for_code = (request, response, next) => {
	const { reason_for_code } = request.body;
	const validReasons = [1, 2, 3];

	if (
		typeof reason_for_code !== "number" ||
		!validReasons.includes(reason_for_code)
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "reason_for_code" é obrigatório e deve ser um número entre 1, para registro de usuário, 2, para alteração de email, ou 3, para redefinição de senha.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o nome do usuário:
const user_name = (request, response, next) => {
	const { user_name } = request.body;

	if (
		typeof user_name !== "string" ||
		user_name.trim().length === 0 ||
		user_name.length > 128
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_name" é obrigatório e deve ser uma string não vazia, com no máximo 128 caracteres.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para a imagem do usuário:
const user_image = (request, response, next) => {
	const { user_image } = request.body;

	if (typeof user_image !== "string" || user_image.trim().length === 0) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_image" é obrigatório e deve ser uma string não vazia.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o nível de administrador do usuário: (1-3)
const user_admin_level = (request, response, next) => {
	const { user_admin_level } = request.body;

	if (
		!Number.isInteger(user_admin_level) ||
		user_admin_level < 1 ||
		user_admin_level > 3
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_admin_level" é obrigatório e deve ser um número entre 1 e 3.',
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o ID do usuário:
const user_id = (request, response, next) => {
	const { user_id } = request.body;

	if (!Number.isInteger(user_id) || user_id < 1) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "user_id" é obrigatório e deve ser um número inteiro positivo.',
		});
	}

	next();
};

// O=============================================================================================O

// Validador de token JWT: (descomente a parte do banco de dados se necessário):
const JWT_TOKEN_VALIDATOR = async (token) => {
	if (typeof token !== "string" || token.trim().length === 0) {
		return { status: false, msg: "Token não fornecido ou inválido (vazio)." };
	}

	// Verifica se o token está na blocklist do banco de dados (descomente para ativar)

	try {
		const isInBlocklist = await blackListModels.getFromBlackList(token);

		if (isInBlocklist.status) {
			return { status: false, msg: "Token descartado ou revogado." };
		}
	} catch (dbError) {
		console.error("Erro ao verificar token na blocklist:", dbError.message);
		return {
			status: false,
			msg: "Erro interno do servidor ao validar o token.",
		};
	}

	// Tenta verificar o token JWT usando a chave secreta
	try {
		const decoded = JWT.verify(token, process.env.JWT_SECRET);
		return { status: true, data: decoded };
	} catch ({ name }) {
		const messages = {
			TokenExpiredError: "Token expirado.",
			JsonWebTokenError: "Token inválido ou adulterado.",
		};
		return { status: false, msg: messages[name] || "Token inválido." };
	}
};

// O=============================================================================================O

// Validação para o token de criação do usuário:
const user_creation_token = async (request, response, next) => {
	const { user_creation_token } = request.body;

	const validationResult = await JWT_TOKEN_VALIDATOR(user_creation_token);

	if (!validationResult.status) {
		return response.status(401).json({
			status: false,
			msg: validationResult.msg,
		});
	}

	next();
};

// O=============================================================================================O

// Validação para o token de verificação do usuário:
const check_token = async (request, response, next) => {
	const token = request.headers["x-access-token"];

	const validationResult = await JWT_TOKEN_VALIDATOR(token);

	if (!validationResult.status) {
		return response.status(401).json({
			status: false,
			msg: validationResult.msg,
		});
	}

	next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
	user_email,
	user_password,
	user_validation_code,
	reason_for_code,
	user_name,
	user_image,
	user_admin_level,
	user_id,
	user_creation_token,
	check_token,
};

// O============================================================================================O
