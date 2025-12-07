sessionStorage.ID_ENDERECO = 4;

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

        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });


}

function limparDados() {

  sessionStorage.removeItem('ID_ENDERECO')
  sessionStorage.removeItem('ID_SENSOR')

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

function Exibir (Sensor){

  sessionStorage.ID_SENSOR = Sensor
  location.reload()
  
}
