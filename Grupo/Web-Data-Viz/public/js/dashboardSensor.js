// dashboardSensor.js - VERSÃO FINAL: DADOS DO BANCO + DESIGN DE REFERÊNCIA

const urlParams = new URLSearchParams(window.location.search);
const idSensor = urlParams.get('id');

const tituloPagina = document.getElementById("titulo_pagina");
// Elementos de detalhes mantidos estáticos no HTML conforme solicitado

const LinhaReciclavel = document.getElementById("cvs_linhaReciclavel");
const RoscaReciclavel = document.getElementById("cvs_roscaReciclavel");


function obterDadosSensor() {
    fetch(`/lixeiras/${idSensor}`).then(res => {
        if (res.ok) {
            res.json().then(dados => {
                var sensor = dados[0];
                tituloPagina.innerHTML = `Grupo: ${sensor.logradouro}`;
            });
        }
    });
}

function obterDadosGrafico() {
     var idSensor = sessionStorage.ID_SENSOR

    fetch(`/lixeiras/medidas/${idSensor}`).then(res => {
        if (res.ok) {
            res.json().then(medidas => {
                plotarGrafico(medidas);
            });
        }
    });
}

function plotarGrafico(medidas) {
    // Processamento dos dados reais do banco
    medidas.reverse();
    var labels = [];
    var dados = [];

    for (var i = 0; i < medidas.length; i++) {
        labels.push(medidas[i].momento);
        dados.push(medidas[i].preenchimento);
    }
    
    // Pega o último valor real para a rosca
    var ultimoValor = dados.length > 0 ? dados[dados.length - 1] : 0;

    // --- LÓGICA DE CORES (Igual à referência) ---
    var corDestaque = "";
    if (ultimoValor >= 0 && ultimoValor <= 25) {
        corDestaque = "rgb(29, 209, 9)";
    } else if (ultimoValor >= 26 && ultimoValor <= 50) {
        corDestaque = "rgb(209, 206, 9)";
    } else if (ultimoValor >= 51 && ultimoValor <= 75) {
        corDestaque = "rgb(209, 132, 9)";
    } else {
        corDestaque = "rgb(209, 9, 9)";
    }

    // --- PLUGIN DE TEXTO CENTRAL (Copiado da referência) ---
    const centerTextPlugin = {
        id: "centerText",
        afterDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;
            const dataset = chart.data.datasets[0];
            const value = dataset.data[1]; // Valor de ocupação
            
            const mainFontSize = Math.min(width, height) / 8;
            const subFontSize = Math.min(width, height) / 18;
            
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#0a1911";
            
            ctx.font = `bold ${mainFontSize}px Arial`;
            ctx.fillText(value + "%", width / 2, height / 2 - subFontSize * 0.8);
            
            ctx.font = `bold ${subFontSize}px Arial`;
            ctx.fillText("Preenchimento atual", width / 2, height / 2 + mainFontSize * 0.5);
            
            ctx.restore();
        },
    };

    // --- GRÁFICO DE LINHA (Configurações da referência) ---
    new Chart(LinhaReciclavel, {
        type: "line",
        data: {
            labels: labels, // Dados do Banco
            datasets: [
                {
                    label: "Nível de Preenchimento",
                    data: dados, // Dados do Banco
                    fill: false,
                    borderColor: "rgb(16, 183, 127)",
                    tension: 0.2,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: {
                    display: true,
                    text: "Curva de Preenchimento",
                    color: "black",
                    font: { size: 15, weight: "bold", family: "Arial" },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ": " + context.parsed.y + "%";
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + "%";
                        },
                    },
                    title: {
                        display: true,
                        text: "Ocupação (%)",
                        color: "rgb(4, 32, 13)",
                        font: { size: 15, weight: "bold" },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Horário",
                        color: "rgb(4, 32, 13)",
                        font: { size: 15, weight: "bold" },
                    },
                },
            },
        },
    });

    // --- GRÁFICO DE ROSCA (Configurações da referência) ---
    new Chart(RoscaReciclavel, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    label: "",
                    data: [100 - ultimoValor, ultimoValor], // Dados reais
                    backgroundColor: [
                        "rgb(240, 240, 240)", // Fundo cinza
                        corDestaque, // Cor dinâmica
                    ],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            cutout: "80%",
            plugins: {
                legend: {
                    position: "center",
                    labels: {
                        boxWidth: 15,
                        font: { size: 12 },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " " + context.parsed + "%";
                        },
                    },
                },
            },
        },
        plugins: [centerTextPlugin],
    });
}

