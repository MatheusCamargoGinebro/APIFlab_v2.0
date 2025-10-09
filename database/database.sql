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
        utilizationForm BOOLEAN DEFAULT FALSE,
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
    `campusId`,
    name as campusName
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
|   - getLabsByUserId
|   - getLabSchedule
|   - getLabUsers
|   - updateUserLabRole
|   - removeUserFromLab
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

-- Obter todos os laboratórios associados a um usuário:
DROP PROCEDURE IF EXISTS getLabsByUserId;

DELIMITER $$
CREATE PROCEDURE getLabsByUserId (IN user_id INT) BEGIN
SELECT
    l.labId AS labId,
    l.name AS labName,
    ul.accessLevel AS userLevel,
    -- Status: se existe sessão em andamento
    EXISTS (
        SELECT
            1
        FROM
            session s
        WHERE
            s.labId = l.labId
            AND s.statusOf = 'Andamento'
    ) AS status,
    -- Sessão em foco
    (
        SELECT
            s.hourStart
        FROM
            session s
        WHERE
            s.labId = l.labId
        ORDER BY
            CASE
                WHEN s.statusOf = 'Andamento' THEN 1
                WHEN s.statusOf = 'Finalizada' THEN 2
                WHEN s.statusOf = 'Agendada' THEN 3
                ELSE 4
            END,
            s.dateOf DESC,
            s.hourStart DESC
        LIMIT
            1
    ) AS startsAt,
    (
        SELECT
            s.hourEnd
        FROM
            session s
        WHERE
            s.labId = l.labId
        ORDER BY
            CASE
                WHEN s.statusOf = 'Andamento' THEN 1
                WHEN s.statusOf = 'Finalizada' THEN 2
                WHEN s.statusOf = 'Agendada' THEN 3
                ELSE 4
            END,
            s.dateOf DESC,
            s.hourStart DESC
        LIMIT
            1
    ) AS endsAt,
    (
        SELECT
            u.name
        FROM
            session s
            JOIN user u ON s.userId = u.userId
        WHERE
            s.labId = l.labId
        ORDER BY
            CASE
                WHEN s.statusOf = 'Andamento' THEN 1
                WHEN s.statusOf = 'Finalizada' THEN 2
                WHEN s.statusOf = 'Agendada' THEN 3
                ELSE 4
            END,
            s.dateOf DESC,
            s.hourStart DESC
        LIMIT
            1
    ) AS userName
FROM
    laboratory l
    JOIN userlab ul ON l.labId = ul.labId
WHERE
    ul.userId = user_id;

END $$ DELIMITER;

-- Obter o cronograma de um laboratório para uma data específica:
DROP PROCEDURE IF EXISTS getLabSchedule;

DELIMITER $$
CREATE PROCEDURE getLabSchedule (IN lab_id INT, IN schedule_date DATE) BEGIN
SELECT
    s.hourStart AS startsAt,
    s.hourEnd AS endsAt,
    s.dateOf AS date,
    u.name AS responsable,
    (
        SELECT
            IFNULL(SUM(quantity), 0)
        FROM
            chemicalreservation cr
        WHERE
            cr.sessionId = s.sessionId
    ) AS elementsQtd,
    (
        SELECT
            IFNULL(SUM(quantity), 0)
        FROM
            equipmentreservation er
        WHERE
            er.sessionId = s.sessionId
    ) AS equipmentsQtd
FROM
    session s
    JOIN user u ON s.userId = u.userId
WHERE
    s.labId = lab_id
    AND s.dateOf = schedule_date
ORDER BY
    s.hourStart;

END $$ DELIMITER;

-- Obter todos os usuários associados a um laboratório:
DROP PROCEDURE IF EXISTS getLabUsers;

DELIMITER $$
CREATE PROCEDURE getLabUsers (IN lab_id INT) BEGIN
SELECT
    u.name AS userName,
    u.type AS userType,
    u.image AS profilePic,
    ul.accessLevel AS adminLevel
FROM
    userlab ul
    JOIN user u ON ul.userId = u.userId
WHERE
    ul.labId = lab_id;

END $$ DELIMITER;

-- Atualizar o nível de acesso de um usuário em um laboratório:
DROP PROCEDURE IF EXISTS updateUserLabRole;

DELIMITER $$
CREATE PROCEDURE updateUserLabRole (
    IN lab_id INT,
    IN user_id INT,
    IN new_access_level ENUM('1', '2', '3')
) BEGIN
UPDATE userlab
SET
    accessLevel = new_access_level
WHERE
    labId = lab_id
    AND userId = user_id;

