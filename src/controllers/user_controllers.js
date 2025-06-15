// O========================================================================================O

/*
    O=====================================O
    |   Controllers do objeto usuários    |
    O=====================================O

    Lista de funções:  
    - [] login_user
    - [] logout_user
    - [] email_validation
    - [] email_code_validation
    - [] password_recovery
    - [] register_user
    - [] edit_user_name
    - [] edit_user_email
    - [] edit_user_password
    - [] edit_user_type
    - [] get_user_info
*/

// O========================================================================================O

// Importando os módulos necessários:
const user_models = require("../models/user_model");

// jsonwebtoken (JWT) para autenticação:
const JWT = require("jsonwebtoken");

// O========================================================================================O

// Função para realizar o login do usuário:
const login_user = async (request, response) => {
  const { user_email, user_password } = request.body;

  console.log(
    `Tentativa de login do usuário: ${user_email} - Senha: ${user_password}`
  );
};

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  login_user,
};

// O========================================================================================O
