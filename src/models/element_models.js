// O========================================================================================O

/*
    O======================================================O
    |   Funções de models das informações dos elementos    |
    O======================================================O

    Lista de funções:  
    - [X] registerElement
    - [X] getElementById
    - [X] deleteElement
    - [X] getElementsFromLab
    - [X] getElementsBySessionId
    - [X] editElementName
    - [X] editElementQuantity
    - [X] editElementCAS
    - [X] editElelemtEC
    - [X] editElementPhysicalState
    - [X] editElementValidity
    - [X] editElementAdmin
    - [X] editElementMolarMass
    - [X] editElementImage
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
        return { status: false, data: null };
    } else {
        return { status: true, data: result[0][0] };
    }
}

// O========================================================================================O

const deleteElement = async (elementId) => {
    const query = "CALL deleteElement(?)";
    const [result] = await connection.execute(query, [elementId]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

const getElementsFromLab = async (labId) => {
    const query = "CALL getElementsFromLab(?)";

    const [result] = await connection.execute(query, [labId]);

    if (result[0].length === 0) {
        return { status: false, data: null };
    } else {
        return { status: true, data: result[0] };
    }
}

// O========================================================================================O

const getElementsBySessionId = async (sessionId) => {
    const query = "CALL getElementsBySessionId(?)";
    const [result] = await connection.execute(query, [sessionId]);

    if (result[0].length === 0) {
        return { status: false, data: null };
    } else {
        return { status: true, data: result[0] };
    }
}

// O========================================================================================O

// editElementName
const editElementName = async (element_id, element_name) => {
    const query = "CALL editElementName(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_name]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementQuantity
const editElementQuantity = async (element_id, element_quantity) => {
    const query = "CALL editElementQuantity(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_quantity]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementCAS
const editElementCAS = async (element_id, element_cas_number) => {
    const query = "CALL editElementCAS(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_cas_number]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElelemtEC
const editElementEC = async (element_id, element_ec_number) => {
    const query = "CALL editElementEC(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_ec_number]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementPhysicalState
const editElementPhysicalState = async (element_id, element_physical_state) => {
    const query = "CALL editElementPhysicalState(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_physical_state]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementValidity
const editElementValidity = async (element_id, element_validity) => {
    const query = "CALL editElementValidity(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_validity]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementAdmin
const editElementAdmin = async (element_id, element_admin_level) => {
    const query = "CALL editElementAdmin(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_admin_level]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementMolarMass
const editElementMolarMass = async (element_id, element_molar_mass) => {
    const query = "CALL editElementMolarMass(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_molar_mass]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O

// editElementImage
const editElementImage = async (element_id, element_image) => {
    const query = "CALL editElementImage(?, ?)";
    const [result] = await connection.execute(query, [element_id, element_image]);

    if (result.affectedRows === 0) {
        return { status: false };
    } else {
        return { status: true };
    }
}

// O========================================================================================O


// Exportando as funções:
module.exports = {
    registerElement,
    getElementById,
    deleteElement,
    getElementsFromLab,
    getElementsBySessionId,
    editElementName,
    editElementQuantity,
    editElementCAS,
    editElementEC,
    editElementPhysicalState,
    editElementValidity,
    editElementAdmin,
    editElementMolarMass,
    editElementImage
};

// O========================================================================================O
