const linha = document.getElementById('cvs_linha')
const rosca = document.getElementById('cvs_rosca')

function listarSensores(){
  idEndereco = sessionStorage.ID_ENDERECO

  fetch(`/especifica/listarSensores/${idEndereco}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum sensor encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          var Sensores = resposta;
          var Card = document.getElementById('Div_lista')
          var mensagem = ''

          mensagem = `<ul id="lista">`;

          
          for(var i = 0; i < Sensores.length; i++){
            
            preenchimentoAtual = Sensores[i].preenchimentoAtual

            if(preenchimentoAtual <= 25){
              mensagem += `<li onclick="Exibir(${Sensores[i].id})" > 
              <img src="../assets/LixeiraEstavelIcon.svg" alt="">
              ${Sensores[i].Sensor}<li>`


            }else if(preenchimentoAtual > 25 && preenchimentoAtual <= 50){
              mensagem += `<li onclick="Exibir(${Sensores[i].id})" > 
              <img src="../assets/LixeiraModeradaIcon.svg" alt="">
              ${Sensores[i].Sensor}<li>`


            }else if(preenchimentoAtual > 50 && preenchimentoAtual <= 75){
              mensagem += `<li onclick="Exibir(${Sensores[i].id})" > 
              <img src="../assets/LixeiraAlertaIcon.svg" alt="">
              ${Sensores[i].Sensor}<li>`


            }else{
              mensagem += `<li onclick="Exibir(${Sensores[i].id})" >
              <img src="../assets/LixeiraCriticaIcon.svg" alt="">
              ${Sensores[i].Sensor}<li>`

            }

          }

          mensagem += `</ul>`;
          
          Card.innerHTML = mensagem

          if(sessionStorage.ID_SENSOR == undefined){

            sessionStorage.ID_SENSOR = Sensores[0].id

          }

          detalhesSensor()
          dadosBruto() 
          MaioPreenchimento() 
          horarioPicoPreenchimento()
          graficos()

        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });


}

function detalhesSensor() {
  var idSensor = sessionStorage.ID_SENSOR;

  fetch(`/especifica/detalhes/${idSensor}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum dado encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          var kpi = resposta[0];
          var mensagem = "";

          document.getElementById("span_sensor").innerHTML += kpi.codigoSensor;
          document.getElementById("span_lixeira").innerHTML +=
            kpi.codigoLixeira;
          document.getElementById("span_status").innerHTML += kpi.status;
          document.getElementById("span_categoria").innerHTML += kpi.categoria;
          document.getElementById("titulo_pagina").innerHTML = kpi.codigoSensor;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });
}

function MaioPreenchimento() {
 var idSensor = sessionStorage.ID_SENSOR;

  fetch(`/especifica/MaioPreenchimento/${idSensor}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum dado encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          var kpi = resposta[0];
          var mensagem = "";

          mensagem = `${kpi.MaioPreenchimento}%`;

          document.getElementById("dado4").innerHTML = mensagem;

        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });
}

function horarioPicoPreenchimento() {
  var idSensor = sessionStorage.ID_SENSOR;

  fetch(`/especifica/horarioPicoPreenchimento/${idSensor}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum dado encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          var mensagem = "";

          var data1 = resposta[0];
          var data2 = resposta[1];

          mensagem += `${data1.horaColeta}h as ${data2.horaColeta}h`;

          document.getElementById("dado1").innerHTML = mensagem;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });
}



