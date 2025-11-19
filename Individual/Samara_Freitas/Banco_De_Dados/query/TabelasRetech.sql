-- Criação do banco de dados
CREATE DATABASE ReTech;

-- Seleciona o banco de dados para uso
USE ReTech;


-- Tabela Contato
/*
- Representa os contatos da ReTech(clientes)
*/

CREATE TABLE contato(
idContato INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único do contato
email VARCHAR(45),							-- E-mail do contato
telefone VARCHAR(12),  						-- Telefone celular
telefoneFixo VARCHAR(11), 					-- Telefone Fixo
fkAdministrador INT,           				-- Chave estrangeira auto-relacionamento 
	CONSTRAINT fkempresaAdministrador
    FOREIGN KEY (fkAdministrador)
    REFERENCES contato(idContato),
fkEmpresa INT								-- Empresa à qual o contato pertence
);

/*
Tabela empresa

- Armazena os dados das empresas que contratam o sistema ReTech
- Cada empresa tem sensores, usúarios e contatos associados 
*/

CREATE TABLE empresa( 
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único da empresa
nomeEmpresa VARCHAR(45),					-- Nome da empresa
dtInicioContrato DATE,						-- Data de início do contato
dtFimContrato DATE,							-- Data do fim do contrato
fkContato INT,								-- Chave estrangeira que referencia o contato
	CONSTRAINT fkempresaContato 
    FOREIGN KEY (fkContato)
    REFERENCES contato(idContato)
);

ALTER TABLE contato   -- Chave estrangeira para empresa
	ADD CONSTRAINT fkcontatoEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa);

/*
Tabela sensor

- Armazena os sensores instalados nas lixeiras
- Cada sensor coleta dados de distância (nível do lixo) e envia
via API para o banco de dados
*/
CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,	-- identificador do sensor
codigoSensor VARCHAR(45),					-- Código/Identificador do sensor
fkEndereco INT,								-- Local onde o sensor está instalado
	CONSTRAINT fksensorEndereco 
    FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco),
fkEmpresa INT,								-- Empresa responsável
	CONSTRAINT fksensorEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa),
fkContato INT,								-- Contato da empresa responsável
	CONSTRAINT fksensorContato
    FOREIGN KEY (fkContato)
    REFERENCES contato(idContato)
);


/*
Tabela endereco
- Armazena os locais onde os sensores estão instalados
- No diagrama de solução representa o ponto físico das lixeiras
*/
CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único do endereço
logradouro VARCHAR(45),						-- Rua, avenida ou local
numero INT,									-- Número do local 
cep CHAR(9),								-- Código postal (CEP)
lixeira VARCHAR(45)																																							
);

/*
Tabela usúario
Representam os operadores das empresas ou o administrador 
*/
CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador do usúario
fkAdministrador INT,						-- Auto-relacionamento (usuário administrador)
CONSTRAINT fkUsuarioAdministrador 			
FOREIGN KEY (fkAdministrador)
REFERENCES usuario(idUsuario),
nome VARCHAR(100),							-- Nome do usuário
email VARCHAR(100),							-- E-mail de login
senha VARCHAR(100),							-- Senha do acesso
fkEmpresa INT,								-- Empresa a que o usuário pertence
	CONSTRAINT fkusuarioEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

/*
Tabela: ColetaDados

Registra todas as leituras feitas pelos sensores
No diagrama, corresponde à comunicação entre
sistema de coleta de dados (Arduino) e o Banco de Dados.
*/
CREATE TABLE ColetaDados(
idColetaUsuario INT PRIMARY KEY AUTO_INCREMENT,		-- Identificador daa coleta
distancia DECIMAL(3,2),								-- Distância medida  (nível de resíduo)
horaColeta TIME,									-- Hora da leitura
dataColeta DATE, 									-- Data da leitura
fkSensor INT,										-- Sensor que coletou os dados
	CONSTRAINT fkColetaDadosSensor
    FOREIGN KEY (fkSensor)
    REFERENCES sensor(idSensor),
fkEndereco INT,										-- Local/ endereço da coleta
	CONSTRAINT fkColetaDadosEndereco
    FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco)
);


