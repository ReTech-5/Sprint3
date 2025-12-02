var database = require("../database/config");

function listar() {
    // (Mantém a função listar que já criamos)
    var instrucaoSql = `
        SELECT idSensor, status, logradouro, numero 
        FROM Sensor JOIN Endereco ON fkEndereco = idEndereco;
    `;
    return database.executar(instrucaoSql);
}

// NOVA: Busca dados de um sensor específico pelo ID (para o cabeçalho da página)
function buscarPorId(idSensor) {
    var instrucaoSql = `
        SELECT 
            s.idSensor,
            s.codigoSensor,
            s.categoria,
            s.status,
            e.logradouro,
            e.numero,
            e.cep
        FROM Sensor s
        JOIN Endereco e ON s.fkEndereco = e.idEndereco
        WHERE s.idSensor = ${idSensor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// NOVA: Busca as últimas medidas para os gráficos
function buscarMedidas(idSensor) {
    var instrucaoSql = `
        SELECT 
            distancia as preenchimento,
            DATE_FORMAT(horaColeta, '%H:%i') as momento
        FROM Coleta
        WHERE fkSensor = ${idSensor}
        ORDER BY idColeta DESC 
        LIMIT 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarPorId,
    buscarMedidas
};