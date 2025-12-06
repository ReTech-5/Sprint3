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

DROP PROCEDURE IF EXISTS gerar_coletas_procedurais$$

CREATE PROCEDURE gerar_coletas_procedurais()
BEGIN
    DECLARE s INT;               -- sensor id
    DECLARE k INT;               -- coleta dentro do dia (1 ou 2)
    DECLARE d DATE;              -- data corrente
    DECLARE startDate DATE DEFAULT '2025-11-15';
    DECLARE endDate DATE DEFAULT '2025-12-06';
    DECLARE totalDays INT;
    DECLARE totalReadsPerSensor INT;
    DECLARE dayIndex INT DEFAULT 0;
    DECLARE fraction DOUBLE;
    DECLARE faixaMin DOUBLE;
    DECLARE faixaMax DOUBLE;
    DECLARE distancia DECIMAL(5,2);
    DECLARE hour_calc INT;
    DECLARE minute_calc INT;

    SET totalDays = DATEDIFF(endDate, startDate) + 1; -- inclusive
    SET totalReadsPerSensor = totalDays * 2; -- 2 leituras por dia

    SET d = startDate;
    SET dayIndex = 0;

    WHILE d <= endDate DO

        -- para cada sensor, cria duas coletas no dia 'd'
        SET s = 1;
        WHILE s <= 24 DO

            -- define faixa do sensor (assumiu-se: 12,6,2,4)
            IF s BETWEEN 1 AND 12 THEN
                SET faixaMin = 0.00; SET faixaMax = 25.00;
            ELSEIF s BETWEEN 13 AND 18 THEN
                SET faixaMin = 26.00; SET faixaMax = 50.00;
            ELSEIF s BETWEEN 19 AND 20 THEN
                SET faixaMin = 51.00; SET faixaMax = 75.00;
            ELSE
                SET faixaMin = 76.00; SET faixaMax = 99.99;
            END IF;

            SET k = 1;
            WHILE k <= 2 DO
                -- fraction: posição entre 0 e 1 (linear, fase do sensor)
                SET fraction = ( (dayIndex * 2) + (k - 1) ) / (totalReadsPerSensor - 1);

                -- valor crescente determinístico (monótono)
                SET distancia = ROUND( faixaMin + fraction * (faixaMax - faixaMin), 2);

                -- horário "aleatório" determinístico (reprodutível)
                -- formula simples para parecer aleatória sem usar RAND()
                SET hour_calc = MOD( (s * 3 + dayIndex * 5 + k * 11), 24 );
                SET minute_calc = MOD( (s * 7 + dayIndex * 13 + k * 17), 60 );

                -- garantir que a segunda coleta do último dia seja 14:00
                IF d = endDate AND k = 2 THEN
                    SET hour_calc = 14;
                    SET minute_calc = 0;
                END IF;

                INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
                VALUES (s, distancia, MAKETIME(hour_calc, minute_calc, 0), d);

                SET k = k + 1;
            END WHILE;

            SET s = s + 1;
        END WHILE;

        SET d = DATE_ADD(d, INTERVAL 1 DAY);
        SET dayIndex = dayIndex + 1;
    END WHILE;

END$$

DELIMITER ;

-- Executa a geração
CALL gerar_coletas_procedurais();

-- Opcional: remover a procedure se não quiser guardá-la
DROP PROCEDURE IF EXISTS gerar_coletas_procedurais;