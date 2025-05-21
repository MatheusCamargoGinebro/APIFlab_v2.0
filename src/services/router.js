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

router.get("/", (req, res) => {
  res.send("API is running");
});

// O========================================================================================O

/*
  O======================O
  |   Rotas de Campus    |
  O======================O

  - [] ListCampus
  - [] RegisterNewCampus
*/

// O========================================================================================O

// O========================================================================================O

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

// O========================================================================================O

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
