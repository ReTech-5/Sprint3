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