END $$ DELIMITER;

-- Remover um usuário de um laboratório:
DROP PROCEDURE IF EXISTS removeUserFromLab;

DELIMITER $$
CREATE PROCEDURE removeUserFromLab (IN lab_id INT, IN user_id INT) BEGIN
DELETE FROM userlab
WHERE
    labId = lab_id
    AND userId = user_id;

END $$ DELIMITER;

-- O===============================O --
/* 
#
|   O================O
|   |    Elementos   |
|   O================O
#
|   - registerElement
|   - getElementById
|   - deleteElement
|   - getElementsFromLab
|   - getElementsBySessionId
|   - editElementName
|   - editElementQuantity
|   - editElementCAS
|   - editElementEC
|   - editElementPhysicalState
|   - editElementValidity
|   - editElementAdmin
|   - editElementMolarMass
|   - editElementImage
#
 */
-- O===============================O --
-- Registrar elementos:
DROP PROCEDURE IF EXISTS registerElement;

DELIMITER $$
CREATE PROCEDURE registerElement (
    IN p_element_name VARCHAR(32),
    IN p_element_image LONGTEXT,
    IN p_element_molar_mas DECIMAL(10, 2),
    IN p_element_quantity DECIMAL(10, 2),
    IN p_element_cas_number VARCHAR(32),
    IN p_element_ec_number VARCHAR(32),
    IN p_element_admin_level ENUM('1', '2', '3'),
    IN p_element_validity DATE,
    IN p_element_physical_state ENUM('Sólido', 'Líquido', 'Gasoso'),
    IN p_lab_id INT
) BEGIN
INSERT INTO
    chemical (
        `name`,
        `image`,
        `molarMass`,
        `quantity`,
        `casNumber`,
        `ecNumber`,
        `accessLevel`,
        `expirationDate`,
        `physicalState`,
        `labId`
    )
VALUES
    (
        p_element_name,
        p_element_image,
        p_element_molar_mas,
        p_element_quantity,
        p_element_cas_number,
        p_element_ec_number,
        p_element_admin_level,
        p_element_validity,
        p_element_physical_state,
        p_lab_id
    );

END $$ DELIMITER;

-- Ler elemento pela Id:
DROP PROCEDURE IF EXISTS getElementById;

DELIMITER $$
CREATE PROCEDURE getElementById (IN element_id INT) BEGIN
SELECT
    chemicalId AS element_id,
    name AS element_name,
    image AS element_image,
    molarMass AS element_molar_mass,
    quantity AS element_quantity,
    casNumber AS element_cas_number,
    ecNumber AS element_ec_number,
    accessLevel AS element_admin_level,
    expirationDate AS element_validity,
    physicalState AS element_physical_state,
    labId AS lab_id
FROM
    chemical
WHERE
    chemicalId = element_id;

END $$ DELIMITER;

-- Deletar elemento:
DROP PROCEDURE IF EXISTS deleteElement;

DELIMITER $$
CREATE PROCEDURE deleteElement (IN element_id INT) BEGIN
DELETE FROM chemicalReservation
WHERE
    chemicalId = element_id;

DELETE FROM chemical
WHERE
    chemicalId = element_id;

END $$ DELIMITER;

-- Ler elementos de um laboratório:
DROP PROCEDURE IF EXISTS getElementsFromLab;

DELIMITER $$
CREATE PROCEDURE getElementsFromLab (IN p_labId INT) BEGIN
SELECT
    *
FROM
    chemical
WHERE
    p_labId = labId;

END $$ DELIMITER;

-- Ler elementos de uma sessão:
DROP PROCEDURE IF EXISTS getElementsBySessionId;

DELIMITER $$
CREATE PROCEDURE getElementsBySessionId (IN p_sessionId INT) BEGIN
SELECT
    c.chemicalId AS element_id,
    c.name AS element_name,
    c.image AS element_image,
    c.molarMass AS element_molar_mass,
    cr.quantity AS reserved_quantity,
    c.casNumber AS element_cas_number,
    c.ecNumber AS element_ec_number,
    c.accessLevel AS element_admin_level,
    c.expirationDate AS element_validity,
    c.physicalState AS element_physical_state,
    c.labId AS lab_id
FROM
    chemicalReservation cr
    JOIN chemical c ON cr.chemicalId = c.chemicalId
WHERE
    cr.sessionId = p_sessionId;

END $$ DELIMITER;

-- Editar nome do elemento:
DROP PROCEDURE IF EXISTS editElementName;

