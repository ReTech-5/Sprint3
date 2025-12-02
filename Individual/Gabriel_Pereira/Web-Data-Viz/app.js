// app.js
var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

// Apenas as rotas que você criou e existem
var lixeirasRouter = require("./src/routes/lixeiras"); 
// var registrosRouter = require("./src/routes/registros"); // <--- COMENTEI AQUI (Linha do erro)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Definindo as rotas
app.use("/lixeiras", lixeirasRouter);
// app.use("/registros", registrosRouter); // <--- COMENTEI AQUI TAMBÉM

app.listen(PORTA_APP, function () {
    console.log(`\nServidor ReTech rodando! Acesse: http://${HOST_APP}:${PORTA_APP}/view/dashboardGeral.html`);
});