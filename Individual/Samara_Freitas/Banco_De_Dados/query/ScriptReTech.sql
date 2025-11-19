CREATE DATABASE ReTech;

USE ReTech;

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(45),
numero INT,
cep CHAR(9),
lixeira VARCHAR(45)
);

CREATE TABLE contato(
idContato INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(45),
telefone VARCHAR(12),
telefoneFixo VARCHAR(11),
fkAdministrador INT,
	CONSTRAINT fkempresaAdministrador
    FOREIGN KEY (fkAdministrador)
    REFERENCES contato(idContato),
fkEmpresa INT
);


CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(45),
dtInicioContrato DATE,
dtFimContrato DATE,
fkContato INT,
	CONSTRAINT fkempresaContato 
    FOREIGN KEY (fkContato)
    REFERENCES contato(idContato)
);

ALTER TABLE contato   
	ADD CONSTRAINT fkcontatoEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa);
    
CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
codigoSensor VARCHAR(45),
fkEndereco INT,
	CONSTRAINT fksensorEndereco 
    FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco),
fkEmpresa INT,
	CONSTRAINT fksensorEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa),
fkContato INT,
	CONSTRAINT fksensorContato
    FOREIGN KEY (fkContato)
    REFERENCES contato(idContato)
);


CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
fkAdministrador INT,
CONSTRAINT fkUsuarioAdministrador 
FOREIGN KEY (fkAdministrador)
REFERENCES usuario(idUsuario),
nome VARCHAR(100),
email VARCHAR(100),
senha VARCHAR(100),
fkEmpresa INT,
	CONSTRAINT fkusuarioEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

CREATE TABLE ColetaDados(
idColetaUsuario INT PRIMARY KEY AUTO_INCREMENT,
distancia DECIMAL(3,2),
horaColeta TIME,
dataColeta DATE,
fkSensor INT,
	CONSTRAINT fkColetaDadosSensor
    FOREIGN KEY (fkSensor)
    REFERENCES sensor(idSensor),
fkEndereco INT,
	CONSTRAINT fkColetaDadosEndereco
    FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco)
);


INSERT INTO contato (email, telefone, telefoneFixo, fkAdministrador)
	VALUES
('Samara.freitas@pref.indaiatuba.gov.br', '19987654321', '1934567890', NULL),
('Gleison.freitas@pref.saopaulo.sp.gov.br', '11991234567', '1135678901', 1),
('Arthur.freitas@pref.osasco.sp.gov.br', '11993456789', '1146789012', 1),
('Lucas.Quevedo@pref.campinas.sp.gov.br', '19994561234', '1937890123', 2),
('Pedro.Cardoso@pref.maceio.al.gov.br', '82995672345', '8238901234', 3),
('Gabriel@pref.maceio.al.gov.br', '82995672389', '8238901234', 3);

SELECT * FROM contato;

INSERT INTO empresa (nomeEmpresa, dtInicioContrato, dtFimContrato, fkContato)
VALUES
('Prefeitura de Indaiatuba', '2025-09-10', '2026-01-10', 1),
('Prefeitura de São Paulo', '2025-08-20', '2026-05-20', 2),
('Prefeitura de Osasco', '2025-10-01', '2027-02-01', 3),
('Prefeitura de Campinas', '2025-10-15', '2029-09-15', 4),
('Prefeitura de Maceió', '2025-11-01', '2026-11-01', 5);

SELECT * FROM empresa;

INSERT INTO endereco (logradouro, numero, cep, lixeira)
VALUES
('Rua das Acácias', 120, '13330-000', 'L1 - Indaiatuba'),
('Avenida Paulista', 1500, '01310-000', 'L2 - São Paulo'),
('Rua das Rosas', 85, '06010-000', 'L3 - Osasco'),
('Praça XV de Novembro', 45, '13010-000', 'L4 - Campinas'),
('Avenida Fernandes Lima', 300, '57050-000', 'L5 - Maceió');

SELECT * FROM endereco;

INSERT INTO sensor (codigoSensor, fkEndereco, fkEmpresa, fkContato)
VALUES
('SEN-IND001', 1, 1, 1),
('SEN-SP001', 2, 2, 2),
('SEN-OSA001', 3, 3, 3),
('SEN-CAM001', 4, 4, 4),
('SEN-MAC001', 5, 5, 5);

SELECT * FROM sensor;

INSERT INTO usuario (fkAdministrador, nome, email, senha, fkEmpresa)
VALUES
(NULL, 'Claudio Frizzarini', 'Frizza@indaiatuba.gov.br', 'admin123', 1),
(1, 'Julia Araripe', 'Julia@saopaulo.sp.gov.br', 'senha123', 2),
(1, 'Vivian', 'Vivian@osasco.sp.gov.br', 'abc123', 3),
(2, 'Marcos', 'Marcos@campinas.sp.gov.br', 'teste456', 4),
(3, 'Marcio', 'Marcio@maceio.al.gov.br', 'senha789', 5);

SELECT * FROM usuario;

INSERT INTO ColetaDados (distancia, horaColeta, dataColeta, fkSensor, fkEndereco)
VALUES
(0.30, '08:00:00', '2025-10-01', 1, 1),
(0.55, '10:30:00', '2025-10-02', 2, 2),
(0.75, '12:00:00', '2025-10-03', 3, 3),
(0.90, '14:15:00', '2025-10-04', 4, 4),
(0.20, '09:45:00', '2025-10-05', 5, 5);
