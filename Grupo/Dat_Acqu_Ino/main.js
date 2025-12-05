// importa os bibliotecas necessários
const serialport = require('serialport'); // permite ler dados enviados pelo Arduino pela porta USB (serial)
const express = require('express'); //cria o servidor web (API REST) para expor os dados dos sensores
const mysql = require('mysql2'); // faz a conexão com o banco de dados MySQL

// constantes para configurações
const SERIAL_BAUD_RATE = 9600; // taxa de transmissão de dados (deve ser igual à configurada no Arduino)
const SERVIDOR_PORTA = 3300; // porta em que o servidor Express vai rodar

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true; // permite ligar/desligar a inserção de dados no banco

/* função para comunicação serial
Essa função é responsável por: 
- Localizar o Arduino
- Ler os dados enviados
- Processar os valores e, opcionalmente, inseri-los no banco */

const serial = async (
    valoresSensorHcsr04,

) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool( // Cria uma pool de conexões com o MySQL
        {
            host: 'localhost',
            user: 'retech_arduino',
            password: 'Techlixo123!',
            database: 'ReTech',
            port: 3307
        }
    ).promise(); // O .promise() permite usar 'await' para operações assíncronas

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list(); // Lista todas as portas seriais disponíveis
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43); // Filtra pela vendorId e productId típicos de Arduinos (2341:43 → geralmente um Arduino Uno)
    if (!portaArduino) { // Alerta de erro caso a porta serial não esteja disponível
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    ); // Abre a porta serial encontrada e define o baud rate

    // evento quando a porta serial é abertan
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    }); // É disparado quando a conexão serial é aberta com sucesso

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => { 
        // O .pipe() envia os dados recebidos para o ReadlineParser, que quebra as linhas pelo delimitador \r\n
        // O evento 'data' é chamado toda vez que uma nova linha de dados chega.
        console.log(data); // Exibe o dado recebido
        const valores = data.split(';'); // Divide a string por ; (caso venha mais de um valor)
        const dadoDistancia = parseFloat(valores[0]); // Converte o primeiro valor para número racional (parseFloat)

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorHcsr04.push((300 - dadoDistancia) / 300 * 100); // Armazena no array valoresSensorHcsr04

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            /* Inicio Simulação de Dados do Sensor 01 */

            // Sensor (Moderado) Multiplicadores entre 57 e 73 — Simulando Enchimento Estável

            await poolBancoDados.execute( // Insere na tabela Coleta a distância multiplicada por um valor (para variar os resultados)
                'INSERT INTO Coleta (distancia, fkSensor) VALUES (?, 1)',
                [dadoDistancia * 96]
            );
            console.log("valores inseridos no banco: ", dadoDistancia);


            await poolBancoDados.execute(
                'INSERT INTO Coleta (distancia, fkSensor) VALUES (?, 1)',
                [dadoDistancia * 80]
            );
            console.log("valores inseridos no banco: ", dadoDistancia);


            await poolBancoDados.execute(
                'INSERT INTO Coleta (distancia, fkSensor) VALUES (?, 1)',
                [dadoDistancia * 88]
            );
            console.log("valores inseridos no banco: ", dadoDistancia);


            await poolBancoDados.execute(
                'INSERT INTO Coleta (distancia, fkSensor) VALUES (?, 1)',
                [dadoDistancia * 77]
            );
            console.log("valores inseridos no banco: ", dadoDistancia);


        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorHcsr04,
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorHcsr04);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorHcsr04 = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorHcsr04,
    );

    // inicia o servidor web
    servidor(
        valoresSensorHcsr04,
    );
})();