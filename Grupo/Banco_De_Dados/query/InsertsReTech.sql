USE ReTech;

INSERT INTO Empresa (idEmpresa, nome, inicioContrato, fimContrato) VALUES
	(1, 'SpTech City', '2025-01-01', '2026-01-01');

INSERT INTO Endereco (idEndereco, logradouro, numero, cep) VALUES
	(1, 'Rua das Flores', 123, '01001-000'),
	(2, 'Avenida Paulista', 1578, '01310-200'),
	(3, 'Rua XV de Novembro', 45, '80020-310'),
	(4, 'Praça da Sé', 10, '01001-001'),
	(5, 'Rua das Acácias', 250, '04045-020'),
	(6, 'Avenida Brasil', 5000, '22250-040'),
	(7, 'Rua Bahia', 77, '30160-011'),
	(8, 'Avenida Atlântica', 1702, '22021-001');


INSERT INTO Sensor (codigoSensor, codigoLixeira, categoria, `status`, fkEmpresa, fkEndereco) VALUES
	('Sensor-A1', 'Lixeira-A1', 'Orgânica', 1, 1, 1),
	('Sensor-A2', 'Lixeira-A2', 'Reciclável', 1, 1, 1),
	('Sensor-A3', 'Lixeira-A3', 'Orgânica', 1, 1, 1),
	('Sensor-B1', 'Lixeira-B1', 'Orgânica', 1, 1, 2),
	('Sensor-B2', 'Lixeira-B2', 'Reciclável', 1, 1, 2),
	('Sensor-B3', 'Lixeira-B3', 'Orgânica', 1, 1, 2),
	('Sensor-C1', 'Lixeira-C1', 'Orgânica', 1, 1, 3),
	('Sensor-C2', 'Lixeira-C2', 'Reciclável', 1, 1, 3),
	('Sensor-C3', 'Lixeira-C3', 'Orgânica', 1, 1, 3),
	('Sensor-D1', 'Lixeira-D1', 'Orgânica', 1, 1, 4),
	('Sensor-D2', 'Lixeira-D2', 'Reciclável', 1, 1, 4),
	('Sensor-D3', 'Lixeira-D3', 'Orgânica', 1, 1, 4),
	('Sensor-E1', 'Lixeira-E1', 'Orgânica', 1, 1, 5),
	('Sensor-E2', 'Lixeira-E2', 'Reciclável', 1, 1, 5),
	('Sensor-E3', 'Lixeira-E3', 'Orgânica', 1, 1, 5),
	('Sensor-F1', 'Lixeira-F1', 'Orgânica', 0, 1, 6),
	('Sensor-F2', 'Lixeira-F2', 'Reciclável', 1, 1, 6),
	('Sensor-F3', 'Lixeira-F3', 'Orgânica', 1, 1, 6),
	('Sensor-G1', 'Lixeira-G1', 'Orgânica', 1, 1, 7),
	('Sensor-G2', 'Lixeira-G2', 'Reciclável', 0, 1, 7),
	('Sensor-G3', 'Lixeira-G3', 'Orgânica', 1, 1, 7),
	('Sensor-H1', 'Lixeira-H1', 'Orgânica', 1, 1, 8),
	('Sensor-H2', 'Lixeira-H2', 'Reciclável', 1, 1, 8),
	('Sensor-H3', 'Lixeira-H3', 'Orgânica', 0, 1, 8);


INSERT INTO Usuario (idUsuario, nome, email, senha, acesso, fkEmpresa) VALUES
	(1, 'Gleison Almeida', 'gleison@gmail.com', 'Senha123!', 'Administrador', 1),
	(2, 'Samara Silva', 'samara@gmail.com', 'Senha123!', 'Suporte', null),
	(3, 'Lucas Quevedo', 'lucas@gmail.com', 'Senha123!', 'Padrão', 1);

DELIMITER $$

CREATE PROCEDURE gerarColetas()
BEGIN
    DECLARE s INT DEFAULT 1;
    DECLARE c INT;
    DECLARE faixaMin INT;
    DECLARE faixaMax INT;
    DECLARE distancia DECIMAL(5,2);
    DECLARE dia INT;
    DECLARE hora INT;
    DECLARE minuto INT;

    WHILE s <= 24 DO

        IF s IN (1,5,9,13,17,21) THEN
            SET faixaMin = 1; SET faixaMax = 25;
        ELSEIF s IN (2,6,10,14,18,22) THEN
            SET faixaMin = 26; SET faixaMax = 50;
        ELSEIF s IN (3,7,11,15,19,23) THEN
            SET faixaMin = 51; SET faixaMax = 75;
        ELSE
            SET faixaMin = 76; SET faixaMax = 100;
        END IF;

        SET c = 1;
        WHILE c <= 20 DO
            SET distancia = ROUND(faixaMin + RAND() * (faixaMax - faixaMin), 2);

            SET dia = FLOOR(1 + RAND() * 29);      -- dias variados novembro
            SET hora = FLOOR(RAND() * 24);
            SET minuto = FLOOR(RAND() * 60);

            INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
            VALUES (
                s,
                distancia,
                MAKETIME(hora, minuto, 0),
                MAKEDATE(2025, 305) + INTERVAL (dia-1) DAY
            );

            SET c = c + 1;
        END WHILE;

        SET s = s + 1;
    END WHILE;

END $$

DELIMITER ;

CALL gerarColetas();
DROP PROCEDURE gerarColetas;

select * from coleta;