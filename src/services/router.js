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

  - [X] LoginUser
  - [X] LogoutUser
  - [X] EmailValidation
  - [X] EmailCodeValidation
  - [X] PasswordRecovery
  - [X] RegisterUser
  - [X] EditUserName
  - [X] EditUserEmail
  - [X] EditUserPassword
  - [X] EditUserImage
  - [X] GetUserInfo 
*/

// O========================================================================================O

// LoginUser:
router.post(
  "/users/login",
  user_middlewares.user_email,
  user_middlewares.user_password,
  user_controllers.login_user
);

// LogoutUser:
router.post(
  "/users/logout",
  user_middlewares.check_token,
  user_controllers.logout_user
);

// EmailValidation:
router.post(
  "/users/email/getcode",
  user_middlewares.user_email,
  user_middlewares.reason_for_code,
  user_controllers.email_validation
);

// EmailCodeValidation:
router.post(
  "/users/email/validate",
  user_middlewares.user_email,
  user_middlewares.user_validation_code,
  user_controllers.email_code_validation
);

// PasswordRecovery:
router.post(
  "/users/password/recovery",
  user_middlewares.user_validation_code,
  user_middlewares.user_email,
  user_middlewares.user_password,
  user_controllers.password_recovery
);

// RegisterUser:
router.post(
  "/users/register",
  user_middlewares.user_email,
  user_middlewares.user_password,
  user_middlewares.user_name,
  user_middlewares.user_creation_token,
  campus_middlewares.campus_id,
  user_controllers.register_user
);

// EditUserName:
router.post(
  "/users/edit/name",
  user_middlewares.check_token,
  user_middlewares.user_name,
  user_controllers.edit_user_name
);

// EditUserEmail:
router.post(
  "/users/edit/email",
  user_middlewares.check_token,
  user_middlewares.user_email,
  user_middlewares.user_validation_code,
  user_controllers.edit_user_email
);

// EditUserPassword:
router.post(
  "/users/edit/password",
  user_middlewares.check_token,
  user_middlewares.user_password,
  user_controllers.edit_user_password
);

// EditUserImage:
router.post(
  "/users/edit/image",
  user_middlewares.check_token,
  user_middlewares.user_image,
  user_controllers.edit_user_image
);

// GetUserInfo:
router.get(
  "/users/info",
  user_middlewares.check_token,
  user_controllers.get_user_info
);

// O========================================================================================O

// Importando os middlewares e controllers necessários:
const lab_middlewares = require("../middlewares/lab_middlewares");
const lab_controllers = require("../controllers/lab_controllers");

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
  - [] addUserToLab
  - [] removeUserFromLab
*/

// O========================================================================================O

// RegisterNewLaboratory:
router.post(
  "/labs/register",
  user_middlewares.check_token,
  lab_middlewares.lab_name,
  lab_controllers.register_new_laboratory
);

// DeleteLaboratory:
router.delete(
  "/labs/delete/:labId",
  user_middlewares.check_token,
  lab_middlewares.labId,
  lab_controllers.delete_laboratory
);

// ListUserLaboratories:
router.get(
  "/labs/my",
  user_middlewares.check_token,
  lab_controllers.list_user_laboratories
);

// ListLaboratorySchedule:
router.get(
  "/labs/schedule/:labId/:date",
  user_middlewares.check_token,
  lab_middlewares.labId,
  lab_middlewares.lab_date,
  lab_controllers.list_laboratory_schedule
);

// getLabUsers:
router.get(
  "/labs/users/:labId",
  user_middlewares.check_token,
  lab_middlewares.labId,
  lab_controllers.get_lab_users
);

// changeUserAdminLevel:
router.put(
  "/labs/admin",
  user_middlewares.check_token,
  lab_middlewares.lab_id,
  user_middlewares.user_id,
  user_middlewares.user_admin_level,
  lab_controllers.change_user_admin_level
);

// addUserToLab:
router.post(
  "/labs/admin",
  user_middlewares.check_token,
  lab_middlewares.lab_id,
  user_middlewares.user_id,
  user_middlewares.user_admin_level,
  lab_controllers.add_user_to_lab
);

// removeUserFromLab:
router.delete(
  "/labs/admin",
  user_middlewares.check_token,
  lab_middlewares.lab_id,
  user_middlewares.user_id,
  user_middlewares.user_admin_level,
  lab_controllers.remove_user_from_lab
);

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
