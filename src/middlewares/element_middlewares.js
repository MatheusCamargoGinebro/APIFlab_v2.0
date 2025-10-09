// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeto element    |
    O================================================================O

    Lista de entradas possíveis na API:
    - [X] element_name
    - [X] element_image
    - [X] element_molar_mass
    - [X] element_quantity
    - [X] element_cas_number
    - [X] element_ec_number
    - [X] element_admin_level
    - [X] element_validity
    - [X] element_physical_state
    - [X] element_id
    - [X] elementId (URL)
    - [X] elements_list
*/

// O============================================================================================O

// Validação para o nome do elemento:
const element_name = (request, response, next) => {
	const { element_name } = request.body;

	if (
		typeof element_name !== "string" ||
		element_name.trim().length === 0 ||
		element_name.length > 128
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_name" é obrigatório e deve ser uma string não vazia, com no máximo 128 caracteres.',
			error_at: "element_name",
		});
	}

	next();
};

// O============================================================================================O

// Validação para a imagem do elemento:
const element_image = (request, response, next) => {
	const { element_image } = request.body;

	if (typeof element_image !== "string" || element_image.trim().length === 0) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_image" é obrigatório e deve ser uma string não vazia.',
			error_at: "element_image",
		});
	}

	next();
};

// O============================================================================================O

// Validação para a massa molar do elemento:
const element_molar_mass = (request, response, next) => {
	const { element_molar_mass } = request.body;

	if (
		typeof element_molar_mass !== "number" ||
		element_molar_mass <= 0 ||
		isNaN(element_molar_mass)
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_molar_mass" é obrigatório e deve ser um número positivo.',
			error_at: "element_molar_mass",
		});
	}

	next();
};

// O============================================================================================O

// Validação para a quantidade do elemento:
const element_quantity = (request, response, next) => {
	const { element_quantity } = request.body;

	if (typeof element_quantity !== "number" || isNaN(element_quantity)) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_quantity" é obrigatório e deve ser um número.',
			error_at: "element_quantity",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o número CAS do elemento:
const element_cas_number = (request, response, next) => {
	const { element_cas_number } = request.body;

	if (
		typeof element_cas_number !== "string" ||
		element_cas_number.trim().length === 0 ||
		element_cas_number.length > 32
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_cas_number" é obrigatório e deve ser uma string não vazia, com no máximo 32 caracteres.',
			error_at: "element_cas_number",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o número EC do elemento:
const element_ec_number = (request, response, next) => {
	const { element_ec_number } = request.body;

	if (
		typeof element_ec_number !== "string" ||
		element_ec_number.trim().length === 0 ||
		element_ec_number.length > 32
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_ec_number" é obrigatório e deve ser uma string não vazia, com no máximo 32 caracteres.',
			error_at: "element_ec_number",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o nível administrativo do elemento:
const element_admin_level = (request, response, next) => {
	const { element_admin_level } = request.body;

	if (
		!Number.isInteger(element_admin_level) ||
		element_admin_level < 1 ||
		element_admin_level > 3
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_admin_level" é obrigatório e deve ser um número inteiro entre 1 e 3.',
			error_at: "element_admin_level",
		});
	}

	next();
};

// O============================================================================================O

// Validação para a validade do elemento no formato YYYY-MM-DD
const element_validity = (request, response, next) => {
	const { element_validity } = request.body;

	// Verifica se está no formato correto
	if (
		typeof element_validity !== "string" ||
		element_validity.trim().length !== 10 ||
		!/^\d{4}-\d{2}-\d{2}$/.test(element_validity)
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_validity" é obrigatório e deve estar no formato YYYY-MM-DD.',
			error_at: "element_validity",
		});
	}

	// Divide a data e cria um objeto Date
	const [year, month, day] = element_validity.split("-").map(Number);
	const dateObject = new Date(year, month - 1, day);

	// Verifica se a data é válida (evita datas inexistentes como 2025-02-30)
	if (
		isNaN(dateObject.getTime()) ||
		dateObject.getFullYear() !== year ||
		dateObject.getMonth() !== month - 1 ||
		dateObject.getDate() !== day
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_validity" contém uma data inválida (não existente).',
			error_at: "element_validity",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o estado físico do elemento:
const element_physical_state = (request, response, next) => {
	const { element_physical_state } = request.body;

	if (
		typeof element_physical_state !== "string" ||
		!element_physical_state.trim()
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_physical_state" é obrigatório e deve ser uma string.',
			error_at: "element_physical_state",
		});
	}

	const validStates = ["Sólido", "Líquido", "Gasoso"];
	if (!validStates.includes(element_physical_state.trim())) {
		return response.status(400).json({
			status: false,
			msg: `O campo "element_physical_state" deve ser um dos seguintes valores: ${validStates.join(
				", "
			)}.`,
			error_at: "element_physical_state",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o ID do elemento:
const element_id = (request, response, next) => {
	const { element_id } = request.body;

	if (!Number.isInteger(element_id) || element_id <= 0) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "element_id" é obrigatório e deve ser um número inteiro positivo.',
			error_at: "element_id",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o ID do elemento na URL:
const elementId = (request, response, next) => {
	const { elementId } = request.params;

	if (!Number.isInteger(Number(elementId)) || Number(elementId) <= 0) {
		return response.status(400).json({
			status: false,
			msg: 'O parâmetro "elementId" é obrigatório e deve ser um número inteiro positivo.',
			error_at: "elementId",
		});
	}

	next();
};

// O============================================================================================O

// Middleware de validação para a lista de elementos:
const elements_list = (request, response, next) => {
	const { elements_list } = request.body;

	if (!Array.isArray(elements_list) || elements_list.length === 0) {
		return next();
	}

	for (const { element_id, element_quantity } of elements_list) {
		if (!Number.isInteger(element_id) || element_id <= 0) {
			return response.status(400).json({
				status: false,
				msg: `Cada item em "elements_list" deve ter um "element_id" que seja um número inteiro positivo.`,
				error_at: "elements_list",
				item_error: { element_id, element_quantity },
			});
		}

		// Se element_quantity estiver presente, deve ser um inteiro positivo:
		if (
			element_quantity !== undefined &&
			(!Number.isInteger(element_quantity) || element_quantity <= 0)
		) {
			return response.status(400).json({
				status: false,
				msg: `Se presente, "element_quantity" deve ser um número inteiro positivo.`,
				error_at: "elements_list",
				item_error: { element_id, element_quantity },
			});
		}
	}

	next();
};

// O============================================================================================O

// Exportando as validações para o objeto element:
module.exports = {
	element_name,
	element_image,
	element_molar_mass,
	element_quantity,
	element_cas_number,
	element_ec_number,
	element_admin_level,
	element_validity,
	element_physical_state,
	element_id,
	elementId,
	elements_list,
};

// O============================================================================================O
