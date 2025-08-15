// O========================================================================================O

/*
    O========================================O
    |   Controllers do objeto laboratório    |
    O========================================O

    Lista de funções:  
    - [] register_new_laboratory
    - [] delete_laboratory
    - [] list_user_laboratories
    - [] list_laboratory_schedule
    - [] get_lab_users
    - [] change_user_admin_level
*/

// O========================================================================================O

// Importando os módulos necessários:
const lab_models = require("../models/lab_model");

// O========================================================================================O

// Função para registrar um novo laboratório:
async function register_new_laboratory(req, res) {}

// O========================================================================================O

// Função para deletar um laboratório:
async function delete_laboratory(req, res) {}

// O========================================================================================O

// Função para listar os laboratórios do usuário:
async function list_user_laboratories(req, res) {}

// O========================================================================================O

// Função para listar o horário de um laboratório:
async function list_laboratory_schedule(req, res) {}

// O========================================================================================O

// Função para obter os usuários de um laboratório:
async function get_lab_users(req, res) {}

// O========================================================================================O

// Função para alterar o nível de administrador de um usuário em um laboratório:
async function change_user_admin_level(req, res) {}

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  register_new_laboratory,
  delete_laboratory,
  list_user_laboratories,
  list_laboratory_schedule,
  get_lab_users,
  change_user_admin_level,
};

// O========================================================================================O