// Daqui para baixo eu que fiz quevedo !!!!!!!!!



function detalhesSensor(){

    var idSensor = sessionStorage.ID_SENSOR

    fetch(`/especifica/detalhes/${idSensor}`).then (function (resposta) {

    if (resposta.ok) {
      if (resposta.status == 204) {

        console.log('Nenhum dado encontrada')
        throw 'Nenhum resultado encontrado'

      }

      resposta.json().then(function (resposta) {

        console.log("Dados recebidos: ", JSON.stringify(resposta));
        var kpi = resposta[0]
        var mensagem = ''

        console.log(resposta)

        document.getElementById('span_sensor').innerHTML += kpi.codigoSensor
        document.getElementById('span_lixeira').innerHTML += kpi.codigoLixeira
        document.getElementById('span_status').innerHTML += kpi.status
        document.getElementById('span_categoria').innerHTML += kpi.categoria
        document.getElementById('titulo_pagina').innerHTML =  kpi.codigoSensor


        
      });

    }else {

      throw ('Houve um erro na API!');

    }
            
  })

  .catch(function (resposta) {

    console.error(resposta);
    
  });


}

function MaioPreenchimento (){

    var idSensor = sessionStorage.ID_SENSOR

    fetch(`/especifica/MaioPreenchimento/${idSensor}`).then (function (resposta) {

    if (resposta.ok) {
      if (resposta.status == 204) {

        console.log('Nenhum dado encontrada')
        throw 'Nenhum resultado encontrado'

      }

      resposta.json().then(function (resposta) {

        console.log("Dados recebidos: ", JSON.stringify(resposta));
        var kpi = resposta[0]
        var mensagem = ''

        console.log(resposta)

        mensagem = `${kpi.MaioPreenchimento}%`

        document.getElementById('dado4').innerHTML = mensagem
        
      });

    }else {

      throw ('Houve um erro na API!');

    }
            
  })

  .catch(function (resposta) {

    console.error(resposta);
    
  });


}

function horarioPicoPreenchimento (){

    var idSensor = sessionStorage.ID_SENSOR

    fetch(`/especifica/horarioPicoPreenchimento/${idSensor}`).then (function (resposta) {

    if (resposta.ok) {
      if (resposta.status == 204) {

        console.log('Nenhum dado encontrada')
        throw 'Nenhum resultado encontrado'

      }

      resposta.json().then(function (resposta) {

        console.log("Dados recebidos: ", JSON.stringify(resposta));
        var mensagem = ''
            
            var data1 = resposta[0]
            var data2 = resposta[1]

            mensagem += `${data1.horaColeta}h as ${data2.horaColeta}h`
            
        
       

        document.getElementById('dado1').innerHTML = mensagem
        


      });

    }else {

      throw ('Houve um erro na API!');

    }
            
  })

  .catch(function (resposta) {

    console.error(resposta);
    
  });


}

var listaColetas = [];
var kpi = []

