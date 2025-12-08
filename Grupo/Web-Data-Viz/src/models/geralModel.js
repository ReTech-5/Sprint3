var database = require("../database/config")

function exibirOrganico(fkEmpresa) {
    var instrucaoSql = `
        SELECT distancia
        FROM Sensor
        JOIN Coleta
            ON fkSensor = idSensor
        WHERE fkEmpresa = ${fkEmpresa} AND categoria = 'Orgânica'
        AND (idColeta, fkSensor) IN (
                SELECT MAX(idColeta), fkSensor
                FROM Coleta
                GROUP BY fkSensor
            );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirReciclavel(fkEmpresa) {
    var instrucaoSql = `
        SELECT distancia
        FROM Sensor
        JOIN Coleta
            ON fkSensor = idSensor
        WHERE fkEmpresa = ${fkEmpresa} AND categoria = 'Reciclável'
        AND (idColeta, fkSensor) IN (
                SELECT MAX(idColeta), fkSensor
                FROM Coleta
                GROUP BY fkSensor
            );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEndereco (idEmpresa){

    var instrucaoSql = `
    select distinct idEndereco, logradouro, numero, max(distancia) as preenchimentoAtual from Endereco
    join Sensor
    on idEndereco = fkEndereco
    join Coleta 
    on idSensor = fkSensor
    where dataColeta = current_date()
    and fkEmpresa = ${idEmpresa}
    group by idEndereco, logradouro, numero;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    exibirOrganico,
    exibirReciclavel,
    obterEndereco,
};