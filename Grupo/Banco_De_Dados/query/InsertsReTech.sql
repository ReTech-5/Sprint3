-- INSERÇÃO DE DADOS

INSERT INTO Empresa (nome, inicioContrato, fimContrato) VALUES
('EcoLog Transportes', '2024-11-01', '2025-11-01');

INSERT INTO Endereco (logradouro, numero, cep) VALUES
('Avenida Paulista', 1578, '01310-200'),
('Parque Ibirapuera', 0, '04094-010');

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('SNSR-B002', 1, 1, 1),
('SNSR-C001', 1, 1, 2),
('SNSR-C002', 0, 1, 2);

INSERT INTO Usuario (nome, email, senha, acesso, fkEmpresa) VALUES
('Gestor EcoLog', 'gestor@ecolog.com', 'eco123', "Padrão", 1);

INSERT INTO Usuario (nome, email, senha, acesso, fkEmpresa) VALUES
('Fiscal Parque', 'fiscal@ecolog.com', 'eco456', "Administrador", 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('A2315', 0, 1, 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('B4915', 1, 1, 1);

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