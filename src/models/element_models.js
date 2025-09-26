// O========================================================================================O

/*
    O======================================================O
    |   Funções de models das informações dos elementos    |
    O======================================================O

    Lista de funções:  
    - [] registerElement
    - [] getElementById
    - [] deleteElement
    - [] 
    - [] 
    - [] 
    - [] 
*/

// O========================================================================================O

// Importando módulos necessários:
const { elementId } = require("../middlewares/element_middlewares");
const connection = require("../utils/connection");

// O========================================================================================O

const registerElement = async (element_name, element_image, element_molar_mass, element_quantity, element_cas_number, element_ec_number, element_admin_level, element_validity, element_physical_state, lab_id) => {
    const query = "CALL registerElement(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const [result] = await connection.execute(query, [element_name, element_image, element_molar_mass, element_quantity, element_cas_number, element_ec_number, element_admin_level, element_validity, element_physical_state, lab_id]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

const getElementById = async (elementId) => {
    const query = "CALL getElementById(?)";
    const [result] = await connection.execute(query, [elementId]);

    if (result[0].length === 0) {
        return { status: false, data: null }
    } else {
        return { status: true, data: result[0][0] }
    }
}

// O========================================================================================O

const deleteElement = async (elementId) => {
    const query = "CALL deleteElement(?)";
    const [result] = await connection.execute(query, [elementId]);

    if (result.affectedRows === 0) {
        return { status: false }
    } else {
        return { status: true }
    }
}

// O========================================================================================O

// Exportando as funções:
module.exports = {
    registerElement,
    getElementById,
    deleteElement
};

// O========================================================================================O