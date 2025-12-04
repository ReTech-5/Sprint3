var database = require("../database/config");

function listarEnderecos() {
  var instrucao = `
        SELECT 
            s.idSensor,
            s.codigoSensor,
            s.codigoLixeira,
            s.categoria,
            s.status,
            e.logradouro,
            e.numero,
            e.cep
        FROM Sensor s
        JOIN Endereco e ON s.fkEndereco = e.idEndereco
        ORDER BY s.status DESC, s.categoria;
    `;
  return database.executar(instrucao);
}

function listarTodos() {
  var instrucao = `
        SELECT idSensor, codigoSensor, codigoLixeira, categoria, status
        FROM Sensor;
    `;
  return database.executar(instrucao);
}

function listarPorLixeira(codigoLixeira) {
  var instrucao = `
        SELECT idSensor, codigoSensor, codigoLixeira, categoria, status
        FROM Sensor
        WHERE codigoLixeira = '${codigoLixeira}';
    `;
  return database.executar(instrucao);
}

function exibirCriticos(fkEmpresa) {
  var instrucaoSql = `
        SELECT s.codigoLixeira, e.logradouro
        FROM coleta c
        JOIN sensor s ON c.fkSensor = s.idSensor
        JOIN endereco e ON s.fkEndereco = e.idEndereco
        JOIN (
            SELECT fkSensor, MAX(distancia) AS maiorDistancia
            FROM coleta
            JOIN sensor ON fkSensor = idSensor
            WHERE TIMESTAMP(dataColeta, horaColeta) >= NOW() - INTERVAL 3 HOUR
            AND distancia >= 76.00 AND fkEmpresa = ${fkEmpresa}
            GROUP BY fkSensor
        ) filtro ON filtro.fkSensor = c.fkSensor AND filtro.maiorDistancia = c.distancia;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibirInativos(fkEmpresa) {
  var instrucaoSql = `
        SELECT codigoSensor, logradouro FROM sensor 
        JOIN endereco
        ON fkEndereco = idEndereco
        WHERE status = 0 AND fkEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarEnderecos,
  listarTodos,
  listarPorLixeira,
  exibirInativos,
  exibirCriticos,
};