function dadosBruto (){
    
    var idSensor = sessionStorage.ID_SENSOR

    fetch(`/especifica/dadosBruto/${idSensor}`).then (function (resposta) {

    if (resposta.ok) {
      if (resposta.status == 204) {

        console.log('Nenhum dado encontrada')
        throw 'Nenhum resultado encontrado'

      }

      resposta.json().then(function (resposta) {

        console.log("Dados recebidos: ", JSON.stringify(resposta));
        console.log(resposta[0])

        kpi = resposta 

        for(var i = 0; i < kpi.length; i++){
          
          let dadoBruto
          var index

            if (kpi[i].distancia == 0){
              
              if (i > 0){
                
                index = i - 1

              }else {

                index = i

              }

                dadoBruto = kpi[index].distancia
                var dado = Number(dadoBruto).toFixed(0)

                if(listaColetas.length == 0){

                    listaColetas.push({
                        Dado: dado,
                        Quantidade: 1
                    })

                }else {
                    
                    var sucesso = 0
                    for (var j = 0; j < listaColetas.length; j++){

                        if(listaColetas[j].Dado.includes(dado)){
                            
                            var index = j
            
                            listaColetas[index].Quantidade = listaColetas[index].Quantidade + 1

                            sucesso++
            
                        }  

                    } 
                    
                    if (sucesso == 0 ){

                        listaColetas.push({
                            Dado: dado,
                            Quantidade: 1
                        })

                        j = listaColetas.length
                    }

                }

            }
       
        }

            
        
        var Maior = listaColetas[0].Quantidade

        for(var i = 1; i < listaColetas.length; i++){
          
          var padrao = listaColetas[i].Dado
          
            if (listaColetas[i].Quantidade >= Maior){
              Maior = listaColetas[i].Quantidade
            }
                
        }
          
          
          console.log(padrao)
          document.getElementById('dado2').innerHTML = `${padrao}%`
          
          
      });

    }else {

      throw ('Houve um erro na API!');

    }
            
  })

  .catch(function (resposta) {

    console.error(resposta);
    
  });


}

function atualizarFeed() {
  fetch("/sensor/listarEnderecos")
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      }
      throw "Erro ao buscar sensores";
    })
    .then(function (respostaJSON) {
      console.log("📦 DADOS RECEBIDOS -> ", respostaJSON);

      listaEndereco = respostaJSON.map((item) => {
        let statusVisual = "Estável";

        if (item.status == 0) statusVisual = "Inativo";
        else if (item.status == 1) statusVisual = "Estável";
        else if (item.status == 2) statusVisual = "Moderado";
        else if (item.status == 3) statusVisual = "Alerta";
        else if (item.status == 4) statusVisual = "Crítico";

        return {
          idSensor: item.idSensor,
          idEndereco: item.idEndereco,
          nome: `${item.codigoSensor}`,
          status: statusVisual,
          categoria: item.categoria || "Reciclável",
        };
      });

      mostrarListaSensores();
    })
    .catch(function (resposta) {
      console.error("❌ ERRO:", resposta);
    });
}

var listaEndereco = [];

function mostrarListaSensores() {
  var div_ListaEndereco = document.getElementById("div_ListaEndereco");
  var listaDivConteudo = "<ul>";
  var id = sessionStorage.ID_ENDERECO; // ex: 1

  // percorre todos os sensores
  for (let i = 0; i < listaEndereco.length; i++) {

    // pega SOMENTE sensores com o idEndereco desejado
    if (listaEndereco[i].idEndereco == id) {
      var endereco = listaEndereco[i];

      // ícones correspondentes ao status
      let icone = "../assets/LixeiraEstavelIcon.svg";
      if (endereco.status == "Crítico") icone = "../assets/LixeiraCriticaIcon.svg";
      else if (endereco.status == "Alerta") icone = "../assets/LixeiraAlertaIcon.svg";
      else if (endereco.status == "Moderado") icone = "../assets/LixeiraModeradaIcon.svg";
      else if (endereco.status == "Inativo") icone = "../assets/InativoIcon.svg";

      // adiciona na lista SEM REPETIR
      listaDivConteudo += `
        <li>
            <img src='${icone}'>
            <span class='ListaSensor' onclick='Exibir(${endereco.idSensor})'>${endereco.nome}</span>
        </li>
      `;
    }
  }

  listaDivConteudo += "</ul>";
  lista.innerHTML = listaDivConteudo;

}

function Exibir(idSensor) {


    sessionStorage.ID_SENSOR = idSensor
    location.reload()

    
}
