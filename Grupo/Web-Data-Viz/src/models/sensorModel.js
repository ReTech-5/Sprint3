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

module.exports = {
    listarEnderecos,
    listarTodos,
    listarPorLixeira
};
