// O========================================================================================O

/*
    O====================================================O
    |   Funções de models das informações das sessões    |
    O====================================================O

    Lista de funções:  
    - [X] getSessionById
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

const getSessionById = async (sessionId) => {
    const query = "CALL getSessionById(?)";

    const [result] = await connection.execute(query, [sessionId]);

    if (result[0].length === 0) {
        return { status: false, data: null };
    } else {
        return { status: true, data: result[0][0] };
    }
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
    getSessionById
};