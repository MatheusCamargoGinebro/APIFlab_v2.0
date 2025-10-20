-- IFLab - Database audit/log system
-- log.sql
-- INSTRUÇÕES DE USO (importante):
-- Antes de executar qualquer ação via API (INSERT/UPDATE/DELETE) a API deve definir a variável de sessão:
--   SET @actor_user_id = <id_do_usuario>;
--   SET @actor_meta = JSON_OBJECT('ip', '1.2.3.4', 'endpoint', '/sessions/create', 'token', '...'); -- opcional
-- Se @actor_user_id não for setada, os triggers irão gravar NULL no campo actor_user_id.
-- Rode este arquivo no mesmo schema 'iflab' onde o database.sql foi importado.
USE iflab;

DROP TABLE IF EXISTS audit_log;

CREATE TABLE IF NOT EXISTS
    audit_log (
        audit_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        table_name VARCHAR(128) NOT NULL,
        operation ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
        changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        actor_user_id INT NULL,
        actor_name VARCHAR(128) NULL,
        actor_email VARCHAR(256) NULL,
        pk_value JSON NULL, -- chave primária (pode ser JSON para multi-col PKs)
        old_data JSON NULL, -- dados antes (NULL para INSERT)
        new_data JSON NULL, -- dados depois (NULL para DELETE)
        meta JSON NULL, -- campo livre para a API inserir (token, IP, endpoint etc.)
        INDEX idx_table_op (table_name, operation),
        INDEX idx_actor (actor_user_id),
        CONSTRAINT fk_audit_actor_user FOREIGN KEY (actor_user_id) REFERENCES `user` (userId) ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- helper: mask password value before logging
-- Note: We'll mask any password fields when building JSON in triggers.
DELIMITER $$
/* ========================= TRIGGER GENERATOR SECTION =========================
For each table we create 3 triggers: AFTER INSERT, AFTER UPDATE, AFTER DELETE.
Triggers will try to resolve @actor_user_id into actor_name and actor_email.
The triggers explicitly construct JSON objects containing column values.
If you add new tables/columns later, add corresponding triggers here following the same pattern.
============================================================================*/
/* ------------------ campus ------------------ */
DROP TRIGGER IF EXISTS trg_campus_ai_insert$$
CREATE TRIGGER trg_campus_ai_insert AFTER
INSERT
    ON campus FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'campus', 'INSERT', @actor_user_id, a_name, a_email,
    JSON_OBJECT('campusId', NEW.campusId),
    NULL,
    JSON_OBJECT(
        'campusId', NEW.campusId,
        'name', NEW.name,
        'uf', NEW.uf
    ),
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
DROP TRIGGER IF EXISTS trg_campus_au_update$$
CREATE TRIGGER trg_campus_au_update AFTER
UPDATE ON campus FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'campus', 'UPDATE', @actor_user_id, a_name, a_email,
    JSON_OBJECT('campusId', OLD.campusId),
    JSON_OBJECT('campusId', OLD.campusId, 'name', OLD.name, 'uf', OLD.uf),
    JSON_OBJECT('campusId', NEW.campusId, 'name', NEW.name, 'uf', NEW.uf),
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
DROP TRIGGER IF EXISTS trg_campus_ad_delete$$
CREATE TRIGGER trg_campus_ad_delete AFTER DELETE ON campus FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'campus', 'DELETE', @actor_user_id, a_name, a_email,
    JSON_OBJECT('campusId', OLD.campusId),
    JSON_OBJECT('campusId', OLD.campusId, 'name', OLD.name, 'uf', OLD.uf),
    NULL,
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
/* ------------------ user ------------------ */
DROP TRIGGER IF EXISTS trg_user_ai_insert$$
CREATE TRIGGER trg_user_ai_insert AFTER
INSERT
    ON `user` FOR EACH ROW BEGIN
    -- resolve actor
    DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
-- mask password in logs
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'user', 'INSERT', @actor_user_id, a_name, a_email,
    JSON_OBJECT('userId', NEW.userId),
    NULL,
    JSON_OBJECT(
        'userId', NEW.userId,
        'name', NEW.name,
        'email', NEW.email,
        'password', '***',           -- masked
        'image', NEW.image,
        'type', NEW.type,
        'accessLevel', NEW.accessLevel,
        'campusId', NEW.campusId
    ),
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
DROP TRIGGER IF EXISTS trg_user_au_update$$
CREATE TRIGGER trg_user_au_update AFTER
UPDATE ON `user` FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'user', 'UPDATE', @actor_user_id, a_name, a_email,
    JSON_OBJECT('userId', OLD.userId),
    JSON_OBJECT(
        'userId', OLD.userId,
        'name', OLD.name,
        'email', OLD.email,
        'password', '***',
        'image', OLD.image,
        'type', OLD.type,
        'accessLevel', OLD.accessLevel,
        'campusId', OLD.campusId
    ),
    JSON_OBJECT(
        'userId', NEW.userId,
        'name', NEW.name,
        'email', NEW.email,
        'password', '***',
        'image', NEW.image,
        'type', NEW.type,
        'accessLevel', NEW.accessLevel,
        'campusId', NEW.campusId
    ),
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
DROP TRIGGER IF EXISTS trg_user_ad_delete$$
CREATE TRIGGER trg_user_ad_delete AFTER DELETE ON `user` FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

```
INSERT INTO audit_log (
    table_name, operation, actor_user_id, actor_name, actor_email,
    pk_value, old_data, new_data, meta
) VALUES (
    'user', 'DELETE', @actor_user_id, a_name, a_email,
    JSON_OBJECT('userId', OLD.userId),
    JSON_OBJECT(
        'userId', OLD.userId,
        'name', OLD.name,
        'email', OLD.email,
        'password', '***',
        'image', OLD.image,
        'type', OLD.type,
        'accessLevel', OLD.accessLevel,
        'campusId', OLD.campusId
    ),
    NULL,
    IF(@actor_meta IS NULL, NULL, @actor_meta)
);
``` END $$
/* ------------------ laboratory ------------------ */
DROP TRIGGER IF EXISTS trg_laboratory_ai_insert$$
CREATE TRIGGER trg_laboratory_ai_insert AFTER
INSERT
    ON laboratory FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'laboratory',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('labId', NEW.labId),
        NULL,
        JSON_OBJECT(
            'labId',
            NEW.labId,
            'name',
            NEW.name,
            'campusId',
            NEW.campusId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_laboratory_au_update$$
CREATE TRIGGER trg_laboratory_au_update AFTER
UPDATE ON laboratory FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'laboratory',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('labId', OLD.labId),
        JSON_OBJECT(
            'labId',
            OLD.labId,
            'name',
            OLD.name,
            'campusId',
            OLD.campusId
        ),
        JSON_OBJECT(
            'labId',
            NEW.labId,
            'name',
            NEW.name,
            'campusId',
            NEW.campusId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_laboratory_ad_delete$$
CREATE TRIGGER trg_laboratory_ad_delete AFTER DELETE ON laboratory FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'laboratory',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('labId', OLD.labId),
        JSON_OBJECT(
            'labId',
            OLD.labId,
            'name',
            OLD.name,
            'campusId',
            OLD.campusId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ userlab ------------------ */
DROP TRIGGER IF EXISTS trg_userlab_ai_insert$$
CREATE TRIGGER trg_userlab_ai_insert AFTER
INSERT
    ON userlab FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'userlab',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('userLabId', NEW.userLabId),
        NULL,
        JSON_OBJECT(
            'userLabId',
            NEW.userLabId,
            'accessLevel',
            NEW.accessLevel,
            'userId',
            NEW.userId,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_userlab_au_update$$
CREATE TRIGGER trg_userlab_au_update AFTER
UPDATE ON userlab FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'userlab',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('userLabId', OLD.userLabId),
        JSON_OBJECT(
            'userLabId',
            OLD.userLabId,
            'accessLevel',
            OLD.accessLevel,
            'userId',
            OLD.userId,
            'labId',
            OLD.labId
        ),
        JSON_OBJECT(
            'userLabId',
            NEW.userLabId,
            'accessLevel',
            NEW.accessLevel,
            'userId',
            NEW.userId,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_userlab_ad_delete$$
CREATE TRIGGER trg_userlab_ad_delete AFTER DELETE ON userlab FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'userlab',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('userLabId', OLD.userLabId),
        JSON_OBJECT(
            'userLabId',
            OLD.userLabId,
            'accessLevel',
            OLD.accessLevel,
            'userId',
            OLD.userId,
            'labId',
            OLD.labId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ session ------------------ */
DROP TRIGGER IF EXISTS trg_session_ai_insert$$
CREATE TRIGGER trg_session_ai_insert AFTER
INSERT
    ON session FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'session',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('sessionId', NEW.sessionId),
        NULL,
        JSON_OBJECT(
            'sessionId',
            NEW.sessionId,
            'dateOf',
            CAST(NEW.dateOf AS CHAR),
            'hourStart',
            CAST(NEW.hourStart AS CHAR),
            'hourEnd',
            CAST(NEW.hourEnd AS CHAR),
            'statusOf',
            NEW.statusOf,
            'utilizationForm',
            NEW.utilizationForm,
            'userId',
            NEW.userId,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_session_au_update$$
CREATE TRIGGER trg_session_au_update AFTER
UPDATE ON session FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'session',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('sessionId', OLD.sessionId),
        JSON_OBJECT(
            'sessionId',
            OLD.sessionId,
            'dateOf',
            CAST(OLD.dateOf AS CHAR),
            'hourStart',
            CAST(OLD.hourStart AS CHAR),
            'hourEnd',
            CAST(OLD.hourEnd AS CHAR),
            'statusOf',
            OLD.statusOf,
            'utilizationForm',
            OLD.utilizationForm,
            'userId',
            OLD.userId,
            'labId',
            OLD.labId
        ),
        JSON_OBJECT(
            'sessionId',
            NEW.sessionId,
            'dateOf',
            CAST(NEW.dateOf AS CHAR),
            'hourStart',
            CAST(NEW.hourStart AS CHAR),
            'hourEnd',
            CAST(NEW.hourEnd AS CHAR),
            'statusOf',
            NEW.statusOf,
            'utilizationForm',
            NEW.utilizationForm,
            'userId',
            NEW.userId,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_session_ad_delete$$
CREATE TRIGGER trg_session_ad_delete AFTER DELETE ON session FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'session',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('sessionId', OLD.sessionId),
        JSON_OBJECT(
            'sessionId',
            OLD.sessionId,
            'dateOf',
            CAST(OLD.dateOf AS CHAR),
            'hourStart',
            CAST(OLD.hourStart AS CHAR),
            'hourEnd',
            CAST(OLD.hourEnd AS CHAR),
            'statusOf',
            OLD.statusOf,
            'utilizationForm',
            OLD.utilizationForm,
            'userId',
            OLD.userId,
            'labId',
            OLD.labId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ chemical ------------------ */
DROP TRIGGER IF EXISTS trg_chemical_ai_insert$$
CREATE TRIGGER trg_chemical_ai_insert AFTER
INSERT
    ON chemical FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemical',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('chemicalId', NEW.chemicalId),
        NULL,
        JSON_OBJECT(
            'chemicalId',
            NEW.chemicalId,
            'name',
            NEW.name,
            'quantity',
            NEW.quantity,
            'molarMass',
            NEW.molarMass,
            'casNumber',
            NEW.casNumber,
            'ecNumber',
            NEW.ecNumber,
            'physicalState',
            NEW.physicalState,
            'accessLevel',
            NEW.accessLevel,
            'expirationDate',
            CAST(NEW.expirationDate AS CHAR),
            'image',
            NEW.image,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_chemical_au_update$$
CREATE TRIGGER trg_chemical_au_update AFTER
UPDATE ON chemical FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemical',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('chemicalId', OLD.chemicalId),
        JSON_OBJECT(
            'chemicalId',
            OLD.chemicalId,
            'name',
            OLD.name,
            'quantity',
            OLD.quantity,
            'molarMass',
            OLD.molarMass,
            'casNumber',
            OLD.casNumber,
            'ecNumber',
            OLD.ecNumber,
            'physicalState',
            OLD.physicalState,
            'accessLevel',
            OLD.accessLevel,
            'expirationDate',
            CAST(OLD.expirationDate AS CHAR),
            'image',
            OLD.image,
            'labId',
            OLD.labId
        ),
        JSON_OBJECT(
            'chemicalId',
            NEW.chemicalId,
            'name',
            NEW.name,
            'quantity',
            NEW.quantity,
            'molarMass',
            NEW.molarMass,
            'casNumber',
            NEW.casNumber,
            'ecNumber',
            NEW.ecNumber,
            'physicalState',
            NEW.physicalState,
            'accessLevel',
            NEW.accessLevel,
            'expirationDate',
            CAST(NEW.expirationDate AS CHAR),
            'image',
            NEW.image,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_chemical_ad_delete$$
CREATE TRIGGER trg_chemical_ad_delete AFTER DELETE ON chemical FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemical',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('chemicalId', OLD.chemicalId),
        JSON_OBJECT(
            'chemicalId',
            OLD.chemicalId,
            'name',
            OLD.name,
            'quantity',
            OLD.quantity,
            'molarMass',
            OLD.molarMass,
            'casNumber',
            OLD.casNumber,
            'ecNumber',
            OLD.ecNumber,
            'physicalState',
            OLD.physicalState,
            'accessLevel',
            OLD.accessLevel,
            'expirationDate',
            CAST(OLD.expirationDate AS CHAR),
            'image',
            OLD.image,
            'labId',
            OLD.labId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ equipment ------------------ */
DROP TRIGGER IF EXISTS trg_equipment_ai_insert$$
CREATE TRIGGER trg_equipment_ai_insert AFTER
INSERT
    ON equipment FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipment',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('equipmentId', NEW.equipmentId),
        NULL,
        JSON_OBJECT(
            'equipmentId',
            NEW.equipmentId,
            'name',
            NEW.name,
            'description',
            NEW.description,
            'quantity',
            NEW.quantity,
            'quality',
            NEW.quality,
            'accessLevel',
            NEW.accessLevel,
            'image',
            NEW.image,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_equipment_au_update$$
CREATE TRIGGER trg_equipment_au_update AFTER
UPDATE ON equipment FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipment',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('equipmentId', OLD.equipmentId),
        JSON_OBJECT(
            'equipmentId',
            OLD.equipmentId,
            'name',
            OLD.name,
            'description',
            OLD.description,
            'quantity',
            OLD.quantity,
            'quality',
            OLD.quality,
            'accessLevel',
            OLD.accessLevel,
            'image',
            OLD.image,
            'labId',
            OLD.labId
        ),
        JSON_OBJECT(
            'equipmentId',
            NEW.equipmentId,
            'name',
            NEW.name,
            'description',
            NEW.description,
            'quantity',
            NEW.quantity,
            'quality',
            NEW.quality,
            'accessLevel',
            NEW.accessLevel,
            'image',
            NEW.image,
            'labId',
            NEW.labId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_equipment_ad_delete$$
CREATE TRIGGER trg_equipment_ad_delete AFTER DELETE ON equipment FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipment',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('equipmentId', OLD.equipmentId),
        JSON_OBJECT(
            'equipmentId',
            OLD.equipmentId,
            'name',
            OLD.name,
            'description',
            OLD.description,
            'quantity',
            OLD.quantity,
            'quality',
            OLD.quality,
            'accessLevel',
            OLD.accessLevel,
            'image',
            OLD.image,
            'labId',
            OLD.labId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ equipmentReservation ------------------ */
DROP TRIGGER IF EXISTS trg_equipmentReservation_ai_insert$$
CREATE TRIGGER trg_equipmentReservation_ai_insert AFTER
INSERT
    ON equipmentReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipmentReservation',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', NEW.reservationId),
        NULL,
        JSON_OBJECT(
            'reservationId',
            NEW.reservationId,
            'quantity',
            NEW.quantity,
            'equipmentId',
            NEW.equipmentId,
            'sessionId',
            NEW.sessionId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_equipmentReservation_au_update$$
CREATE TRIGGER trg_equipmentReservation_au_update AFTER
UPDATE ON equipmentReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipmentReservation',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', OLD.reservationId),
        JSON_OBJECT(
            'reservationId',
            OLD.reservationId,
            'quantity',
            OLD.quantity,
            'equipmentId',
            OLD.equipmentId,
            'sessionId',
            OLD.sessionId
        ),
        JSON_OBJECT(
            'reservationId',
            NEW.reservationId,
            'quantity',
            NEW.quantity,
            'equipmentId',
            NEW.equipmentId,
            'sessionId',
            NEW.sessionId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_equipmentReservation_ad_delete$$
CREATE TRIGGER trg_equipmentReservation_ad_delete AFTER DELETE ON equipmentReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'equipmentReservation',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', OLD.reservationId),
        JSON_OBJECT(
            'reservationId',
            OLD.reservationId,
            'quantity',
            OLD.quantity,
            'equipmentId',
            OLD.equipmentId,
            'sessionId',
            OLD.sessionId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ chemicalReservation ------------------ */
DROP TRIGGER IF EXISTS trg_chemicalReservation_ai_insert$$
CREATE TRIGGER trg_chemicalReservation_ai_insert AFTER
INSERT
    ON chemicalReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemicalReservation',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', NEW.reservationId),
        NULL,
        JSON_OBJECT(
            'reservationId',
            NEW.reservationId,
            'quantity',
            NEW.quantity,
            'chemicalId',
            NEW.chemicalId,
            'sessionId',
            NEW.sessionId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_chemicalReservation_au_update$$
CREATE TRIGGER trg_chemicalReservation_au_update AFTER
UPDATE ON chemicalReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemicalReservation',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', OLD.reservationId),
        JSON_OBJECT(
            'reservationId',
            OLD.reservationId,
            'quantity',
            OLD.quantity,
            'chemicalId',
            OLD.chemicalId,
            'sessionId',
            OLD.sessionId
        ),
        JSON_OBJECT(
            'reservationId',
            NEW.reservationId,
            'quantity',
            NEW.quantity,
            'chemicalId',
            NEW.chemicalId,
            'sessionId',
            NEW.sessionId
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_chemicalReservation_ad_delete$$
CREATE TRIGGER trg_chemicalReservation_ad_delete AFTER DELETE ON chemicalReservation FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'chemicalReservation',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('reservationId', OLD.reservationId),
        JSON_OBJECT(
            'reservationId',
            OLD.reservationId,
            'quantity',
            OLD.quantity,
            'chemicalId',
            OLD.chemicalId,
            'sessionId',
            OLD.sessionId
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ logoutList ------------------ */
DROP TRIGGER IF EXISTS trg_logoutList_ai_insert$$
CREATE TRIGGER trg_logoutList_ai_insert AFTER
INSERT
    ON logoutList FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'logoutList',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('logoutId', NEW.logoutId),
        NULL,
        JSON_OBJECT('logoutId', NEW.logoutId, 'token', NEW.token),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_logoutList_ad_delete$$
CREATE TRIGGER trg_logoutList_ad_delete AFTER DELETE ON logoutList FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'logoutList',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('logoutId', OLD.logoutId),
        JSON_OBJECT('logoutId', OLD.logoutId, 'token', OLD.token),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
/* ------------------ mailCode ------------------ */
DROP TRIGGER IF EXISTS trg_mailCode_ai_insert$$
CREATE TRIGGER trg_mailCode_ai_insert AFTER
INSERT
    ON mailCode FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'mailCode',
        'INSERT',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('emailCodeId', NEW.emailCodeId),
        NULL,
        JSON_OBJECT(
            'emailCodeId',
            NEW.emailCodeId,
            'email',
            NEW.email,
            'code',
            NEW.code,
            'status',
            NEW.status,
            'token',
            NEW.token,
            'expiresAt',
            CAST(NEW.expiresAt AS CHAR),
            'motive',
            NEW.motive
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_mailCode_au_update$$
CREATE TRIGGER trg_mailCode_au_update AFTER
UPDATE ON mailCode FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'mailCode',
        'UPDATE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('emailCodeId', OLD.emailCodeId),
        JSON_OBJECT(
            'emailCodeId',
            OLD.emailCodeId,
            'email',
            OLD.email,
            'code',
            OLD.code,
            'status',
            OLD.status,
            'token',
            OLD.token,
            'expiresAt',
            CAST(OLD.expiresAt AS CHAR),
            'motive',
            OLD.motive
        ),
        JSON_OBJECT(
            'emailCodeId',
            NEW.emailCodeId,
            'email',
            NEW.email,
            'code',
            NEW.code,
            'status',
            NEW.status,
            'token',
            NEW.token,
            'expiresAt',
            CAST(NEW.expiresAt AS CHAR),
            'motive',
            NEW.motive
        ),
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$
DROP TRIGGER IF EXISTS trg_mailCode_ad_delete$$
CREATE TRIGGER trg_mailCode_ad_delete AFTER DELETE ON mailCode FOR EACH ROW BEGIN DECLARE a_name VARCHAR(128);

DECLARE a_email VARCHAR(256);

SET
    a_name = NULL;

SET
    a_email = NULL;

IF @actor_user_id IS NOT NULL THEN
SELECT
    name,
    email INTO a_name,
    a_email
FROM
    `user`
WHERE
    userId = @actor_user_id
LIMIT
    1;

END IF;

INSERT INTO
    audit_log (
        table_name,
        operation,
        actor_user_id,
        actor_name,
        actor_email,
        pk_value,
        old_data,
        new_data,
        meta
    )
VALUES
    (
        'mailCode',
        'DELETE',
        @actor_user_id,
        a_name,
        a_email,
        JSON_OBJECT('emailCodeId', OLD.emailCodeId),
        JSON_OBJECT(
            'emailCodeId',
            OLD.emailCodeId,
            'email',
            OLD.email,
            'code',
            OLD.code,
            'status',
            OLD.status,
            'token',
            OLD.token,
            'expiresAt',
            CAST(OLD.expiresAt AS CHAR),
            'motive',
            OLD.motive
        ),
        NULL,
        IF(@actor_meta IS NULL, NULL, @actor_meta)
    );

END $$ DELIMITER;

-- FIM do arquivo de logs
-- Observações / boas práticas:
-- 1) A API deve setar @actor_user_id e opcionalmente @actor_meta (JSON) por conexão/session antes de executar as queries.
--    Exemplo em Node/Express (mysql2 / mysql):
--      await conn.query("SET @actor_user_id = ?", [userId]);
--      await conn.query("SET @actor_meta = ?", [JSON.stringify({ip, endpoint})]);
-- 2) Se sua API faz múltiplas operações em uma única transação, o mesmo @actor_user_id será usado para todas as triggers na sessão.
-- 3) Se quiser logs separados por tabela (em vez de uma única audit_log), podemos gerar tabelas de log específicas seguindo o mesmo padrão.
-- 4) Se precisar que logs sejam imutáveis mesmo após remoção do usuário que fez a ação, altere a FK fk_audit_actor_user para NÃO ter ON DELETE SET NULL (ou remova a FK).
-- 5) Se precisar de mais campos (por exemplo: transaction_id, request_id), adicione ao campo meta (JSON).