DELIMITER $$
CREATE PROCEDURE editElementName (
    IN p_element_id INT,
    IN p_element_name VARCHAR(32)
) BEGIN
UPDATE chemical
SET
    name = p_element_name
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar quantidade do elemento:
DROP PROCEDURE IF EXISTS editElementQuantity;

DELIMITER $$
CREATE PROCEDURE editElementQuantity (
    IN p_element_id INT,
    IN p_element_quantity DECIMAL(10, 2)
) BEGIN
UPDATE chemical
SET
    quantity = p_element_quantity
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar número CAS do elemento:
DROP PROCEDURE IF EXISTS editElementCAS;

DELIMITER $$
CREATE PROCEDURE editElementCAS (
    IN p_element_id INT,
    IN p_element_cas_number VARCHAR(32)
) BEGIN
UPDATE chemical
SET
    casNumber = p_element_cas_number
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar número EC do elemento:
DROP PROCEDURE IF EXISTS editElementEC;

DELIMITER $$
CREATE PROCEDURE editElementEC (
    IN p_element_id INT,
    IN p_element_ec_number VARCHAR(32)
) BEGIN
UPDATE chemical
SET
    ecNumber = p_element_ec_number
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar estado físico do elemento:
DROP PROCEDURE IF EXISTS editElementPhysicalState;

DELIMITER $$
CREATE PROCEDURE editElementPhysicalState (
    IN p_element_id INT,
    IN p_element_physical_state ENUM('Sólido', 'Líquido', 'Gasoso')
) BEGIN
UPDATE chemical
SET
    physicalState = p_element_physical_state
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar validade do elemento:
DROP PROCEDURE IF EXISTS editElementValidity;

DELIMITER $$
CREATE PROCEDURE editElementValidity (IN p_element_id INT, IN p_element_validity DATE) BEGIN
UPDATE chemical
SET
    expirationDate = p_element_validity
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar nível de acesso do elemento:
DROP PROCEDURE IF EXISTS editElementAdmin;

DELIMITER $$
CREATE PROCEDURE editElementAdmin (
    IN p_element_id INT,
    IN p_element_admin_level ENUM('1', '2', '3')
) BEGIN
UPDATE chemical
SET
    accessLevel = p_element_admin_level
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar massa molar do elemento:
DROP PROCEDURE IF EXISTS editElementMolarMass;

DELIMITER $$
CREATE PROCEDURE editElementMolarMass (
    IN p_element_id INT,
    IN p_element_molar_mass DECIMAL(10, 2)
) BEGIN
UPDATE chemical
SET
    molarMass = p_element_molar_mass
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- Editar imagem do elemento:
DROP PROCEDURE IF EXISTS editElementImage;

DELIMITER $$
CREATE PROCEDURE editElementImage (IN p_element_id INT, IN p_element_image LONGTEXT) BEGIN
UPDATE chemical
SET
    image = p_element_image
WHERE
    p_element_id = chemicalId;

END $$ DELIMITER;

-- O===============================O --
/* 
#
|   O===================O
|   |    Equipamentos   |
|   O===================O
#
|	- registerEquipments
|	- getEquipmentById
|	- deleteEquipment
|	- ListLabEquipments
|	- getEquipmentsBySession
|	- editEquipmentName
|	- editEquipmentQuantity
|	- editEquipmentQuality
|	- editEquipmentDescription
|	- editEquipmentAdmin
|	- editEquipmentImage
#
 */
-- O===============================O --
-- Registrar equipamentos:
DROP PROCEDURE IF EXISTS registerEquipments;

DELIMITER $$
CREATE PROCEDURE registerEquipments (
    IN p_equipment_name VARCHAR(128),
    IN p_equipment_description TEXT,
    IN p_equipment_quantity INT,
    IN p_equipment_quality ENUM('1', '2', '3', '4', '5'),
    IN p_equipment_admin_level ENUM('1', '2', '3'),
    IN p_equipment_image LONGTEXT,
    IN p_lab_id INT
) BEGIN
INSERT INTO
    equipment (
        `name`,
        `description`,
        `quantity`,
        `quality`,
        `accessLevel`,
        `image`,
        `labId`
    )
VALUES
    (
        p_equipment_name,
        p_equipment_description,
        p_equipment_quantity,
        p_equipment_quality,
        p_equipment_admin_level,
        p_equipment_image,
        p_lab_id
    );

END $$ DELIMITER;

-- Ler equipamento por Id:
DROP PROCEDURE IF EXISTS getEquipmentById;

