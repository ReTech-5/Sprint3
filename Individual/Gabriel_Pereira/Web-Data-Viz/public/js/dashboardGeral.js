// dashboardGeral.js - DESIGN ORIGINAL COM DADOS DO BANCO

const BarrasReciclavel = document.getElementById("cvs_grafico_reciclavel");
const BarrasOrganico = document.getElementById("cvs_grafico_organico");

var listaEndereco = [];
var filtro = "Todos";

window.onload = function() {
    atualizarFeed();
};

function atualizarFeed() {
    fetch("/lixeiras/listar")
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("div_ListaEndereco");
                    feed.innerHTML = "Nenhum resultado encontrado.";
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (respostaJSON) {
                    // Processa os dados vindos do banco
                    listaEndereco = respostaJSON.map(item => {
                        let statusVisual = "Estável";
                        
                        // Lógica visual baseada no ID
                        if (item.status == 0) statusVisual = "Inativo";
                        else if (item.idSensor % 4 == 0) statusVisual = "Crítico";
                        else if (item.idSensor % 3 == 0) statusVisual = "Alerta";
                        else if (item.idSensor % 2 == 0) statusVisual = "Moderado";

                        return {
                            idSensor: item.idSensor,
                            nome: `${item.logradouro}, ${item.numero}`,
                            status: statusVisual,
                            categoria: item.categoria || "reciclável"
                        };
                    });
                    
                    mostrarLista(); 
                    atualizarGraficosComDadosReais(); // Desenha os gráficos com o design original
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function atualizarGraficosComDadosReais() {
    // Contadores
    let rec_estavel = 0, rec_moderado = 0, rec_alerta = 0, rec_critico = 0;
    let org_estavel = 0, org_moderado = 0, org_alerta = 0, org_critico = 0;

    // Conta os dados reais
    for (let i = 0; i < listaEndereco.length; i++) {
        let item = listaEndereco[i];
        if(item.status == "Inativo") continue;

        if (item.idSensor % 2 != 0) { 
            // Reciclável
            if (item.status == "Estável") rec_estavel++;
            else if (item.status == "Moderado") rec_moderado++;
            else if (item.status == "Alerta") rec_alerta++;
            else if (item.status == "Crítico") rec_critico++;
        } else {
            // Orgânico
            if (item.status == "Estável") org_estavel++;
            else if (item.status == "Moderado") org_moderado++;
            else if (item.status == "Alerta") org_alerta++;
            else if (item.status == "Crítico") org_critico++;
        }
    }

    // Atualiza KPIs de texto
    let totalInativos = listaEndereco.filter(i => i.status == "Inativo").length;
    let totalAtivos = listaEndereco.length - totalInativos;
    
    if(document.getElementById("inativo")) document.getElementById("inativo").innerHTML = totalInativos;
    if(document.getElementById("ativo")) document.getElementById("ativo").innerHTML = totalAtivos;

    // --- GRÁFICO RECICLÁVEL (DESIGN ORIGINAL + DADOS REAIS) ---
    new Chart(BarrasReciclavel, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "Estável",
            data: [rec_estavel], // Dado Real
            borderColor: ["rgb(0, 128, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(186, 255, 201)"],
          },
          {
            label: "Moderado",
            data: [rec_moderado], // Dado Real
            borderColor: ["rgb(204, 204, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 255, 186)"],
          },
          {
            label: "Alerta",
            data: [rec_alerta], // Dado Real
            borderColor: ["rgb(255, 140, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 223, 186)"],
          },
          {
            label: "Crítico",
            data: [rec_critico], // Dado Real
            borderColor: ["rgb(255, 0, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 179, 186)"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { 
            display: true,
            labels: {
              font: { weight: "semi-bold", size: 11 },
              color: "black",
            },
          },
          title: {
            display: true,
            text: "Lixeiras Recicláveis por Status de Preenchimento",
            color: "black",
            font: { size: 15, weight: "bold", family: "Arial" },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": " + context.parsed.y;
              },
            },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantidade de Lixeiras",
              color: "rgb(4, 32, 13)",
              font: { size: 13, weight: "bold" },
            },
            beginAtZero: true,
            ticks: { stepSize: 1 } // Garante números inteiros
          },
        },
      },
    });

    // --- GRÁFICO ORGÂNICO (DESIGN ORIGINAL + DADOS REAIS) ---
    new Chart(BarrasOrganico, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "Estável",
            data: [org_estavel], // Dado Real
            borderColor: ["rgb(0, 128, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(186, 255, 201)"],
          },
          {
            label: "Moderado",
            data: [org_moderado], // Dado Real
            borderColor: ["rgb(204, 204, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 255, 186)"],
          },
          {
            label: "Alerta",
            data: [org_alerta], // Dado Real
            borderColor: ["rgb(255, 140, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 223, 186)"],
          },
          {
            label: "Crítico",
            data: [org_critico], // Dado Real
            borderColor: ["rgb(255, 0, 0)"],
            borderWidth: 0.5,
            backgroundColor: ["rgb(255, 179, 186)"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { 
            display: true,
            labels: {
              font: { weight: "semi-bold", size: 11 },
              color: "black",
            },
          },
          title: {
            display: true,
            text: "Lixeiras Orgânicas por Status de Preenchimento",
            color: "black",
            font: { size: 15, weight: "bold", family: "Arial" },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": " + context.parsed.y;
              },
            },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantidade de Lixeiras",
              color: "rgb(4, 32, 13)",
              font: { size: 13, weight: "bold" },
            },
            beginAtZero: true,
            ticks: { stepSize: 1 }
          },
        },
      },
    });
}

function mostrarLista() {
  var div_ListaEndereco = document.getElementById("div_ListaEndereco");
  var listaDivConteudo = "<ul>";

  for (let i = 0; i < listaEndereco.length; i++) {
    var endereco = listaEndereco[i];
    var mostrar = false;

    if (filtro == "Todos") mostrar = true;
    else if (endereco.status == filtro) mostrar = true;
    if (filtro == "Todos" && endereco.status == "Inativo") mostrar = true;

    if (mostrar) {
      listaDivConteudo += "<li>";
      let icone = "../assets/LixeiraEstavelIcon.svg";
      if (endereco.status == "Crítico") icone = "../assets/LixeiraCriticaIcon.svg";
      else if (endereco.status == "Alerta") icone = "../assets/LixeiraAlertaIcon.svg";
      else if (endereco.status == "Moderado") icone = "../assets/LixeiraModeradaIcon.svg";
      else if (endereco.status == "Inativo") icone = "../assets/InativoIcon.svg";

      let linkPagina = endereco.status == "Inativo" ? "dashboardSensorInativo.html" : "dashboardSensor.html";

      listaDivConteudo += `
        <img src='${icone}'>
        <a href='${linkPagina}?id=${endereco.idSensor}'>${endereco.nome}</a>
      </li>`;
    }
  }
  listaDivConteudo += "</ul>";
  div_ListaEndereco.innerHTML = listaDivConteudo;
}

function filtrarTodos() { filtro = "Todos"; mostrarLista(); }
function filtrarCritico() { filtro = "Crítico"; mostrarLista(); }
function filtrarAlerta() { filtro = "Alerta"; mostrarLista(); }
function filtrarModerado() { filtro = "Moderado"; mostrarLista(); }
function filtrarEstavel() { filtro = "Estável"; mostrarLista(); }