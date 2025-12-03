-- CONSULTA DE DADOS

-- Estado: Crítico
    
SELECT C.distancia AS 'Nível do Resíduo (cm)',
       S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'CRÍTICO! Esvaziamento Urgente!') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia <= 75
ORDER BY C.distancia ASC;
    
-- Estado: Alerta

SELECT C.distancia AS 'Nível do Resíduo (cm)',
	   S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'ALERTA! Nível Alto de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 75 AND C.distancia <= 150
ORDER BY C.distancia ASC;
    
-- Estado: Moderado    

SELECT C.distancia AS 'Nível do Resíduo (cm)',
	   S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'MODERADO. Monitorar.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 150 AND C.distancia <= 225
ORDER BY C.distancia ASC;
    
-- Estado: Estável
    
SELECT C.distancia AS 'Nível do Resíduo (cm)',
       S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'ESTÁVEL. Nível Baixo de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 225
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

-- Usuários e Administradores

SELECT U.nome AS 'Nome do Usuário Operador',
       U.email AS 'Login do Operador',
       E.nomeEmpresa,
       ADM.nome AS 'Administrador Responsável',
       CONCAT('Operador da empresa ', E.nomeEmpresa) AS 'Descrição'
FROM Usuario AS U
JOIN Empresa AS E ON U.fkEmpresa = E.idEmpresa
JOIN Usuario AS ADM ON U.fkAdministrador = ADM.idUsuario
ORDER BY E.nomeEmpresa, U.nome;