DELIMITER $$
CREATE PROCEDURE getEquipmentById (IN p_equipment_id INT) BEGIN
SELECT
    equipmentId AS equipment_id,
    name AS equipment_name,
    description AS equipment_description,
    quantity AS equipment_quantity,
    quality AS equipment_quality,
    accessLevel AS equipment_admin_level,
    image AS equipment_image,
    labId AS lab_id
FROM
    equipment
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Deletar equipamento:
DROP PROCEDURE IF EXISTS deleteEquipment;

DELIMITER $$
CREATE PROCEDURE deleteEquipment (IN p_equipment_id INT) BEGIN
DELETE FROM equipmentReservation
WHERE
    equipmentId = p_equipment_id;

DELETE FROM equipment
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Listar equipamentos de um laboratório:
DROP PROCEDURE IF EXISTS ListLabEquipments;

DELIMITER $$
CREATE PROCEDURE ListLabEquipments (IN p_labId INT) BEGIN
SELECT
    *
FROM
    equipment
WHERE
    labId = p_labId;

END $$ DELIMITER;

-- Ler equipamentos de uma sessão:
DROP PROCEDURE IF EXISTS getEquipmentsBySession;

DELIMITER $$
CREATE PROCEDURE getEquipmentsBySession (IN p_sessionId INT) BEGIN
SELECT
    e.equipmentId AS equipment_id,
    e.name AS equipment_name,
    e.description AS equipment_description,
    e.image AS equipment_image,
    e.quantity AS total_quantity,
    er.quantity AS reserved_quantity,
    e.quality AS equipment_quality,
    e.accessLevel AS equipment_admin_level,
    e.labId AS lab_id
FROM
    equipmentReservation er
    JOIN equipment e ON er.equipmentId = e.equipmentId
WHERE
    er.sessionId = p_sessionId;

END $$ DELIMITER;

-- Editar nome do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentName;

DELIMITER $$
CREATE PROCEDURE editEquipmentName (
    IN p_equipment_id INT,
    IN p_equipment_name VARCHAR(128)
) BEGIN
UPDATE equipment
SET
    name = p_equipment_name
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Editar quantidade do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentQuantity;

DELIMITER $$
CREATE PROCEDURE editEquipmentQuantity (
    IN p_equipment_id INT,
    IN p_equipment_quantity INT
) BEGIN
UPDATE equipment
SET
    quantity = p_equipment_quantity
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Editar qualidade do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentQuality;

DELIMITER $$
CREATE PROCEDURE editEquipmentQuality (
    IN p_equipment_id INT,
    IN p_equipment_quality ENUM('1', '2', '3', '4', '5')
) BEGIN
UPDATE equipment
SET
    quality = p_equipment_quality
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Editar descrição do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentDescription;

DELIMITER $$
CREATE PROCEDURE editEquipmentDescription (
    IN p_equipment_id INT,
    IN p_equipment_description TEXT
) BEGIN
UPDATE equipment
SET
    description = p_equipment_description
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Editar nível de administração do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentAdmin;

DELIMITER $$
CREATE PROCEDURE editEquipmentAdmin (
    IN p_equipment_id INT,
    IN p_equipment_admin_level ENUM('1', '2', '3')
) BEGIN
UPDATE equipment
SET
    accessLevel = p_equipment_admin_level
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- Editar imagem do equipamento:
DROP PROCEDURE IF EXISTS editEquipmentImage;

DELIMITER $$
CREATE PROCEDURE editEquipmentImage (
    IN p_equipment_id INT,
    IN p_equipment_image LONGTEXT
) BEGIN
UPDATE equipment
SET
    image = p_equipment_image
WHERE
    equipmentId = p_equipment_id;

END $$ DELIMITER;

-- O===============================O --
/* 
#
|   O==============O
|   |    Sessões   |
|   O==============O
#
|   - getSessionById
|   - checkDate
|   - createSession
|   - relateElementInSession
|   - relateEquipmentInSession
|   - deleteSession
|   - startSession
|   - finishSession
|   - listUserSessions
#
 */
-- O===============================O --
-- Ler sessões pela Id:
DROP PROCEDURE IF EXISTS getSessionById;

DELIMITER $$
CREATE PROCEDURE getSessionById (IN p_session_id INT) BEGIN
SELECT
    sessionId AS session_id,
    dateOf AS date,
    hourStart AS starts_at,
    hourEnd AS ends_at,
    statusOf AS status,
    userId AS user_id,
    labId AS lab_id
FROM
    session
WHERE
    p_session_id = sessionId;

END $$ DELIMITER;

-- Verificar disponibilidade de data/hora no laboratório:
DROP PROCEDURE IF EXISTS checkDate;

