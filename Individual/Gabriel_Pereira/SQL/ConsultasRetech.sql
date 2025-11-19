-- Criação do banco de dados
CREATE DATABASE ReTech;

-- Seleciona o banco de dados para uso
USE ReTech;

/*
Tabela Empresa

- Armazena os dados das empresas que contratam o sistema ReTech
- Cada empresa tem sensores, usúarios e contatos associados 
*/
CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único da empresa
nomeEmpresa VARCHAR(45),					-- Nome da empresa
dtInicioContrato DATE,						-- Data de início do contato
dtFimContrato DATE							-- Data do fim do contrato
);

/*
Tabela Endereco
- Armazena os locais onde os sensores estão instalados
- No diagrama de solução representa o ponto físico das lixeiras
*/
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único do endereço
logradouro VARCHAR(45),						-- Rua, avenida ou local
numero INT,									-- Número do local 
cep CHAR(9)									-- Código postal (CEP)
);

CREATE TABLE Lixeira(
idLixeira INT PRIMARY KEY AUTO_INCREMENT,	-- Identificador único da lixeira
identificador VARCHAR(45),					-- Identificador da lixeira (Ex: L-01)
profundidadeTotalCm DECIMAL(5,2),			-- Profundidade total em CM
fkEndereco INT,								-- Local onde a lixeira está instalada
CONSTRAINT fkLixeiraEndereco
FOREIGN KEY (fkEndereco)
REFERENCES Endereco(idEndereco)
);

/*
Tabela Sensor

- Armazena os sensores instalados nas lixeiras
- Cada sensor coleta dados de distância (nível do lixo) e envia
via API para o banco de dados
*/
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,	-- identificador do sensor
codigoSensor VARCHAR(45),
`status` TINYINT,                           -- Status da lixeira (1 = Ativada, 0 = Desativado)
fkEmpresa INT,								-- Empresa responsável
CONSTRAINT fkSensorEmpresa
FOREIGN KEY (fkEmpresa)
REFERENCES Empresa(idEmpresa),
fkLixeira INT,								-- Lixeira onde o sensor está instalado
CONSTRAINT fkSensorLixeira
FOREIGN KEY (fkLixeira)
REFERENCES Lixeira(idLixeira)
);

/*
Tabela Usuário
Representam os operadores das empresas ou o administrador 
*/
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador do usúario
nome VARCHAR(100),							-- Nome do usuário
email VARCHAR(100),							-- E-mail de login
senha VARCHAR(255),							-- Senha do acesso
fkAdministrador INT,						-- Auto-relacionamento (usuário administrador)
CONSTRAINT fkUsuarioAdministrador 			
FOREIGN KEY (fkAdministrador)
REFERENCES Usuario(idUsuario),
fkEmpresa INT,								-- Empresa a que o usuário pertence
CONSTRAINT fkUsuarioEmpresa
FOREIGN KEY (fkEmpresa)
REFERENCES Empresa(idEmpresa)
);

/*
Tabela: ColetaDados

Registra todas as leituras feitas pelos sensores
No diagrama, corresponde à comunicação entre
sistema de coleta de dados (Arduino) e o Banco de Dados.
*/
CREATE TABLE ColetaDados(
idColeta INT PRIMARY KEY AUTO_INCREMENT,	    -- Identificador da coleta
distancia DECIMAL(5,2),							-- Distância medida  (nível de resíduo)
dtHoraColeta DATETIME,							-- Data e Hora da leitura
fkSensor INT,									-- Sensor que coletou os dados
CONSTRAINT fkColetaDadosSensor
FOREIGN KEY (fkSensor)
REFERENCES Sensor(idSensor)
);

-- Inserções de dados

INSERT INTO Empresa (nomeEmpresa, dtInicioContrato, dtFimContrato) VALUES
('EcoLog Transportes', '2024-11-01', '2025-11-01');

