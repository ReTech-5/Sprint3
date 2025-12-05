var database = require("../database/config")

function obterDetalhes(Sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosKPI():");

    var instrucaoSql = `
    SELECT codigoSensor, codigoLixeira, categoria, status FROM Sensor
        where idSensor = ${Sensor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

function ObterMaioPreenchimento(Sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosKPI():");

    var instrucaoSql = `
    select max(distancia) as MaioPreenchimento from Coleta
    join Sensor
        on fkSensor = idSensor
    where dataColeta >= date_sub(curdate(), interval 7 day)
        and dataColeta < curdate()
        and fkSensor = ${Sensor};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

function ObterhorarioPicoPreenchimento(Sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosKPI():");

    var instrucaoSql = `
    select distinct time_format(horaColeta, '%H') as horaColeta , count(horaColeta) as vezesPico 
    from Coleta
    where dataColeta >= date_sub(curdate(), interval 90 day)
        and dataColeta < curdate() 
        and distancia > (select avg(distancia) from Coleta where fkSensor = 1)
        and fkSensor = ${Sensor}
    group by horaColeta
        order by vezesPico asc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

function ObterdadosBruto(Sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosKPI():");

    var instrucaoSql = `
    select dataColeta, horaColeta, distancia from Coleta
	where dataColeta >= date_sub(curdate(), interval 30 day)
        and dataColeta < curdate()
        and fkSensor = ${Sensor}
    order by dataColeta desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}


module.exports = {
    ObterMaioPreenchimento,
    ObterhorarioPicoPreenchimento,
    ObterdadosBruto,
    obterDetalhes
};