DELIMITER $$
CREATE PROCEDURE checkDate (
    IN p_lab_id INT,
    IN p_date DATE,
    IN p_starts_at TIME,
    IN p_ends_at TIME
) BEGIN
SELECT
    sessionId
FROM
    session
WHERE
    labId = p_lab_id
    AND dateOf = p_date
    AND (
        (
            hourStart <= p_starts_at
            AND hourEnd > p_starts_at
        )
        OR (
            hourStart < p_ends_at
            AND hourEnd >= p_ends_at
        )
        OR (
            hourStart >= p_starts_at
            AND hourEnd <= p_ends_at
        )
    );

END $$ DELIMITER;

-- Criar sessão (retorna insertId via affected/insertId no client):
DROP PROCEDURE IF EXISTS createSession;

DELIMITER $$
CREATE PROCEDURE createSession (
    IN p_user_id INT,
    IN p_lab_id INT,
    IN p_date DATE,
    IN p_hour_start TIME,
    IN p_hour_end TIME
) BEGIN
INSERT INTO
    session (
        dateOf,
        hourStart,
        hourEnd,
        statusOf,
        userId,
        labId,
        utilizationForm
    )
VALUES
    (
        p_date,
        p_hour_start,
        p_hour_end,
        'Agendada',
        p_user_id,
        p_lab_id,
        FALSE
    );

SELECT
    LAST_INSERT_ID() AS session_id;

END $$ DELIMITER;

-- Relacionar elemento a uma sessão (inserir reservation):
DROP PROCEDURE IF EXISTS relateElementInSession;

DELIMITER $$
CREATE PROCEDURE relateElementInSession (IN p_session_id INT, IN p_element_id INT) BEGIN
INSERT INTO
    chemicalReservation (chemicalId, sessionId, quantity)
VALUES
    (p_element_id, p_session_id, 0);

END $$ DELIMITER;

-- Relacionar equipamento a uma sessão (inserir reservation):
DROP PROCEDURE IF EXISTS relateEquipmentInSession;

DELIMITER $$
CREATE PROCEDURE relateEquipmentInSession (IN p_session_id INT, IN p_equipment_id INT) BEGIN
INSERT INTO
    equipmentReservation (equipmentId, sessionId, quantity)
VALUES
    (p_equipment_id, p_session_id, 0);

END $$ DELIMITER;

-- Deletar sessão (remove sessão; FK CASCADE limpa reservas):
DROP PROCEDURE IF EXISTS deleteSession;

DELIMITER $$
CREATE PROCEDURE deleteSession (IN p_session_id INT) BEGIN
DELETE FROM session
WHERE
    sessionId = p_session_id;

END $$ DELIMITER;

-- Iniciar sessão (muda status para 'Andamento'):
DROP PROCEDURE IF EXISTS startSession;

DELIMITER $$
CREATE PROCEDURE startSession (IN p_session_id INT) BEGIN
UPDATE session
SET
    statusOf = 'Andamento'
WHERE
    sessionId = p_session_id;

END $$ DELIMITER;

-- Finalizar sessão (muda status para 'Finalizada'):
DROP PROCEDURE IF EXISTS finishSession;

DELIMITER $$
CREATE PROCEDURE finishSession (IN p_session_id INT) BEGIN
UPDATE session
SET
    statusOf = 'Finalizada'
WHERE
    sessionId = p_session_id;

END $$ DELIMITER;

-- Listar todas as sessões de um usuário:
DROP PROCEDURE IF EXISTS listUserSessions;

DELIMITER $$
CREATE PROCEDURE listUserSessions (IN p_user_id INT) BEGIN
SELECT
    s.sessionId AS sessionId,
    l.name AS labName,
    s.dateOf AS date,
    s.hourStart AS startsAt,
    s.hourEnd AS endsAt,
    (
        SELECT
            IFNULL(SUM(quantity), 0)
        FROM
            chemicalreservation cr
        WHERE
            cr.sessionId = s.sessionId
    ) AS elementsQtd,
    (
        SELECT
            IFNULL(SUM(quantity), 0)
        FROM
            equipmentreservation er
        WHERE
            er.sessionId = s.sessionId
    ) AS equipmentsQtd,
    EXISTS (
        SELECT
            1
        FROM
            utilizationform uf
        WHERE
            uf.sessionId = s.sessionId
    ) AS formDone
FROM
    session s
    JOIN laboratory l ON s.labId = l.labId
WHERE
    s.userId = p_user_id
ORDER BY
    s.dateOf DESC,
    s.hourStart DESC;

END $$ DELIMITER;