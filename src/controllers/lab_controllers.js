// O========================================================================================O

/*
    O========================================O
    |   Controllers do objeto laboratório    |
    O========================================O

    Lista de funções:  
    - [X] register_new_laboratory
    - [] delete_laboratory
    - [] list_user_laboratories
    - [] list_laboratory_schedule
    - [] get_lab_users
    - [] change_user_admin_level
*/

// O========================================================================================O

// Importando os módulos necessários:
const lab_models = require("../models/lab_model");

// Importando o módulo de usuários:
const user_models = require("../models/user_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// O========================================================================================O

// Função para registrar um novo laboratório:
async function register_new_laboratory(req, res) {
  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { lab_name } = req.body;

  /* -------------------------------------------------- */

  const token = req.headers["x-access-token"];

  // desmonta o token para obter o user_id:
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

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return res.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  // Verifica se o usuário é um administrador:
  if (user.data.user_access_level === "1") {
    return res.status(403).json({
      status: false,
      msg: "Acesso negado. Apenas administradores podem registrar laboratórios.",
    });
  }

  /* -------------------------------------------------- */

  // Verifica se o nome do laboratório já existe:
  const existingLab = await lab_models.getLabByName(lab_name);

  if (existingLab.status) {
    return res.status(400).json({
      status: false,
      msg: "Laboratório já registrado.",
    });
  }

  /* -------------------------------------------------- */

  // Registra o novo laboratório:
  const result = await lab_models.registerNewLab(
    lab_name,
    userId,
    user.data.campus_id
  );
  if (!result.status) {
    return res.status(500).json({
      status: false,
      msg: "Erro ao registrar o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Pega o ID do laboratório registrado:
  const lab = await lab_models.getLabByName(lab_name);
  const labId = lab.data.lab_id;

  // Adiciona o usuário como administrador do laboratório:
  const addAdmin = await lab_models.addUserToLab(labId, 3, userId);

  if (!addAdmin.status) {
    return res.status(500).json({
      status: false,
      msg: "Erro ao adicionar o usuário como administrador do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return res.status(201).json({
    status: true,
    msg: "Laboratório registrado com sucesso.",
  });

  /* -------------------------------------------------- */
}

// O========================================================================================O

// Função para deletar um laboratório:
async function delete_laboratory(req, res) {
  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { labId } = req.params;

  /* -------------------------------------------------- */

  const token = req.headers["x-access-token"];

  // desmonta o token para obter o user_id:
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

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return res.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  // Verifica se o usuário é um administrador:
  if (user.data.user_access_level === "1") {
    return res.status(403).json({
      status: false,
      msg: "Acesso negado. Apenas administradores responsáveis pelo ambiente pode deletá-los.",
    });
  }

  /* -------------------------------------------------- */

  // Verifica se o laboratório existe:
  const existingLab = await lab_models.getLabById(labId);

  if (!existingLab.status) {
    return res.status(404).json({
      status: false,
      msg: "Laboratório não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando qual o nível de administração do usuário no laboratório:
  const userLab = await lab_models.getUserLabRole(labId, userId);

  if (!userLab.status || parseInt(userLab.data.user_access_level) !== 3) {
    return res.status(403).json({
      status: false,
      msg: "Sem autorização para deletar o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Deleta o laboratório:
  const result = await lab_models.deleteLabById(labId);
  if (!result.status) {
    return res.status(500).json({
      status: false,
      msg: "Erro ao deletar o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return res.status(200).json({
    status: true,
    msg: "Laboratório deletado com sucesso.",
  });
}

// O========================================================================================O

// Função para listar os laboratórios do usuário:
async function list_user_laboratories(req, res) {
  /* -------------------------------------------------- */

  const token = req.headers["x-access-token"];

  // desmonta o token para obter o user_id:
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

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return res.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Pega os laboratórios do usuário:
  const labs = await lab_models.getLabsByUserId(userId);
  if (!labs.status) {
    return res.status(500).json({
      status: false,
      msg: "Erro ao listar os laboratórios do usuário.",
    });
  }

  if (labs.data.length === 0) {
    return res.status(404).json({
      status: false,
      msg: "Nenhum laboratório encontrado para o usuário.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return res.status(200).json({
    status: true,
    msg: "Laboratórios listados com sucesso.",
    labsList: labs.data,
  });
}

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