INSERT INTO Endereco (logradouro, numero, cep) VALUES
('Avenida Paulista', 1578, '01310-200'),
('Parque Ibirapuera', 0, '04094-010');

INSERT INTO Lixeira (identificador, profundidadeTotalCm, fkEndereco) VALUES
('LIX-PAUL-01', 100.00, 1),
('LIX-IBIRA-01', 120.00, 2),
('LIX-IBIRA-02', 120.00, 2);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkLixeira) VALUES
('SNSR-B002', 1, 1, 1),
('SNSR-C001', 1, 1, 2),
('SNSR-C002', 0, 1, 3);

INSERT INTO Usuario (nome, email, senha, fkEmpresa) VALUES
('Gestor EcoLog', 'gestor@ecolog.com', 'eco123', 1);

INSERT INTO Usuario (nome, email, senha, fkAdministrador, fkEmpresa) VALUES
('Fiscal Parque', 'fiscal@ecolog.com', 'eco456', 1, 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkLixeira) VALUES
('A2315', 0, 1, 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkLixeira) VALUES
('B4915', 1, 1, 1);

INSERT INTO ColetaDados (distancia, dtHoraColeta, fkSensor) VALUES
(15.50, '2025-11-12 10:30:00', 1), -- Sensor 1 (SNSR-B002), CRÍTICO
(30.00, '2025-11-12 10:31:00', 2), -- Sensor 2 (SNSR-C001), ALERTA
(60.20, '2025-11-12 10:32:00', 4), -- Sensor 4 (A2315 - inativo, mas tem dado), MODERADO
(80.00, '2025-11-12 10:33:00', 5), -- Sensor 5 (B4915), ESTÁVEL
(22.00, '2025-11-12 10:34:00', 5); -- Sensor 5 (B4915), CRÍTICO

# Estado: Crítico

SELECT C.distancia AS 'Nível do Resíduo (cm)',
S.codigoSensor,
E.nomeEmpresa,
CONCAT('STATUS: ', 'CRÍTICO! Esvaziamento Urgente!') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia <= 25
ORDER BY C.distancia ASC;

# Estado: Alerta

SELECT C.distancia AS 'Nível do Resíduo (cm)',
S.codigoSensor,
E.nomeEmpresa,
CONCAT('STATUS: ', 'ALERTA! Nível Alto de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 25 AND C.distancia <= 50
ORDER BY C.distancia ASC;

# Estado: Moderado    

SELECT C.distancia AS 'Nível do Resíduo (cm)',
S.codigoSensor,
E.nomeEmpresa,
CONCAT('STATUS: ', 'MODERADO. Monitorar.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 50 AND C.distancia <= 75
ORDER BY C.distancia ASC;

# Estado: Estável

SELECT C.distancia AS 'Nível do Resíduo (cm)',
S.codigoSensor,
E.nomeEmpresa,
CONCAT('STATUS: ', 'ESTÁVEL. Nível Baixo de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 75
ORDER BY C.distancia ASC;


SELECT CONCAT('Erro 404 - sensor ', S.codigoSensor, ' se encontra inativo') AS Mensagem_Alerta
FROM Sensor AS S
WHERE S.status = 0 
AND S.codigoSensor = 'A2315';


SELECT CONCAT('Alerta - Lixeira ', S.codigoSensor, ' se encontra em estado crítico') AS Mensagem_Alerta
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
WHERE C.distancia <= 25 
GROUP BY S.codigoSensor;

-- Usuários e administradores

SELECT U.nome AS 'Nome do Usuário Operador',
U.email AS 'Login do Operador',
E.nomeEmpresa,
ADM.nome AS 'Administrador Responsável',
CONCAT('Operador da empresa ', E.nomeEmpresa) AS 'Descrição'
FROM Usuario AS U
JOIN Empresa AS E ON U.fkEmpresa = E.idEmpresa
JOIN Usuario AS ADM ON U.fkAdministrador = ADM.idUsuario
ORDER BY E.nomeEmpresa, U.nome;