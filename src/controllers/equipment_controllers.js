// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:  
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

// Importando os módulos necessários:
const equipments_models = require("../models/equipments_models");

// Importando o módulo de usuários:
const user_models = require("../models/user_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// O========================================================================================O

// Função para registrar um novo equipamento:
const RegisterEquipment = async (req, res) => { }

// O========================================================================================O

// Função para deletar um equipamento:
const DeleteEquipment = async (req, res) => { }

// O========================================================================================O

// Função para listar os equipamentos de um laboratório:
const ListLabEquipments = async (req, res) => { }

// O========================================================================================O

// Função para listar os equipamentos de uma sessão:
const ListSessionEquipments = async (req, res) => { }

// O========================================================================================O

// Função para obter as informações de um equipamento:
const GetEquipmentInfo = async (req, res) => { }

// O========================================================================================O

// Função para editar o nome de um equipamento:
const EditEquipmentName = async (req, res) => { }

// O========================================================================================O

// Função para editar a quantidade de um equipamento:
const EditEquipmentQuantity = async (req, res) => { }

// O========================================================================================O

// Função para editar a qualidade de um equipamento:
const EditEquipmentQuality = async (req, res) => { }

// O========================================================================================O

// Função para editar a descrição de um equipamento:
const EditEquipmentDescription = async (req, res) => { }

// O========================================================================================O

// Função para editar a administração de um equipamento:
const EditEquipmentAdministration = async (req, res) => { }

// O========================================================================================O

// Função para editar a imagem de um equipamento:
const EditEquipmentImage = async (req, res) => { }

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
    RegisterEquipment,
    DeleteEquipment,
    ListLabEquipments,
    ListSessionEquipments,
    GetEquipmentInfo,
    EditEquipmentName,
    EditEquipmentQuantity,
    EditEquipmentQuality,
    EditEquipmentDescription,
    EditEquipmentAdministration,
    EditEquipmentImage
};

// O========================================================================================O