// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:  
    - [X] register_element
    - [X] delete_element
    - [X] list_lab_elements
    - [X] get_session_elements
    - [X] get_element_info
    - [X] edit_element_name
    - [X] edit_element_quantity
    - [X] edit_element_CAS
    - [X] edit_element_EC
    - [X] edit_element_physical_state
    - [X] edit_element_validity
    - [X] edit_element_administration
    - [X] edit_element_molar_mass
    - [X] edit_element_image
*/

// O========================================================================================O

// Importando os módulos necessários:
const element_models = require("../models/element_models");

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");

// O========================================================================================O

// Função para registrar um novo elemento:
async function register_element(request, response) {
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
		element_name,
		element_image,
		element_molar_mass,
		element_quantity,
		element_cas_number,
		element_ec_number,
		element_admin_level,
		element_validity,
		element_physical_state,
		lab_id,
	} = request.body;

	/* -------------------------------------------------- */

	// Verifica se o laboratório existe:
	const existingLab = await lab_models.getLabById(lab_id);

	if (!existingLab.status) {
		return response.status(404).json({
			status: false,
			msg: "Laboratório não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(lab_id, userId);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para modificar inventário do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// Registrando elemento:
	const register = await element_models.registerElement(
		element_name,
		element_image,
		element_molar_mass,
		element_quantity,
		element_cas_number,
		element_ec_number,
		element_admin_level,
		element_validity,
		element_physical_state,
		lab_id
	);

	if (!register.status) {
		return response.status(500).json({
			status: false,
			msg: "Erro ao modificar inventário. Não foi possível registrar o elemento",
		});
	}

	/* -------------------------------------------------- */

	// Retorna a resposata de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Elemento registrado com sucesso.",
	});
}

// O========================================================================================O

// Função para deletar um elemento
async function delete_element(request, response) {
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
	const { element_id } = request.body;

	/* -------------------------------------------------- */

	// Verificando se o elemento existe, além de descobrindo qual o seu laboratório, e se tem relação com o usuário
	const element = await element_models.getElementById(element_id);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário ativo tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
		return response.status(403).json({
			status: false,
			msg: "Sem autorização para remover usuários do laboratório.",
		});
	}

	/* -------------------------------------------------- */

	// Deletando elemento:
	const deleteElement = await element_models.deleteElement(element_id);

	if (!deleteElement.status) {
		return response.status(400).json({
			status: false,
			msg: "Não foi possível deletar o elemento. Erro interno.",
		});
	}

	/* -------------------------------------------------- */

	// Mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Elemento deletado com sucesso.",
	});
}

// O========================================================================================O

//  Listar elementos de um laboratório:
async function list_lab_elements(request, response) {
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

	// Lendo inventário de elementos do lab:
	const getElements = await element_models.getElementsFromLab(labId);

	if (!getElements.status) {
		return response.status(202).json({
			status: true,
			msg: "Não foram encontrados elementos no lab.",
			elementsList: [],
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Elementos encontrados com sucesso",
		elementsList: getElements.data,
	});
}

// O========================================================================================O

//
async function get_session_elements(request, response) {
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

	// Lendo elementos da sessão:
	const elementsBySession = await element_models.getElementsBySessionId(
		sessionId
	);

	if (!elementsBySession.status) {
		return response.status(202).json({
			status: true,
			msg: "Não foram encontrados elementos no lab.",
			elementsList: [],
		});
	}

	/* -------------------------------------------------- */

	return response.status(202).json({
		status: true,
		msg: "Elementos encontrados com sucesso",
		elementsList: elementsBySession.data,
	});
}

// O========================================================================================O

//
async function get_element_info(request, response) {
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
	const { elementId } = request.params;

	/* -------------------------------------------------- */

	// Recupera informações do elemento:
	const element = await element_models.getElementById(elementId);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem acesso ao laboratório:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

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
		element: element.data,
	});
}

// O========================================================================================O

//
async function edit_element_name(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_name } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando nome do elemento:
	const result = await element_models.editElementName(element_id, element_name);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar o nome do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Nome editado com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_quantity(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_quantity } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando quantidade do elemento:
	const result = await element_models.editElementQuantity(
		element_id,
		element_quantity
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar a quantidade do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Quantidade editada com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_CAS(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_cas_number } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando o número CAS do elemento:
	const result = await element_models.editElementCAS(
		element_id,
		element_cas_number
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar número CAS do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Número CAS editado com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_EC(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_ec_number } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando número EC do elemento:
	const result = await element_models.editElementEC(
		element_id,
		element_ec_number
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar o número EC do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Número EC editado com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_physical_state(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_physical_state } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando o estado físico do elemento:
	const result = await element_models.editElementPhysicalState(
		element_id,
		element_physical_state
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar o estado físico do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Estado físico editado com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_validity(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_validity } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando validade do elemento:
	const result = await element_models.editElementValidity(
		element_id,
		element_validity
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar a validade do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Validade editada com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_administration(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_admin_level } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando admin do elemento:
	const result = await element_models.editElementAdmin(
		element_id,
		element_admin_level
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar o responsável pelo elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Responsável editado com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_molar_mass(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_molar_mass } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando massa molar do elemento:
	const result = await element_models.editElementMolarMass(
		element_id,
		element_molar_mass
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar a massa molar do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Massa molar editada com sucesso.",
	});
}

// O========================================================================================O

//
async function edit_element_image(request, response) {
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

	// Recebendo os dados do body da requisição:
	const { element_id, element_image } = request.body;

	/* -------------------------------------------------- */

	// Recuperando elemento para saber se ele existe:
	const element = await element_models.getElementById(element_id);

	console.log(element);

	if (!element.status) {
		return response.status(404).json({
			status: false,
			msg: "Elemento não encontrado.",
		});
	}

	/* -------------------------------------------------- */

	// Verificando se o usuário tem permissão com o laboratório do elemento:
	const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

	if (!userLab.status || userLab.user_access_level < 2) {
		return response.status(403).json({
			status: false,
			msg: "Usuário não tem autorização para modificar elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Editando imagem do elemento:
	const result = await element_models.editElementImage(
		element_id,
		element_image
	);

	if (!result.status) {
		return response.status(500).json({
			status: false,
			msg: "Houve algum problema interno ao tentar editar a imagem do elemento.",
		});
	}

	/* -------------------------------------------------- */

	// Retorna mensagem de sucesso:
	return response.status(200).json({
		status: true,
		msg: "Imagem editada com sucesso.",
	});
}

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
	register_element,
	delete_element,
	list_lab_elements,
	get_session_elements,
	get_element_info,
	edit_element_name,
	edit_element_quantity,
	edit_element_CAS,
	edit_element_EC,
	edit_element_physical_state,
	edit_element_validity,
	edit_element_administration,
	edit_element_molar_mass,
	edit_element_image,
};

// O========================================================================================O
