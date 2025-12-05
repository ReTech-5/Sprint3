var database = require("../database/config")

function exibirOrganico(fkEmpresa) {
    var instrucaoSql = `
        SELECT distancia
        FROM sensor
        JOIN coleta
            ON fkSensor = idSensor
        WHERE fkEmpresa = ${fkEmpresa} AND categoria = 'Orgânica'
        AND (idColeta, fkSensor) IN (
                SELECT MAX(idColeta), fkSensor
                FROM coleta
                GROUP BY fkSensor
            );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirReciclavel(fkEmpresa) {
    var instrucaoSql = `
        SELECT distancia
        FROM sensor
        JOIN coleta
            ON fkSensor = idSensor
        WHERE fkEmpresa = ${fkEmpresa} AND categoria = 'Reciclável'
        AND (idColeta, fkSensor) IN (
                SELECT MAX(idColeta), fkSensor
                FROM coleta
                GROUP BY fkSensor
            );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    exibirOrganico,
    exibirReciclavel,
};