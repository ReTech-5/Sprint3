USE ReTech;

INSERT INTO Empresa (idEmpresa, nome, inicioContrato, fimContrato) VALUES
(1, 'EcoCity Soluções', '2025-01-01', '2026-01-01');

INSERT INTO Endereco (idEndereco, logradouro, numero, cep) VALUES
(1, 'Rua das Palmeiras', 123, '12345-678');

INSERT INTO Sensor (idSensor, codigoSensor, codigoLixeira, categoria, `status`, fkEmpresa, fkEndereco) VALUES
(1, 'SEN-ECO-001', 'LIX-001', 'Orgânica', 1, 1, 1),
(2, 'SEN-ECO-002', 'LIX-002', 'Reciclável', 1, 1, 1),
(3, 'SEN-ECO-003', 'LIX-003', 'Orgânica', 1, 1, 1),
(4, 'SEN-ECO-004', 'LIX-004', 'Reciclável', 1, 1, 1);

INSERT INTO Usuario (idUsuario, nome, email, senha, acesso, fkEmpresa) VALUES
(1, 'Carlos Silva', 'carlos.silva@ecocity.com', 'senha123', 'Administrador', 1),
(2, 'Mariana Rocha', 'mariana.rocha@ecocity.com', 'senha123', 'Padrão', 1),
(3, 'Paulo Souza', 'paulo.souza@ecocity.com', 'senha123', 'Suporte', 1);

DELIMITER $$
CREATE PROCEDURE gerar_coletas_4sensores()
BEGIN
  DECLARE sensor_id INT DEFAULT 1;
  DECLARE dia INT;
  DECLARE data_base DATE DEFAULT '2025-11-01';
  DECLARE data_atual DATE;
  DECLARE hora1 TIME DEFAULT '08:00:00';
  DECLARE hora2 TIME DEFAULT '12:00:00';
  DECLARE hora3 TIME DEFAULT '16:00:00';
  DECLARE hora4 TIME DEFAULT '20:00:00';
  DECLARE d1 DECIMAL(5,2);
  DECLARE d2 DECIMAL(5,2);
  DECLARE d3 DECIMAL(5,2);

  WHILE sensor_id <= 4 DO
    SET dia = 0;
    WHILE dia < 30 DO
      SET data_atual = DATE_ADD(data_base, INTERVAL dia DAY);

      SET d1 = ROUND( (10 + sensor_id*2) + (dia * 0.25) + (RAND() * 3), 2);
      SET d2 = ROUND( d1 + (8 + RAND()*5), 2);
      SET d3 = ROUND( d2 + (12 + RAND()*8), 2);

      INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
        VALUES (sensor_id, d1, hora1, data_atual);

      INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
        VALUES (sensor_id, d2, hora2, data_atual);

      INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
        VALUES (sensor_id, d3, hora3, data_atual);

      INSERT INTO Coleta (fkSensor, distancia, horaColeta, dataColeta)
        VALUES (sensor_id, 0.00, hora4, data_atual);

      SET dia = dia + 1;
    END WHILE;

    SET sensor_id = sensor_id + 1;
  END WHILE;
END $$
DELIMITER ;

CALL gerar_coletas_4sensores();

-- 7) (Opcional) remover a procedure se desejar
DROP PROCEDURE IF EXISTS gerar_coletas_4sensores;

SELECT fkSensor, COUNT(*) AS total_coletas FROM Coleta WHERE fkSensor BETWEEN 1 AND 4 GROUP BY fkSensor;


