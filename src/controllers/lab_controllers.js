// O========================================================================================O

/*
    O========================================O
    |   Controllers do objeto laboratório    |
    O========================================O

    Lista de funções:  
    - [X] register_new_laboratory
    - [X] delete_laboratory
    - [X] list_user_laboratories
    - [X] list_laboratory_schedule
    - [X] get_lab_users
    - [X] change_user_admin_level
    - [X] add_user_to_lab
    - [X] remove_user_from_lab
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
async function register_new_laboratory(request, response) {
  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { lab_name } = request.body;

  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  // Verifica se o usuário é um administrador:
  if (user.data.user_access_level === "1") {
    return response.status(403).json({
      status: false,
      msg: "Acesso negado. Apenas administradores podem registrar laboratórios.",
    });
  }

  /* -------------------------------------------------- */

  // Verifica se o nome do laboratório já existe:
  const existingLab = await lab_models.getLabByName(lab_name);

  if (existingLab.status) {
    return response.status(400).json({
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
    return response.status(500).json({
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
    return response.status(500).json({
      status: false,
      msg: "Erro ao adicionar o usuário como administrador do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(201).json({
    status: true,
    msg: "Laboratório registrado com sucesso.",
  });

  /* -------------------------------------------------- */
}

// O========================================================================================O

// Função para deletar um laboratório:
async function delete_laboratory(request, response) {
  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { labId } = request.params;

  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  // Verifica se o usuário é um administrador:
  if (user.data.user_access_level === "1") {
    return response.status(403).json({
      status: false,
      msg: "Acesso negado. Apenas administradores responsáveis pelo ambiente pode deletá-los.",
    });
  }

  /* -------------------------------------------------- */

  // Verifica se o laboratório existe:
  const existingLab = await lab_models.getLabById(labId);

  if (!existingLab.status) {
    return response.status(404).json({
      status: false,
      msg: "Laboratório não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando qual o nível de administração do usuário no laboratório:
  const userLab = await lab_models.getUserLabRole(labId, userId);

  if (!userLab.status || parseInt(userLab.data.user_access_level) !== 3) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para deletar o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Deleta o laboratório:
  const result = await lab_models.deleteLabById(labId);
  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao deletar o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Laboratório deletado com sucesso.",
  });
}

// O========================================================================================O

// Função para listar os laboratórios do usuário:
async function list_user_laboratories(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Pega os laboratórios do usuário:
  const labs = await lab_models.getLabsByUserId(userId);
  if (!labs.status) {
    return response.status(404).json({
      status: false,
      msg: "Nenhum laboratório encontrado para o usuário.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Laboratórios listados com sucesso.",
    labsList: labs.data,
  });
}

// O========================================================================================O

// Função para listar o horário de um laboratório:
async function list_laboratory_schedule(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { labId, date } = request.params;

  // Verifica se o laboratório existe:
  const existingLab = await lab_models.getLabById(labId);

  if (!existingLab.status) {
    return response.status(404).json({
      status: false,
      msg: "Laboratório não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário tem acesso ao laboratório:
  const userLab = await lab_models.getUserLabRole(labId, userId);

  if (!userLab.status) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para ver o horário do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Busca o horário do laboratório:
  const schedule = await lab_models.getLabSchedule(labId, date);
  if (!schedule.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao listar o horário do laboratório.",
    });
  }

  if (schedule.data.length === 0) {
    return response.status(404).json({
      status: false,
      msg: "Nenhum horário encontrado para o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Horário do laboratório listado com sucesso.",
    schedule: schedule.data,
  });
}

// O========================================================================================O

// Função para obter os usuários de um laboratório:
async function get_lab_users(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { labId } = request.params;

  /* -------------------------------------------------- */

  // Verifica se o laboratório existe:
  const existingLab = await lab_models.getLabById(labId);

  if (!existingLab.status) {
    return response.status(404).json({
      status: false,
      msg: "Laboratório não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário tem acesso ao laboratório:
  const userLab = await lab_models.getUserLabRole(labId, userId);

  if (!userLab.status) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para ver os usuários do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Busca os usuários do laboratório:
  const users = await lab_models.getLabUsers(labId);

  if (!users.status) {
    return response.status(404).json({
      status: false,
      msg: "Nenhum usuário encontrado para o laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Usuários do laboratório listados com sucesso.",
    users: users.data,
  });
}

// O========================================================================================O

// Função para alterar o nível de administrador de um usuário em um laboratório:
async function change_user_admin_level(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

  // desmonta o token para obter o user_id:
  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id;
  }
  catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido.",
    });
  }

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { lab_id, user_id, user_admin_level } = request.body;


  // userId -> usuário ativo
  // user_id -> usuário passivo (que terá o nível alterado)

  /* -------------------------------------------------- */

  // Verificando se o usuário ativo e o usuário passivo são iguais:

  if (userId === user_id) {
    return response.status(400).json({
      status: false,
      msg: "Não é possível alterar o nível do responsável pelo laboratório.",
    });
  }

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

  if (!userLab.status || parseInt(userLab.data.user_access_level) < 3) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para alterar o nível de administrador do usuário.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário passivo faz parte do laboratório:
  const targetUserLab = await lab_models.getUserLabRole(lab_id, user_id);

  if (!targetUserLab.status) {
    return response.status(404).json({
      status: false,
      msg: "O usuário alvo não faz parte do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o novo nível é igual ao atual:
  if (parseInt(targetUserLab.data.user_access_level) === parseInt(user_admin_level)) {
    return response.status(400).json({
      status: false,
      msg: "O usuário já possui o nível de administrador informado.",
    });
  }

  /* -------------------------------------------------- */

  // Atualiza o nível de administrador do usuário:
  const result = await lab_models.updateUserLabRole(lab_id, user_id, user_admin_level);

  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao alterar o nível de administrador do usuário.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Nível de administrador do usuário alterado com sucesso.",
  });
}

// O========================================================================================O

// Função para adicionar um usuário a um laboratório:
async function add_user_to_lab(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

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
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { lab_id, user_id, user_admin_level } = request.body;

  // userId -> usuário ativo
  // user_id -> usuário passivo (que será adicionado ao laboratório)

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

  // Verificando se o usuário passivo existe:
  const targetUser = await user_models.getUserById(user_id);

  if (!targetUser.status) {
    return response.status(404).json({
      status: false,
      msg: "Usuário alvo não encontrado.",
    });
  }

  // Verificando se o usuário passivo pertence ao mesmo campus do usuário ativo:
  if (targetUser.data.campus_id !== user.data.campus_id) {
    return response.status(403).json({
      status: false,
      msg: "O usuário alvo não pertence ao mesmo campus do usuário ativo.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário ativo tem acesso ao laboratório:
  const userLab = await lab_models.getUserLabRole(lab_id, userId);

  if (!userLab.status || parseInt(userLab.data.user_access_level) < 3) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para adicionar usuários ao laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário passivo já faz parte do laboratório:
  const targetUserLab = await lab_models.getUserLabRole(lab_id, user_id);

  if (targetUserLab.status) {
    return response.status(400).json({
      status: false,
      msg: "O usuário alvo já faz parte do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Adiciona o usuário ao laboratório:
  const result = await lab_models.addUserToLab(lab_id, user_admin_level, user_id);
  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao adicionar o usuário ao laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Usuário adicionado ao laboratório com sucesso.",
  });
}

// O========================================================================================O

// Função para remover um usuário de um laboratório:
async function remove_user_from_lab(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers["x-access-token"];

  // desmonta o token para obter o user_id:
  let userId;

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id;
  }

  catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido.",
    });
  }

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
    });

  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { lab_id, user_id } = request.body;

  // userId -> usuário ativo
  // user_id -> usuário passivo (que será removido do laboratório)

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

  if (!userLab.status || parseInt(userLab.data.user_access_level) < 3) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para remover usuários do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se existe a relação do usuário passivo com o laboratório:
  const targetUserLab = await lab_models.getUserLabRole(lab_id, user_id);

  if (!targetUserLab.status) {
    return response.status(404).json({
      status: false,
      msg: "O usuário alvo não faz parte do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Remove o usuário do laboratório:
  const result = await lab_models.removeUserFromLab(lab_id, user_id);

  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao remover o usuário do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposta de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Usuário removido do laboratório com sucesso.",
  });
}

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  register_new_laboratory,
  delete_laboratory,
  list_user_laboratories,
  list_laboratory_schedule,
  get_lab_users,
  change_user_admin_level,
  add_user_to_lab,
  remove_user_from_lab
};

// O========================================================================================O
