-- ========================= CAMPUS =========================
INSERT INTO
    campus (name, uf)
VALUES
    ('IFSP - Campus Campinas', 'SP'),
    ('Campus São Paulo', 'SP'),
    ('Campus Rio de Janeiro', 'RJ'),
    ('Campus Belo Horizonte', 'MG'),
    ('Campus Salvador', 'BA'),
    ('Campus Curitiba', 'PR'),
    ('Campus Porto Alegre', 'RS'),
    ('Campus Florianópolis', 'SC'),
    ('Campus Fortaleza', 'CE'),
    ('Campus Manaus', 'AM'),
    ('Campus Goiânia', 'GO'),
    ('Campus Recife', 'PE');

-- ========================= USUÁRIOS =========================
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
        'Ana Silva',
        'ana.silva@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    ),
    (
        'Bruno Costa',
        'bruno.costa@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    ),
    (
        'Carla Souza',
        'carla.souza@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '2',
        1
    ),
    (
        'Daniel Rocha',
        'daniel.rocha@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '3',
        1
    ),
    (
        'Eduardo Lima',
        'eduardo.lima@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    ),
    (
        'Fernanda Alves',
        'fernanda.alves@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '2',
        1
    ),
    (
        'Gabriel Martins',
        'gabriel.martins@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '3',
        1
    ),
    (
        'Helena Torres',
        'helena.torres@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    ),
    (
        'Igor Ferreira',
        'igor.ferreira@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    ),
    (
        'Juliana Mendes',
        'juliana.mendes@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '2',
        1
    ),
    (
        'Lucas Barros',
        'lucas.barros@ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Funcionário',
        '3',
        1
    ),
    (
        'Mariana Pinto',
        'mariana.pinto@aluno.ifsp.edu.br',
        '$2b$12$kTPSF59InApikJOAdmRDx.zamEaCDju1cqYwuLuaBJcmALWGurWLm',
        'Aluno',
        '1',
        1
    );

-- ========================= LABORATÓRIOS =========================
INSERT INTO
    laboratory (name, campusId)
VALUES
    ('Lab Química A101', 1),
    ('Lab Física A102', 1),
    ('Lab Biologia A103', 1),
    ('Lab Computação A104', 1),
    ('Lab Engenharia A105', 1),
    ('Lab Eletrônica A106', 1),
    ('Lab Mecânica A107', 1),
    ('Lab Robótica A108', 1),
    ('Lab Materiais A109', 1),
    ('Lab Energias Renováveis A110', 1),
    ('Lab Farmacologia A111', 1),
    ('Lab Microbiologia A112', 1);

-- ========================= USERLAB =========================
INSERT INTO
    userlab (userId, labId, accessLevel)
VALUES
    (1, 1, '1'),
    (3, 1, '2'),
    (4, 1, '3'),
    (2, 2, '1'),
    (6, 2, '2'),
    (7, 2, '3'),
    (5, 3, '1'),
    (10, 3, '2'),
    (11, 3, '3'),
    (8, 4, '1'),
    (9, 4, '1'),
    (12, 4, '2');

-- ========================= EQUIPAMENTOS =========================
INSERT INTO
    equipment (
        name,
        description,
        quantity,
        quality,
        accessLevel,
        labId
    )
VALUES
    (
        'Microscópio Óptico',
        'Aumento até 1000x.',
        10,
        '5',
        '1',
        1
    ),
    (
        'Centrífuga',
        'Capacidade 12 tubos.',
        3,
        '4',
        '2',
        1
    ),
    (
        'Espectrofotômetro',
        'Faixa UV-Vis 200-800 nm.',
        2,
        '5',
        '3',
        1
    ),
    (
        'Balança Analítica',
        'Precisão 0,1 mg.',
        4,
        '5',
        '2',
        2
    ),
    (
        'Gerador de Funções',
        'Faixa 1 Hz a 1 MHz.',
        5,
        '4',
        '2',
        2
    ),
    (
        'Impressora 3D',
        'Impressão PLA e ABS.',
        2,
        '5',
        '3',
        4
    ),
    (
        'Osciloscópio',
        '200 MHz digital.',
        6,
        '5',
        '2',
        2
    ),
    (
        'Autoclave',
        'Esterilização de vidrarias.',
        1,
        '4',
        '3',
        3
    ),
    (
        'Multímetro Digital',
        'Precisão 0,01%.',
        8,
        '5',
        '1',
        2
    ),
    (
        'Notebook Dell',
        'Core i7, 16GB RAM.',
        6,
        '5',
        '2',
        4
    ),
    (
        'Imersor Térmico',
        'Controle 10-100°C.',
        2,
        '4',
        '3',
        5
    ),
    ('Micropipeta', '20-200 µL.', 12, '5', '1', 3);

-- ========================= PRODUTOS QUÍMICOS =========================
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
        labId
    )
VALUES
    (
        'Ácido Clorídrico',
        500.00,
        36.46,
        '7647-01-0',
        '231-595-7',
        'Líquido',
        '2',
        '2026-12-31',
        1
    ),
    (
        'Etanol',
        1000.00,
        46.07,
        '64-17-5',
        '200-578-6',
        'Líquido',
        '1',
        '2025-06-30',
        1
    ),
    (
        'Sulfato de Cobre',
        250.00,
        159.61,
        '7758-98-7',
        '231-847-6',
        'Sólido',
        '3',
        '2027-03-15',
        1
    ),
    (
        'Ácido Nítrico',
        300.00,
        63.01,
        '7697-37-2',
        '231-714-2',
        'Líquido',
        '3',
        '2026-08-20',
        1
    ),
    (
        'Cloreto de Sódio',
        2000.00,
        58.44,
        '7647-14-5',
        '231-598-3',
        'Sólido',
        '1',
        '2028-01-01',
        1
    ),
    (
        'Peróxido de Hidrogênio',
        150.00,
        34.01,
        '7722-84-1',
        '231-765-0',
        'Líquido',
        '2',
        '2025-11-11',
        1
    ),
    (
        'Amônia',
        100.00,
        17.03,
        '7664-41-7',
        '231-635-3',
        'Gasoso',
        '3',
        '2025-09-10',
        1
    ),
    (
        'Glicerina',
        500.00,
        92.09,
        '56-81-5',
        '200-289-5',
        'Líquido',
        '1',
        '2026-05-12',
        1
    ),
    (
        'Ácido Acético',
        400.00,
        60.05,
        '64-19-7',
        '200-580-7',
        'Líquido',
        '2',
        '2027-07-07',
        1
    ),
    (
        'Sacarose',
        800.00,
        342.30,
        '57-50-1',
        '200-334-9',
        'Sólido',
        '1',
        '2028-02-28',
        1
    ),
    (
        'Metanol',
        600.00,
        32.04,
        '67-56-1',
        '200-659-6',
        'Líquido',
        '2',
        '2026-04-04',
        1
    ),
    (
        'Fenol',
        150.00,
        94.11,
        '108-95-2',
        '203-632-7',
        'Sólido',
        '3',
        '2025-12-12',
        1
    );

-- ========================= SESSÕES =========================
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
        '2025-09-01',
        '09:00:00',
        '11:00:00',
        'Agendada',
        1,
        1
    ),
    (
        '2025-09-02',
        '13:00:00',
        '15:00:00',
        'Andamento',
        3,
        1
    ),
    (
        '2025-09-03',
        '10:00:00',
        '12:00:00',
        'Finalizada',
        4,
        1
    ),
    (
        '2025-09-04',
        '14:00:00',
        '16:00:00',
        'Cancelada',
        2,
        2
    ),
    (
        '2025-09-05',
        '08:00:00',
        '10:00:00',
        'Agendada',
        5,
        3
    ),
    (
        '2025-09-06',
        '15:00:00',
        '17:00:00',
        'Andamento',
        6,
        2
    ),
    (
        '2025-09-07',
        '09:30:00',
        '11:30:00',
        'Finalizada',
        7,
        4
    ),
    (
        '2025-09-08',
        '13:30:00',
        '15:30:00',
        'Agendada',
        8,
        3
    ),
    (
        '2025-09-09',
        '10:30:00',
        '12:30:00',
        'Andamento',
        9,
        1
    ),
    (
        '2025-09-10',
        '16:00:00',
        '18:00:00',
        'Finalizada',
        10,
        2
    ),
    (
        '2025-09-11',
        '11:00:00',
        '13:00:00',
        'Agendada',
        11,
        3
    ),
    (
        '2025-09-12',
        '09:00:00',
        '11:00:00',
        'Andamento',
        12,
        4
    );

-- ========================= EQUIPMENT RESERVATION =========================
INSERT INTO
    equipmentReservation (equipmentId, sessionId, quantity)
VALUES
    (1, 1, 2),
    (2, 1, 1),
    (3, 2, 1),
    (4, 4, 2),
    (5, 6, 1),
    (6, 7, 1),
    (7, 9, 2),
    (8, 5, 1),
    (9, 10, 3),
    (10, 11, 2),
    (11, 12, 1),
    (12, 8, 2);

-- ========================= CHEMICAL RESERVATION =========================
INSERT INTO
    chemicalReservation (chemicalId, sessionId, quantity)
VALUES
    (1, 1, 50.00),
    (2, 1, 100.00),
    (3, 2, 25.00),
    (4, 3, 30.00),
    (5, 4, 200.00),
    (6, 5, 15.00),
    (7, 6, 10.00),
    (8, 7, 50.00),
    (9, 8, 20.00),
    (10, 9, 100.00),
    (11, 10, 40.00),
    (12, 11, 10.00);