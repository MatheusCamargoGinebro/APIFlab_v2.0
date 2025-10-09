// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:
  - [] create_new_session
  - [] delete_session
  - [] start_session
  - [] finish_session
  - [] list_user_sessions
  - [] get_utilization_form
  - [] save_utilization_form
*/

// O========================================================================================O

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");

// O========================================================================================O

// Função para criar sessão:
async function create_new_session(request, response) {}

// Função para deletar sessão:
async function delete_session(request, response) {}

// Função para iniciar sessão:
async function start_session(request, response) {}

// Função para terminar sessão:
async function finish_session(request, response) {}

// Função para listar sessão:
async function list_user_sessions(request, response) {}

// Função para recuperar formulário de sessão:
async function get_utilization_form(request, response) {}

// Função para salvar formulário de sessão:
async function save_utilization_form(request, response) {}

// O========================================================================================O

module.exports = {
	create_new_session,
	delete_session,
	start_session,
	finish_session,
	list_user_sessions,
	get_utilization_form,
	save_utilization_form,
};
