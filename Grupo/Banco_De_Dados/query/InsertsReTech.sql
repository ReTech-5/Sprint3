-- INSERÇÃO DE DADOS

INSERT INTO Empresa (nome, inicioContrato, fimContrato) VALUES
('EcoTech Gestão Ambiental', '2023-01-01', '2025-01-01'),
('GreenCity Coleta Urbana', '2022-06-15', '2026-06-15'),
('Sustenta Brasil Serviços', '2024-03-10', '2027-03-10');

INSERT INTO Endereco (logradouro, numero, cep) VALUES
('Av. Paulista', 1200, '01310-000'),
('Rua XV de Novembro', 532, '80020-310'),
('Av. Francisco Matarazzo', 987, '05001-200'),
('Av. Lins de Vasconcelos', 221, '01537-000'),
('Rua dos Andradas', 450, '90020-005'),
('Rua da Consolação', 755, '01302-001');

INSERT INTO Sensor (codigoSensor, codigoLixeira, categoria, status, fkEmpresa, fkEndereco)
VALUES
('SEN001', 'LX001', 'Orgânica', 1, 1, 1),
('SEN002', 'LX002', 'Reciclável', 1, 1, 2),
('SEN003', 'LX003', 'Orgânica', 0, 2, 3),
('SEN004', 'LX004', 'Reciclável', 1, 2, 1),
('SEN005', 'LX005', 'Orgânica', 1, 1, 4),
('SEN006', 'LX006', 'Reciclável', 0, 3, 2),
('SEN007', 'LX007', 'Reciclável', 1, 3, 3),
('SEN008', 'LX008', 'Orgânica', 1, 2, 4),
('SEN009', 'LX009', 'Reciclável', 0, 1, 5),
('SEN010', 'LX010', 'Orgânica', 1, 3, 1);


INSERT INTO Usuario (nome, email, senha, acesso, fkEmpresa) VALUES
('Gestor EcoLog', 'gestor@ecolog.com', 'eco123', "Padrão", 1);

INSERT INTO Usuario (nome, email, senha, acesso, fkEmpresa) VALUES
('Fiscal Parque', 'fiscal@ecolog.com', 'eco456', "Administrador", 1);

INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta) VALUES
(1, 12.50, '08:10:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 20.75, '09:00:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 35.20, '10:15:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 47.80, '10:50:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 55.10, '11:05:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 68.40, '11:45:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 75.90, '12:20:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 82.30, '12:55:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 94.75, '13:30:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 15.20, '22:00:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 22.45, '22:30:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 35.10, '23:00:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 48.70, '23:30:00', CURRENT_DATE - INTERVAL 1 DAY),
(1, 50.80, '00:00:00', CURRENT_DATE),
(1, 60.30, '00:30:00', CURRENT_DATE),
(1, 72.90, '00:40:00', CURRENT_DATE);

SELECT * FROM sensor;