function dadosBruto() {
  var idSensor = sessionStorage.ID_SENSOR;
  var listaColetas = [];
  var kpi = [];

  fetch(`/especifica/dadosBruto/${idSensor}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum dado encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          kpi = resposta;

          for (var i = 0; i < kpi.length; i++) {
            let dadoBruto;
            var index;

            if (kpi[i].distancia <= 5) {
              if (i > 0) {
                index = i - 1;
              } else {
                continue;
              }

              dadoBruto = kpi[index].distancia;
              var dado = Number(dadoBruto).toFixed(0);

              if (listaColetas.length == 0) {
                listaColetas.push({
                  Dado: dado,
                  Quantidade: 1,
                });
              } else {
                var sucesso = 0;
                for (var j = 0; j < listaColetas.length; j++) {
                  if (listaColetas[j].Dado.includes(dado)) {
                    var index = j;

                    listaColetas[index].Quantidade =
                      listaColetas[index].Quantidade + 1;

                    sucesso++;
                  }
                }

                if (sucesso == 0) {
                  listaColetas.push({
                    Dado: dado,
                    Quantidade: 1,
                  });

                  j = listaColetas.length;
                }
              }
            }
          }

          if (!listaColetas.length){

            var padrao = 'PNE'

          }else {

            var Maior = listaColetas[0].Quantidade;

            for (var i = 1; i < listaColetas.length; i++) {
              var padrao = listaColetas[i].Dado;

              if (listaColetas[i].Quantidade >= Maior) {
                Maior = listaColetas[i].Quantidade;
              }
            }

          }

          document.getElementById("dado2").innerHTML = `${padrao}%`;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });
}

function graficos (){
  idSensor = sessionStorage.ID_SENSOR

  fetch(`/especifica/graficos/${idSensor}`)
  .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum dado encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          var dados = resposta
          var mensagem = "";

          new Chart(linha, {
  type: "line", // Tipo do gráfico: "line" (linha)
  data: {
    // Objeto que contém os dados e rótulos do gráfico
    labels: [
      dados[19].horaColeta,
      dados[18].horaColeta,
      dados[17].horaColeta,
      dados[16].horaColeta,
      dados[15].horaColeta,
      dados[14].horaColeta,
      dados[13].horaColeta,
      dados[12].horaColeta,
      dados[11].horaColeta,
      dados[10].horaColeta,
      dados[9].horaColeta,
      dados[8].horaColeta,
      dados[7].horaColeta,
      dados[6].horaColeta,
      dados[5].horaColeta,
      dados[4].horaColeta,
      dados[3].horaColeta,
      dados[2].horaColeta,
      dados[1].horaColeta,
      dados[0].horaColeta
    ],
    // "labels" define os rótulos do eixo X (cada valor do dataset corresponde a um label na mesma posição)
    datasets: [
      {
        // Vetor de conjuntos de dados. Mesmo que seja apenas 1 dataset, precisa ser um vetor
        label: "Nível de Preenchimento", // Nome do dataset — aparece na legenda
        data: [
            dados[19].distancia,
            dados[18].distancia,
            dados[17].distancia,
            dados[16].distancia,
            dados[15].distancia,
            dados[14].distancia,
            dados[13].distancia,
            dados[12].distancia,
            dados[11].distancia,
            dados[10].distancia,
            dados[9].distancia,
            dados[8].distancia,
            dados[7].distancia,
            dados[6].distancia,
            dados[5].distancia,
            dados[4].distancia,
            dados[3].distancia,
            dados[2].distancia,
            dados[1].distancia,
            dados[0].distancia
            ], // Valores numéricos do dataset (nesta ordem correspondem aos labels acima)
            fill: false, // Indica se a área abaixo da linha deve ser preenchida
            borderColor: "rgb(16, 183, 127)", // Cor da linha
            tension: 0.2, // Curvatura da linha: 0 = reta entre pontos, valores maiores = curvas mais suaves
          },
        ],
      },
      options: {
        // Configurações e opções do gráfico (layout, plugins, escalas, interatividade, etc.)
        responsive: true, // Faz o gráfico redimensionar automaticamente com o container
        plugins: {
          // Configurações para plugins nativos (legend, title, tooltip, etc.)
          legend: { display: true }, // Mostra a legenda (nome do dataset)
          title: {
            display: true,
            text: "Curva de Preenchimento - Reciclável",
            color: "black",
            font: { size: 15, weight: "bold", family: "Arial" },
          }, // Título do gráfico
          tooltip: {
            // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
            callbacks: {
              label: function (context) {
                // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
                return context.dataset.label + ": " + context.parsed.y + "%";
                // context.dataset.label = nome do dataset
                // context.parsed.y = valor do ponto no eixo y (para gráfico de linha)
              },
            },
          },
        },
        scales: {
          // Configuração das escalas (eixos x e y)
          y: {
            // Configuração do eixo Y
            beginAtZero: true, // Faz com que o eixo comece em zero
            max: 100, // Define o limite máximo como 100%
            ticks: {
              // Personaliza os ticks (rótulos) do eixo
              callback: function (value) {
                // Função chamada para renderizar cada tick no eixo
                return value + "%"; // Adiciona o símbolo '%' aos rótulos do eixo Y
              },
            },
            title: {
              // Título do eixo Y
              display: true,
              text: "Ocupação (%)",
              color: "rgb(4, 32, 13)",
              font: { size: 15, weight: "bold" },
            },
          },
          x: {
            title: {
              // Título do eixo X
              display: true,
              text: "Horário",
              color: "rgb(4, 32, 13)",
              font: { size: 15, weight: "bold" },
            },
          },
        },
      },
    });

    var preenchimentoAtual = dados[0].distancia

    if (preenchimentoAtual >= 0 && preenchimentoAtual <= 25) {
      cor1 = "rgb(29, 209, 9)";
    } else if (preenchimentoAtual >= 26 && preenchimentoAtual <= 50) {
      cor1 = "rgb(209, 206, 9)";
    } else if (preenchimentoAtual >= 51 && preenchimentoAtual <= 75) {
      cor1 = "rgb(209, 132, 9)";
    } else {
      cor1 = "rgb(209, 9, 9)";
    }

    const centerTextPlugin = {
      // Declara um objeto que será o plugin
      id: "centerText", // Identificador único do plugin (usado internamente pelo Chart.js)
      afterDraw(chart) {
        // Hook chamado "após" o Chart desenhar tudo (ideal para desenhar sobre o gráfico)
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        // Desestruturação: pega o contexto 2D (ctx) e as dimensões do "chartArea" (área de desenho útil)
        // ctx => objeto CanvasRenderingContext2D usado para desenhar texto/formas
        // width, height => largura/altura da área de desenho
        const dataset = chart.data.datasets[0]; // Acessa o primeiro dataset do gráfico (assumimos que o valor principal está aqui)
        const value = dataset.data[1]; // Pega o valor do segundo item do dataset (ex: 80 = 80%)
        // Ajuste fino de proporção — define tamanhos relativos de fonte com base no tamanho do gráfico
        const mainFontSize = Math.min(width, height) / 8; // Tamanho da fonte principal (porcentagem). Usa o menor lado para manter proporção.
        const subFontSize = Math.min(width, height) / 18; // Tamanho da fonte do subtítulo (legenda menor)
        ctx.save(); // Salva o estado atual do contexto (cores, fontes, alinhamentos) para restaurar depois
        ctx.textAlign = "center"; // Alinha o texto horizontalmente ao centro (para usar width/2)
        ctx.textBaseline = "middle"; // Alinha o texto verticalmente ao meio (para usar height/2)
        ctx.fillStyle = "#0a1911"; // Cor do texto (hex ou nome) — define a cor usada em fillText
        // Texto principal (porcentagem)
        ctx.font = `bold ${mainFontSize}px Arial`; // Define a fonte: peso 'bold', tamanho calculado dinamicamente e família 'Arial'
        ctx.fillText(value + "%", width / 2, height / 2 - subFontSize * 0.8);
        // Desenha o texto principal (ex: "80%") no centro horizontal (width/2)
        // A posição vertical é ajustada para ficar um pouco acima do centro (subFontSize * 0.8) para abrir espaço ao subtítulo
        // Subtítulo
        ctx.font = `bold ${subFontSize}px Arial`; // Fonte do subtítulo (um pouco menor)
        ctx.fillText(
          "Preenchimento atual",
          width / 2,
          height / 2 + mainFontSize * 0.5
        );
        // Desenha o subtítulo logo abaixo do número principal.
        // A posição vertical usa mainFontSize * 0.5 para garantir espaçamento proporcional.
        ctx.restore(); // Restaura o estado do contexto salvo por ctx.save()
        // Isso evita que alterações de fonte/alinhamento/cor afetem outros desenhos no canvas
      },
    };

    // Gráfico de Rosca do Preenchimento Atual de uma Lixeira Recicável
    /* Cria uma nova instância de Chart no canvas RoscaReciclavel.
          "new Chart(elemento, config)" é a forma padrão de inicializar um gráfico com Chart.js. */
    new Chart(rosca, {
      type: "doughnut", // Tipo do gráfico: "doughnut" (rosquinha).
      data: {
        // Objeto que contém os dados e rótulos do gráfico
        // labels: [ // "labels" define os rótulos das fatias
        //     "Vazio",
        //     "Ocupado"
        // ],
        datasets: [
          {
            // Vetor de conjuntos de dados. Mesmo que seja apenas 1 dataset, precisa ser um vetor
            label: "", // Nome do dataset — aparece na legenda e pode ser usado nos tooltips
            data: [100 - preenchimentoAtual, preenchimentoAtual], // Valores numéricos do dataset (ultimo1 = ultimo dado coletado do sensor, 100 - ultimo1 = porcentagem da lixeira vazia)
            backgroundColor: [
              // Cor de cada fatia do gráfico
              "rgb(240, 240, 240)", // Cor da fatia de espaço vazio na lixeira sempre será branco
              cor1, // Cor da fatia de ocupação da lixeira se altera dinamicamente
            ],
            hoverOffset: 4, // Efeito de crescimento da fatia ao passar o mouse por cima
          },
        ],
      },
      options: {
        // Configurações e opções do gráfico (layout, plugins, escalas, interatividade, etc.)
        responsive: true, // Faz o gráfico redimensionar automaticamente com o container
        cutout: "80%", // Espessura do gráfico de rosca, quanto maior mais fino o círculo
        plugins: {
          // Configurações para plugins nativos (legend, title, tooltip, etc.) ou criados
          legend: {
            position: "center",
            labels: {
              boxWidth: 15,
              font: { size: 12 },
            },
          }, // Mostra a legenda (nome do dataset)
          // title: {
          //     display: true,
          //     text: "Preenchimento Atual - Reciclável",
          //     color: "black",
          //     font: {size: 15, weight: "bold", family: "Arial"},
          // }, // Título do gráfico
          tooltip: {
            // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
            callbacks: {
              label: function (context) {
                // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
                // context.parsed = valor do dataset
                return " " + context.parsed + "%";
              },
            },
          },
        },
      },
      plugins: [centerTextPlugin], // Plugin criado para acrescentar a porcentagem de ocupação da lixeira no centro do gráfico
    });

  });
  
  } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });

}

function Exibir (Sensor){

  sessionStorage.ID_SENSOR = Sensor
  location.reload()
  
}
