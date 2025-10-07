// O============================================================================================O

/*
    O=====================================================================O
    |   Arquivo de configuração de entradas para o objeto laboratórios    |
    O=====================================================================O

    Lista de entradas possíveis na API:
    - [X] lab_name
    - [X] lab_id
    - [X] labId (URL)
    - [X] date (URL)
*/

// O============================================================================================O

// Validação para o nome do laboratório:
const lab_name = (request, response, next) => {
	const { lab_name } = request.body;

	if (
		typeof lab_name !== "string" ||
		lab_name.trim().length === 0 ||
		lab_name.length > 32
	) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "lab_name" é obrigatório e deve ser uma string não vazia, com no máximo 32 caracteres.',
			error_at: "lab_name",
		});
	}
	next();
};

// O============================================================================================O

// Validação para o ID do laboratório:
const lab_id = (request, response, next) => {
	const { lab_id } = request.body;

	if (!Number.isInteger(lab_id) || lab_id <= 0) {
		return response.status(400).json({
			status: false,
			msg: 'O campo "lab_id" é obrigatório e deve ser um número inteiro positivo.',
			error_at: "lab_id",
		});
	}

	next();
};

// O============================================================================================O

// Validação para o ID do laboratório na URL: mesma coisa do lab_id, mas sem o body
const labId = (request, response, next) => {
	const { labId } = request.params;

	if (!Number.isInteger(Number(labId)) || Number(labId) <= 0) {
		return response.status(400).json({
			status: false,
			msg: 'O parâmetro "labId" é obrigatório e deve ser um número inteiro positivo.',
			error_at: "labId",
		});
	}

	next();
};

// O============================================================================================O

// Validação para a data do laboratório:
const lab_date = (request, response, next) => {
	const { date } = request.params;

	// Verifica se está no formato YYYY-MM-DD
	if (
		typeof date !== "string" ||
		date.trim().length !== 10 ||
		!/^\d{4}-\d{2}-\d{2}$/.test(date)
	) {
		return response.status(400).json({
			status: false,
			msg: 'O parâmetro "date" é obrigatório e deve estar no formato YYYY-MM-DD.',
			error_at: "date",
		});
	}

	// Divide a data e cria um objeto Date
	const [year, month, day] = date.split("-").map(Number);
	const dateObject = new Date(year, month - 1, day);

	// Verifica se a data é válida (evita coisas como 2025-02-30)
	if (
		isNaN(dateObject.getTime()) ||
		dateObject.getFullYear() !== year ||
		dateObject.getMonth() !== month - 1 ||
		dateObject.getDate() !== day
	) {
		return response.status(400).json({
			status: false,
			msg: 'O parâmetro "date" contém uma data inválida (não existente).',
			error_at: "date",
		});
	}

	next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
	lab_name,
	lab_id,
	labId,
	lab_date,
};

// O============================================================================================O
