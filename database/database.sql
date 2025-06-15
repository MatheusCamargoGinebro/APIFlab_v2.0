-- =========================================== DATABASE iflab =========================================== --
DROP DATABASE IF EXISTS iflab;

CREATE DATABASE IF NOT EXISTS iflab;

USE iflab;

-- =========================================== TABLES =========================================== --
-- Campus:
CREATE TABLE IF NOT EXISTS
    campus (
        -- PK
        campusId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (campusId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        uf CHAR(2) NOT NULL
    );

-- Usuário:
CREATE TABLE IF NOT EXISTS
    user(
        -- PK
        userId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (userId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password CHAR(60) NOT NULL,
        salt CHAR(60) NOT NULL,
        image LONGTEXT,
        type ENUM('Aluno', 'Funcionário') NOT NULL,
        accessLevel ENUM('1', '2', '3') NOT NULL,
        -- FK
        campusId INT NOT NULL,
        FOREIGN KEY (campusId) REFERENCES campus (campusId) ON DELETE CASCADE ON UPDATE CASCADE
    );

--Laboratório:
CREATE TABLE IF NOT EXISTS
    laboratory (
        -- PK
        labId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (labId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        -- FK
        campusId INT NOT NULL,
        FOREIGN KEY (campusId) REFERENCES campus (campusId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Relação entre Usuário e Laboratório:
CREATE TABLE IF NOT EXISTS
    userlab (
        -- PK
        userLabId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (userLabId),
        -- Attributes
        accessLevel ENUM('1', '2', '3') NOT NULL,
        -- FK
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES laboratory (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE IF NOT EXISTS
    session (
        -- PK
        sessionId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (sessionId),
        -- Attributes
        dateOf DATE NOT NULL,
        hourStart TIME NOT NULL,
        hourEnd TIME NOT NULL,
        statusOf ENUM(
            'Agendada',
            'Andamento',
            'Finalizada',
            'Cancelada'
        ) NOT NULL,
        -- FK
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES laboratory (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Produtos químicos:
CREATE TABLE IF NOT EXISTS
    chemical (
        -- PK
        chemicalId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (chemicalId),
        -- Attributes
        name VARCHAR(32) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        molarMass DECIMAL(10, 2) NOT NULL,
        casNumber VARCHAR(32) NOT NULL,
        ecNumber VARCHAR(32) NOT NULL,
        physicalState ENUM('Sólido', 'Líquido', 'Gasoso') NOT NULL,
        accessLevel ENUM('1', '2', '3') NOT NULL,
        expirationDate DATE NOT NULL,
        image LONGTEXT,
        -- FK
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES laboratory (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Equipamentos:
CREATE TABLE IF NOT EXISTS
    equipment (
        -- PK
        equipmentId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (equipmentId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        description TEXT NOT NULL,
        quantity INT NOT NULL,
        quality ENUM('1', '2', '3', '4', '5') NOT NULL,
        accessLevel ENUM('1', '2', '3') NOT NULL,
        image LONGTEXT,
        -- FK
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES laboratory (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Relação entre Equipamento e sessão:
CREATE TABLE IF NOT EXISTS
    equipmentReservation (
        reservationId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (reservationId),
        -- Attributes
        quantity INT NOT NULL,
        -- FK
        equipmentId INT NOT NULL,
        FOREIGN KEY (equipmentId) REFERENCES equipment (equipmentId) ON DELETE CASCADE ON UPDATE CASCADE,
        sessionId INT NOT NULL,
        FOREIGN KEY (sessionId) REFERENCES session (sessionId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Relação entre Produto químico e sessão:
CREATE TABLE IF NOT EXISTS
    chemicalReservation (
        reservationId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (reservationId),
        -- Attributes
        quantity DECIMAL(10, 2) NOT NULL,
        -- FK
        chemicalId INT NOT NULL,
        FOREIGN KEY (chemicalId) REFERENCES chemical (chemicalId) ON DELETE CASCADE ON UPDATE CASCADE,
        sessionId INT NOT NULL,
        FOREIGN KEY (sessionId) REFERENCES session (sessionId) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE IF NOT EXISTS
    logoutList (
        -- PK
        logoutId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (logoutId),
        -- Attributes
        token VARCHAR(256) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    mailCode (
        -- PK
        emailCodeId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (emailCodeId),
        -- Attributes
        email VARCHAR(256) NOT NULL,
        code char(5) NOT NULL,
        status ENUM('Pendente', 'Utilizado') NOT NULL,
        token VARCHAR(256) NOT NULL,
        expiresAt DATETIME NOT NULL
    );

-- =========================================== INSERTS =========================================== --
-- Inserção na tabela campus
INSERT INTO
    campus (name, uf)
VALUES
    ('Instituto Federal - Campinas', 'SP'),
    ('Instituto Federal - Limeira', 'SP');

-- Inserção na tabela user
INSERT INTO
    user(
        name,
        email,
        password,
        salt,
        image,
        type,
        accessLevel,
        campusId
    )
VALUES
    (
        'João Silva',
        'joao@ifsp.edu.br',
        'salt12345678901234567890123456789012345678901234567890123412',
        'salt12345678901234567890123456789012345678901234567890123412',
        NULL,
        'Aluno',
        '1',
        1
    ),
    (
        'Maria Souza',
        'maria@ifsp.edu.br',
        'salt12345678901234567890123456789012345678901234567890123412',
        'salt12345678901234567890123456789012345678901234567890123412',
        NULL,
        'Funcionário',
        '3',
        1
    );

-- Inserção na tabela laboratory
INSERT INTO
    laboratory (name, campusId)
VALUES
    ('Lab de Química Orgânica', 1),
    ('Lab de Biotecnologia', 1);

-- Inserção na tabela userlab
INSERT INTO
    userlab (accessLevel, userId, labId)
VALUES
    ('1', 1, 1),
    ('3', 2, 1);

-- Inserção na tabela session
INSERT INTO
    session (
        dateOf,
        hourStart,
        hourEnd,
        statusOf,
        userId,
        labId
    )
VALUES
    (
        '2025-06-12',
        '09:00:00',
        '11:00:00',
        'Agendada',
        1,
        1
    ),
    (
        '2025-06-13',
        '14:00:00',
        '16:00:00',
        'Finalizada',
        2,
        1
    );

-- Inserção na tabela chemical
INSERT INTO
    chemical (
        name,
        quantity,
        molarMass,
        casNumber,
        ecNumber,
        physicalState,
        accessLevel,
        expirationDate,
        image,
        labId
    )
VALUES
    (
        'Etanol',
        500.00,
        46.07,
        '64-17-5',
        '200-578-6',
        'Líquido',
        '1',
        '2026-12-31',
        NULL,
        1
    ),
    (
        'Ácido Acético',
        250.00,
        60.05,
        '64-19-7',
        '200-580-7',
        'Líquido',
        '2',
        '2025-11-30',
        NULL,
        1
    );

-- Inserção na tabela equipment
INSERT INTO
    equipment (
        name,
        description,
        quantity,
        quality,
        accessLevel,
        image,
        labId
    )
VALUES
    (
        'Balança Analítica',
        'Alta precisão para pesagens químicas.',
        2,
        '5',
        '1',
        NULL,
        1
    ),
    (
        'Centrífuga',
        'Usada para separação de fases em amostras.',
        1,
        '4',
        '2',
        NULL,
        1
    );

-- Inserção na tabela equipmentReservation
INSERT INTO
    equipmentReservation (quantity, equipmentId, sessionId)
VALUES
    (1, 1, 1),
    (1, 2, 2);

-- Inserção na tabela chemicalReservation
INSERT INTO
    chemicalReservation (quantity, chemicalId, sessionId)
VALUES
    (50.00, 1, 1),
    (20.00, 2, 2);

-- Inserção na tabela logoutList
INSERT INTO
    logoutList (token)
VALUES
    ('token123456abcdef7890'),
    ('tokenabcdef1234567890');

-- Inserção na tabela mailCode
INSERT INTO
    mailCode (email, code, status, token, expiresAt)
VALUES
    (
        'joao@ifsp.edu.br',
        'A1B2C',
        'Pendente',
        'token1example',
        '2025-06-12 23:59:59'
    ),
    (
        'maria@ifsp.edu.br',
        'D3E4F',
        'Utilizado',
        'token2example',
        '2025-06-10 23:59:59'
    );

-- =========================================== PROCEDURES =========================================== --
-- O===============================O --
/*
#
|   O==============O
|   |    Campus    |
|   O==============O
#
|   - GetAllCampus
|   - getCampusByName
|   - registerNewCampus
#
 */
-- O===============================O --
-- Ler todos os campus:
DROP PROCEDURE IF EXISTS GetAllCampus;

DELIMITER $$
CREATE PROCEDURE GetAllCampus () BEGIN
SELECT
    *
FROM
    campus;

END $$ DELIMITER;

-- Ler campus por nome:
DROP PROCEDURE IF EXISTS getCampusByName;

DELIMITER $$
CREATE PROCEDURE getCampusByName (IN campusName VARCHAR(128)) BEGIN
SELECT
    *
FROM
    campus
WHERE
    name = campusName;

END $$ DELIMITER;

-- Registrar novo campus:
DROP PROCEDURE IF EXISTS registerNewCampus;

DELIMITER $$
CREATE PROCEDURE registerNewCampus (IN campusName VARCHAR(128), IN campusUf CHAR(2)) BEGIN
INSERT INTO
    campus (name, uf)
VALUES
    (campusName, campusUf);

END $$ DELIMITER;

-- O===============================O --