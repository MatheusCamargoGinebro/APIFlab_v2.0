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

// O========================================================================================O

async function register_equipment(request, response) {}

// O========================================================================================O

async function delete_equipment(request, response) {}

// O========================================================================================O

async function list_lab_equipments(request, response) {}

// O========================================================================================O

async function list_session_equipments(request, response) {}

// O========================================================================================O

async function get_equipment_info(request, response) {}

// O========================================================================================O

async function edit_equipment_name(request, response) {}

// O========================================================================================O

async function edit_equipment_quantity(request, response) {}

// O========================================================================================O

async function edit_equipment_quality(request, response) {}

// O========================================================================================O

async function edit_equipment_description(request, response) {}

// O========================================================================================O

async function edit_equipment_administration(request, response) {}

// O========================================================================================O

async function edit_equipment_image(request, response) {}

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
