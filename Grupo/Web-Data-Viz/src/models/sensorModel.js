var database = require("../database/config");

function listarEnderecos() {
  var instrucao = `
        SELECT 
            s.idSensor,
            s.codigoSensor,
            s.codigoLixeira,
            s.categoria,
            s.status,
            e.idEndereco,
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
        SELECT 
            codigoLixeira,
            logradouro
        FROM Sensor
        JOIN Coleta
            ON fkSensor = idSensor
        JOIN Endereco
            ON idEndereco = fkEndereco
        WHERE fkEmpresa = ${fkEmpresa}
        AND idColeta = (
                SELECT MAX(idColeta)
                FROM Coleta
                WHERE fkSensor = idSensor
            )
        AND distancia > 76;
    `;
  return database.executar(instrucaoSql);
}

function exibirInativos(fkEmpresa) {
  var instrucaoSql = `
        SELECT codigoSensor, logradouro 
        FROM sensor 
        JOIN endereco
        ON fkEndereco = idEndereco
        WHERE status = 0 AND fkEmpresa = ${fkEmpresa};
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  listarEnderecos,
  listarTodos,
  listarPorLixeira,
  exibirInativos,
  exibirCriticos,
};
