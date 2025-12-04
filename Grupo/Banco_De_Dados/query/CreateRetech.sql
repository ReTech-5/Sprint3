-- Criação do banco de dados
DROP DATABASE IF EXISTS ReTech; 
CREATE DATABASE ReTech;

-- Seleciona o banco de dados para uso
USE ReTech;

/*
Tabela Empresa

- Armazena os dados das empresas que contratam o sistema ReTech
- Cada empresa tem sensores, usúarios e contatos associados 
*/
CREATE TABLE Empresa( 
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador Único da Empresa
nome VARCHAR(100),					        -- Nome da Empresa
inicioContrato DATE,						-- Data de Início do Contato
fimContrato DATE							-- Data do Fim do Contrato
);

/*
Tabela Endereco
- Armazena os locais onde os sensores estão instalados
- No diagrama de solução representa o ponto físico das lixeiras
*/
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador Único do Endereço
logradouro VARCHAR(45),						-- Rua, Avenida, Alameda, etc
numero INT,									-- Número do Local 
cep CHAR(9),								-- Código Postal (CEP)	
lixeira VARCHAR(20),						-- Identificador da lixeira
tipoLixeira VARCHAR(10)
	CONSTRAINT TipoLixeira CHECK (tipoLixeira in ('Organico', 'Reciclável'))
);

/*
Tabela Sensor

- Armazena os sensores instalados nas lixeiras
- Cada sensor coleta dados de distância (nível do lixo) e envia
via API para o banco de dados
*/
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,    -- Identificador Único do Sensor
codigoSensor VARCHAR(45),				    -- Código/Identificador do Sensor
codigoLixeira VARCHAR(45),                  -- Código/Identificador da Lixeira
CONSTRAINT chkCategoria
    CHECK (categoria IN ('orgânica', 'reciclável')),
`status` TINYINT,                           -- Status da Lixeira (1 = Ativada, 0 = Desativado)
fkEmpresa INT,								-- Empresa Responsável
	CONSTRAINT fkSensorEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa),
fkEndereco INT,								-- Endereço do Sensor
	CONSTRAINT fkSensorEndereco 
    FOREIGN KEY (fkEndereco)
    REFERENCES Endereco(idEndereco)
);

/*
Tabela Usúario
Representam os operadores das empresas
e seus respectivos níveis de acesso
*/
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 		-- Identificador Único do Usúario
nome VARCHAR(100),						-- Nome do Usuário
email VARCHAR(100) UNIQUE,								-- E-mail de Login
senha VARCHAR(100),								-- Senha de Login
acesso VARCHAR(13),                             -- Nível de Acesso do Usuário (Padrão, Admnistrador e Suporte)
CONSTRAINT chkAcesso
    CHECK (acesso IN ('Padrão', 'Administrador', 'Suporte')),
fkEmpresa INT,									-- Empresa do Usuário
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
CREATE TABLE Coleta(
idColeta INT AUTO_INCREMENT UNIQUE NOT NULL,        -- Identificador da Coleta
fkSensor INT,                                       -- Sensor que Realizou as Coletas
CONSTRAINT fkColetaDadosSensor
    FOREIGN KEY (fkSensor)
        REFERENCES Sensor(idSensor),
CONSTRAINT pkComposta
    PRIMARY KEY (idColeta, fkSensor),               -- Identificador das Coleta Realizadas por Sensor
distancia DECIMAL(5,2),								-- Distância Medida (Preenchimento da Lixeira)
horaColeta TIME DEFAULT (CURRENT_TIME),				-- Hora da Leitura
dataColeta DATE DEFAULT (CURRENT_DATE),             -- Data da Leitura			
lixeira VARCHAR(50),
tipoLixeira VARCHAR(10)
    CONSTRAINT chkTipo CHECK (tipoLixeira in ('Orgânico', 'Reciclável'))
);

