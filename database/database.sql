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
        expiresAt DATETIME NOT NULL,
        motive ENUM('senha', 'email', 'registro') NOT NULL
    );

-- =========================================== INSERTS =========================================== --
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
|   - getCampusById
|   - getAllUsersByCampusId
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

-- Ler campus por ID:
DROP PROCEDURE IF EXISTS getCampusById;

DELIMITER $$
CREATE PROCEDURE getCampusById (IN campus_id INT) BEGIN
SELECT
    campusId as campus_id,
    name as campus_name,
    uf as campus_uf
FROM
    campus
WHERE
    campusId = campus_id;

END $$ DELIMITER;

-- Ler todos os usuários por ID de campus:
DROP PROCEDURE IF EXISTS getAllUsersByCampusId;

DELIMITER $$
CREATE PROCEDURE getAllUsersByCampusId (IN campus_id INT) BEGIN
SELECT
    userId as user_id
FROM
    user
WHERE
    campusId = campus_id;

END $$ DELIMITER;

-- O===============================O --
/* 
#
|   O==============O
|   |    Usuário   |
|   O==============O
#
|   - getUserByEmail
|   - addToBlackList
|   - getFromBlackList
|   - saveVerificationCode
|   - validateVerificationCode
|   - discardCode
|   - updateUserPassword 
|   - getUserByName
|   - registerNewUser
|   - updateUserName
|   - updateUserEmail
|   - updateUserImage
|   - getUserById
#
 */
-- O===============================O --
-- Ler usuário por email:
DROP PROCEDURE IF EXISTS getUserByEmail;

DELIMITER $$
CREATE PROCEDURE getUserByEmail (IN userEmail VARCHAR(128)) BEGIN
SELECT
    userId as user_id,
    name as user_name,
    email as user_email,
    password as user_password
FROM
    user
WHERE
    email = userEmail;

END $$ DELIMITER;

-- Adicionar token à lista de logout:
DROP PROCEDURE IF EXISTS addToBlackList;

DELIMITER $$
CREATE PROCEDURE addToBlackList (IN token VARCHAR(256)) BEGIN
INSERT INTO
    logoutList (token)
VALUES
    (token);

END $$ DELIMITER;

-- Obter token da lista de logout:
DROP PROCEDURE IF EXISTS getFromBlackList;

DELIMITER $$
CREATE PROCEDURE getFromBlackList (IN token_test VARCHAR(256)) BEGIN
SELECT
    *
FROM
    logoutList
WHERE
    token = token_test;

END $$ DELIMITER;

-- Salvar código de verificação de email:
DROP PROCEDURE IF EXISTS saveVerificationCode;

DELIMITER $$
CREATE PROCEDURE saveVerificationCode (
    IN userEmail VARCHAR(256),
    IN verificationCode CHAR(5),
    IN token VARCHAR(256),
    IN reasonTo ENUM('senha', 'email', 'registro')
) BEGIN IF EXISTS (
    SELECT
        1
    FROM
        mailCode
    WHERE
        email = userEmail
        AND status = 'Pendente'
        AND motive = reasonTo
) THEN
UPDATE mailCode
SET
    code = verificationCode,
    token = token,
    expiresAt = DATE_ADD(NOW(), INTERVAL 1 HOUR)
WHERE
    email = userEmail
    AND status = 'Pendente'
    AND motive = reasonTo;

ELSE
INSERT INTO
    mailCode (email, code, status, token, expiresAt, motive)
VALUES
    (
        userEmail,
        verificationCode,
        'Pendente',
        token,
        DATE_ADD(NOW(), INTERVAL 1 HOUR),
        reasonTo
    );

END IF;

END $$ DELIMITER;

-- Validar código de verificação de email:
DROP PROCEDURE IF EXISTS validateVerificationCode;

DELIMITER $$
CREATE PROCEDURE validateVerificationCode (
    IN userEmail VARCHAR(256),
    IN code_v CHAR(5),
    IN reasonTo ENUM('senha', 'email', 'registro')
) BEGIN
SELECT
    emailCodeId as email_code_id,
    email as user_email,
    code as verification_code,
    status as code_status,
    token as verification_token,
    expiresAt as expiration_time
FROM
    mailCode
WHERE
    email = userEmail
    AND code = code_v
    AND status = 'Pendente'
    AND motive = reasonTo
    AND expiresAt > NOW();

END $$ DELIMITER;

-- Descartar código de verificação:
DROP PROCEDURE IF EXISTS discardCode;

DELIMITER $$
CREATE PROCEDURE discardCode (IN email_code_id INT) BEGIN
UPDATE mailCode
SET
    status = 'Utilizado'
WHERE
    emailCodeId = email_code_id;

END $$ DELIMITER;

-- Atualizar senha do usuário:
DROP PROCEDURE IF EXISTS updateUserPassword;

DELIMITER $$
CREATE PROCEDURE updateUserPassword (IN user_id INT, IN newPassword CHAR(60)) BEGIN
UPDATE user
SET password = newPassword
WHERE
    userId = user_id;

END $$ DELIMITER;

-- Ler usuário por nome:
DROP PROCEDURE IF EXISTS getUserByName;

DELIMITER $$
CREATE PROCEDURE getUserByName (IN userName VARCHAR(128)) BEGIN
SELECT
    userId as user_id,
    name as user_name,
    email as user_email,
    type as user_type,
    accessLevel as user_access_level,
    campusId as campus_id
