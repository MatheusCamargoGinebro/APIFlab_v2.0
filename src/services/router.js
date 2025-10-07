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
// Campus:
const campus_middlewares = require("../middlewares/campus_middlewares");
const campus_controllers = require("../controllers/campus_controllers");

// Users:
const user_middlewares = require("../middlewares/user_middlewares");
const user_controllers = require("../controllers/user_controllers");

// labs:
const lab_middlewares = require("../middlewares/lab_middlewares");
const lab_controllers = require("../controllers/lab_controllers");

// Elements:
const element_middlewares = require("../middlewares/element_middlewares");
const element_controllers = require("../controllers/element_controllers");

// Equipments:
const equipment_middlewares = require("../middlewares/equipment_middlewares");
const equipment_controllers = require("../controllers/equipment_controllers");

// Sessions:
const session_middlewares = require("../middlewares/session_middlewares");
/* const session_controllers = require("../controllers/session_controllers"); */

// O========================================================================================O

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
router.put(
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
router.put(
	"/users/edit/name",
	user_middlewares.check_token,
	user_middlewares.user_name,
	user_controllers.edit_user_name
);

// EditUserEmail:
router.put(
	"/users/edit/email",
	user_middlewares.check_token,
	user_middlewares.user_email,
	user_middlewares.user_validation_code,
	user_controllers.edit_user_email
);

// EditUserPassword:
router.put(
	"/users/edit/password",
	user_middlewares.check_token,
	user_middlewares.user_password,
	user_controllers.edit_user_password
);

// EditUserImage:
router.put(
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

/*
  O============================O
  |   Rotas de Laboratórios    |
  O============================O

  - [X] RegisterNewLaboratory
  - [X] DeleteLaboratory
  - [X] ListUserLaboratories
  - [X] ListLaboratorySchedule
  - [X] getLabUsers
  - [X] changeUserAdminLevel
  - [X] addUserToLab
  - [X] removeUserFromLab
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
	lab_controllers.remove_user_from_lab
);

// O========================================================================================O

/*
  O=========================O
  |   Rotas de Elementos    |
  O=========================O
  
  - [X] RegisterElement
  - [X] DeleteElement
  - [X] ListLabElements
  - [X] GetSessionElements
  - [X] GetElementInfo
  - [X] EditElementName
  - [X] EditElementQuantity
  - [X] EditElementCAS
  - [X] EditElementEC
  - [X] EditElementPhysicalState
  - [X] EditElementValidity
  - [X] EditElementAdministration
  - [X] EditElementMolarMass
  - [X] EditElementImage
*/

// O========================================================================================O

// RegisterElement:
router.post(
	"/elements/register",
	user_middlewares.check_token,
	element_middlewares.element_name,
	element_middlewares.element_image,
	element_middlewares.element_molar_mass,
	element_middlewares.element_quantity,
	element_middlewares.element_cas_number,
	element_middlewares.element_ec_number,
	element_middlewares.element_admin_level,
	element_middlewares.element_validity,
	element_middlewares.element_physical_state,
	lab_middlewares.lab_id,
	element_controllers.register_element
);

// DeleteElement:
router.delete(
	"/elements/delete",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_controllers.delete_element
);

// ListLabElements
router.get(
	"/elements/lab/:labId",
	user_middlewares.check_token,
	lab_middlewares.labId,
	element_controllers.list_lab_elements
);

// GetSessionElements:
router.get(
	"/elements/session/:sessionId",
	user_middlewares.check_token,
	session_middlewares.sessionId,
	element_controllers.get_session_elements
);

// GetElementInfo:
router.get(
	"/elements/info/:elementId",
	user_middlewares.check_token,
	element_middlewares.elementId,
	element_controllers.get_element_info
);

//  EditElementName:
router.put(
	"/elements/edit/name",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_name,
	element_controllers.edit_element_name
);

//  EditElementQuantity:
router.put(
	"/elements/edit/quantity",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_quantity,
	element_controllers.edit_element_quantity
);

//  EditElementCAS:
router.put(
	"/elements/edit/cas",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_cas_number,
	element_controllers.edit_element_CAS
);

//  EditElementEC:
router.put(
	"/elements/edit/ec",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_ec_number,
	element_controllers.edit_element_EC
);

//  EditElementPhysicalState:
router.put(
	"/elements/edit/state",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_physical_state,
	element_controllers.edit_element_physical_state
);

//  EditElementValidity:
router.put(
	"/elements/edit/validity",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_validity,
	element_controllers.edit_element_validity
);

//  EditElementAdministration:
router.put(
	"/elements/edit/admin",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_admin_level,
	element_controllers.edit_element_administration
);

//  EditElementMolarMass:
router.put(
	"/elements/edit/molarmass",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_molar_mass,
	element_controllers.edit_element_molar_mass
);

//  EditElementImage:
router.put(
	"/elements/edit/image",
	user_middlewares.check_token,
	element_middlewares.element_id,
	element_middlewares.element_image,
	element_controllers.edit_element_image
);

// O========================================================================================O

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

// RegisterEquipment:
router.post(
	"/equipments/register",
	lab_middlewares.lab_id,
	equipment_middlewares.equipment_name,
	equipment_middlewares.equipment_image,
	equipment_middlewares.equipment_description,
	equipment_middlewares.equipment_quantity,
	equipment_middlewares.equipment_quality,
	equipment_middlewares.equipment_admin_level,
	equipment_controllers.register_equipment
);

// DeleteEquipment:
router.delete(
	"/equipments/delete",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_controllers.delete_equipment
);

// ListLabEquipments:
router.get(
	"/equipments/lab/:labId",
	user_middlewares.check_token,
	lab_middlewares.labId,
	equipment_controllers.list_lab_equipments
);

// listSessionEquipments:
router.get(
	"/equipments/session/:labId",
	user_middlewares.check_token,
	lab_middlewares.labId,
	equipment_controllers.list_session_equipments
);

//  GetEquipmentInfo:
router.get(
	"/equipments/info/:equipmentId",
	user_middlewares.check_token,
	equipment_middlewares.equipmentId,
	equipment_controllers.get_equipment_info
);

//  EditEquipmentName:
router.put(
	"/equipments/edit/name",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_name,
	equipment_controllers.edit_equipment_name
);

//  EditEquipmentQuantity:
router.put(
	"/equipments/edit/quantity",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_quantity,
	equipment_controllers.edit_equipment_quantity
);

//  EditEquipmentQuality:
router.put(
	"/equipments/edit/quality",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_quality,
	equipment_controllers.edit_equipment_quality
);

//  EditEquipmentDescription:
router.put(
	"/equipments/edit/description",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_description,
	equipment_controllers.edit_equipment_description
);

//  EditEquipmentAdministration:
router.put(
	"/equipments/edit/admin",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_admin_level,
	equipment_controllers.edit_equipment_administration
);

//  EditEquipmentImage:
router.put(
	"/equipments/edit/image",
	user_middlewares.check_token,
	equipment_middlewares.equipment_id,
	equipment_middlewares.equipment_image,
	equipment_controllers.edit_equipment_image
);

// O========================================================================================O

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
