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
        name VARCHAR(50) NOT NULL,
        uf VARCHAR(2) NOT NULL
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
        password VARCHAR(60) NOT NULL,
        salt VARCHAR(60) NOT NULL,
        image LONGTEXT,
        type ENUM('Professor', 'Aluno', 'Funcionário') NOT NULL,
        accessLevel ENUM('1', '2', '3') NOT NULL,
        -- FK
        campusId INT NOT NULL,
        FOREIGN KEY (campusId) REFERENCES campus (campusId) ON DELETE CASCADE ON UPDATE CASCADE
    );

--Laboratório:
CREATE TABLE IF NOT EXISTS
    lab (
        -- PK
        labId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (labId),
        -- Attributes
        name VARCHAR(64) NOT NULL,
        image LONGTEXT,
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
        -- FK
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES lab (labId) ON DELETE CASCADE ON UPDATE CASCADE
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
        -- FK
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES lab (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Produtos químicos:
CREATE TABLE IF NOT EXISTS
    chemical (
        -- PK
        chemicalId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (chemicalId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        molarMass DECIMAL(10, 2) NOT NULL,
        casNumber VARCHAR(32) NOT NULL,
        ecNumber VARCHAR(32) NOT NULL,
        physicalState ENUM('Sólido', 'Líquido', 'Gasoso') NOT NULL,
        expirationDate DATE NOT NULL,
        image LONGTEXT,
        -- FK
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES lab (labId) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Equipamentos:
CREATE TABLE IF NOT EXISTS
    equipment (
        -- PK
        equipmentId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (equipmentId),
        -- Attributes
        name VARCHAR(128) NOT NULL,
        description VARCHAR(256) NOT NULL,
        quantity INT NOT NULL,
        quality ENUM('1', '2', '3', '4', '5') NOT NULL,
        accessLevel ENUM('1', '2', '3') NOT NULL,
        image LONGTEXT,
        -- FK
        labId INT NOT NULL,
        FOREIGN KEY (labId) REFERENCES lab (labId) ON DELETE CASCADE ON UPDATE CASCADE
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