FROM
    user
WHERE
    name = userName;

END $$ DELIMITER;

-- Registrar novo usuário:
DROP PROCEDURE IF EXISTS registerNewUser;

DELIMITER $$
CREATE PROCEDURE registerNewUser (
    IN userName VARCHAR(128),
    IN userEmail VARCHAR(128),
    IN userPassword CHAR(60),
    IN userType ENUM('Aluno', 'Funcionário'),
    IN userAccessLevel ENUM('1', '2', '3'),
    IN campusId INT
) BEGIN
INSERT INTO
    user(
        name,
        email,
        password,
        type,
        accessLevel,
        campusId
    )
VALUES
    (
        userName,
        userEmail,
        userPassword,
        userType,
        userAccessLevel,
        campusId
    );

END $$ DELIMITER;

-- Atualizar nome do usuário:
DROP PROCEDURE IF EXISTS updateUserName;

DELIMITER $$
CREATE PROCEDURE updateUserName (IN user_id INT, IN newName VARCHAR(128)) BEGIN
UPDATE user
SET
    name = newName
WHERE
    userId = user_id;

END $$ DELIMITER;

-- Atualizar email do usuário:
DROP PROCEDURE IF EXISTS updateUserEmail;

DELIMITER $$
CREATE PROCEDURE updateUserEmail (IN user_id INT, IN newEmail VARCHAR(128)) BEGIN
UPDATE user
SET
    email = newEmail
WHERE
    userId = user_id;

END $$ DELIMITER;

-- Atualizar imagem do usuário:
DROP PROCEDURE IF EXISTS updateUserImage;

DELIMITER $$
CREATE PROCEDURE updateUserImage (IN user_id INT, IN newImage LONGTEXT) BEGIN
UPDATE user
SET
    image = newImage
WHERE
    userId = user_id;

END $$ DELIMITER;

-- Ler usuário por ID:
DROP PROCEDURE IF EXISTS getUserById;

DELIMITER $$
CREATE PROCEDURE getUserById (IN user_id INT) BEGIN
SELECT
    userId as user_id,
    name as user_name,
    email as user_email,
    type as user_type,
    accessLevel as user_access_level,
    image as user_image,
    campusId as campus_id
FROM
    user
WHERE
    userId = user_id;

END $$ DELIMITER;

-- O===============================O --
/* 
#
|   O===================O
|   |    Laboratórios   |
|   O===================O
#
|   - getLabByName
|   - registerNewLab
|   - addUserToLab 
|   - getLabById
|   - getUserLabRole
|   - deleteLabById
#
 */
-- O===============================O --
-- Ler laboratório por nome:
DROP PROCEDURE IF EXISTS getLabByName;

DELIMITER $$
CREATE PROCEDURE getLabByName (IN labName VARCHAR(128)) BEGIN
SELECT
    labId as lab_id,
    name as lab_name,
    campusId as campus_id
FROM
    laboratory
WHERE
    name = labName;

END $$ DELIMITER;

-- Registrar novo laboratório:
DROP PROCEDURE IF EXISTS registerNewLab;

DELIMITER $$
CREATE PROCEDURE registerNewLab (
    IN labName VARCHAR(128),
    IN campusId INT,
    IN lab_owner INT
) BEGIN
INSERT INTO
    laboratory (name, campusId)
VALUES
    (labName, campusId);

END $$ DELIMITER;

-- Adicionar usuário ao laboratório:
DROP PROCEDURE IF EXISTS addUserToLab;

DELIMITER $$
CREATE PROCEDURE addUserToLab (
    IN lab_id INT,
    IN access_level ENUM('1', '2', '3'),
    IN user_id INT
) BEGIN
INSERT INTO
    userlab (accessLevel, userId, labId)
VALUES
    (access_level, user_id, lab_id);

END $$ DELIMITER;

-- Ler laboratório por ID:
DROP PROCEDURE IF EXISTS getLabById;

DELIMITER $$
CREATE PROCEDURE getLabById (IN lab_id INT) BEGIN
SELECT
    labId as lab_id,
    name as lab_name,
    campusId as campus_id
FROM
    laboratory
WHERE
    labId = lab_id;

END $$ DELIMITER;

-- Obter o nível de acesso do usuário em um laboratório:
DROP PROCEDURE IF EXISTS getUserLabRole;

DELIMITER $$
CREATE PROCEDURE getUserLabRole (IN lab_id INT, IN user_id INT) BEGIN
SELECT
    accessLevel as user_access_level
FROM
    userlab
WHERE
    userId = user_id
    AND labId = lab_id;

END $$ DELIMITER;

-- Deletar laboratório por ID:
DROP PROCEDURE IF EXISTS deleteLabById;

DELIMITER $$
CREATE PROCEDURE deleteLabById (IN lab_id INT) BEGIN
DELETE FROM equipmentreservation
WHERE
    sessionId IN (
        SELECT
            sessionId
        FROM
            session
        WHERE
            labId = lab_id
    );

DELETE FROM chemicalreservation
WHERE
    sessionId IN (
        SELECT
            sessionId
        FROM
            session
        WHERE
            labId = lab_id
    );

DELETE FROM session
WHERE
    labId = lab_id;

DELETE FROM userlab
WHERE
    labId = lab_id;

DELETE FROM laboratory
WHERE
    labId = lab_id;

END $$ DELIMITER;

-- O===============================O --