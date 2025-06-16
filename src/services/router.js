// O========================================================================================O

/* 
  O======================================================O
  |    Arquivo de configuração das rotas da aplicação    |
  O======================================================O
*/

// O========================================================================================O

// Importando o módulo de roteamento do express:
const express = require("express");
const router = express.Router();

// Configuração do CORS
router.use((__req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, Accept"
  );

  next();
});

module.exports = router;

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const campus_middlewares = require("../middlewares/campus_middlewares");
const campus_controllers = require("../controllers/campus_controllers");

/*
  O======================O
  |   Rotas de Campus    |
  O======================O

  - [X] ListCampus
  - [X] RegisterNewCampus
*/

// O========================================================================================O

// ListCampus:
router.get("/campus/get", campus_controllers.get_campus_list);

// RegisterNewCampus:
router.post(
  "/campus/register",
  campus_middlewares.campus_name,
  campus_middlewares.campus_uf,
  campus_controllers.register_new_campus
);

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const user_middlewares = require("../middlewares/user_middlewares");
const user_controllers = require("../controllers/user_controllers");

/*
  O========================O
  |   Rotas de Usuários    |
  O========================O

  - [] LoginUser
  - [] LogoutUser
  - [] EmailValidation
  - [] EmailCodeValidation
  - [] PasswordRecovery
  - [] RegisterUser
  - [] EditUserName
  - [] EditUserEmail
  - [] EditUserPassword
  - [] EditUserType
  - [] GetUserInfo 
*/

// O========================================================================================O

router.post(
  "/user/login",
  user_middlewares.user_email,
  user_middlewares.user_password,
  user_controllers.login_user
);

router.post(
  "/user/logout",
  user_middlewares.check_token,
  user_controllers.logout_user
);

router.post(
  "/user/email/getcode",
  user_middlewares.user_email,
  user_controllers.email_validation
);

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const lab_middlewares = require("../middlewares/lab_middlewares");
/* const lab_controllers = require("../controllers/lab_controllers"); */

/*
  O============================O
  |   Rotas de Laboratórios    |
  O============================O

  - [] RegisterNewLaboratory
  - [] DeleteLaboratory
  - [] ListUserLaboratories
  - [] ListLaboratorySchedule
  - [] getLabUsers
  - [] changeUserAdminLevel
*/

// O========================================================================================O

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const element_middlewares = require("../middlewares/element_middlewares");
/* const element_controllers = require("../controllers/element_controllers"); */

/*
  O=========================O
  |   Rotas de Elementos    |
  O=========================O
  
  - [] ReisterElement
  - [] DeleteElement
  - [] ListLabElements
  - [] GetSessionElements
  - [] GetElementInfo
  - [] EditElementName
  - [] EditElementQuantity
  - [] EditElementCAS
  - [] EditElementEC
  - [] EditElementPhysicalState
  - [] EditElementValidity
  - [] EditElementAdministration
  - [] EditElementMolarMass
  - [] EditElementImage
*/

// O========================================================================================O

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const equipment_middlewares = require("../middlewares/equipment_middlewares");
/* const equipment_controllers = require("../controllers/equipment_controllers"); */

/*
  O============================O
  |   Rotas de Equipamentos    |
  O============================O

  - [] RegisterEquipment
  - [] DeleteEquipment
  - [] ListLabEquipments
  - [] ListSessionEquipments
  - [] GetEquipmentInfo
  - [] EditEquipmentName
  - [] EditEquipmentQuantity
  - [] EditEquipmentQuality
  - [] EditEquipmentDescription
  - [] EditEquipmentAdministration
  - [] EditEquipmentImage
*/

// O========================================================================================O

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const session_middlewares = require("../middlewares/session_middlewares");
/* const session_controllers = require("../controllers/session_controllers"); */

/*
  O=======================O
  |   Rotas de Sessões    |
  O=======================O

  - [] CreateNewSession
  - [] DeleteSession
  - [] StartSession
  - [] FinishSession
  - [] ListUserSessions
  - [] GetUtilizationForms
  - [] SaveUtilizationForm

*/

// O========================================================================================O

// O========================================================================================O
