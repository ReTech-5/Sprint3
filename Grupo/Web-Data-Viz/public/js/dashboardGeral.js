// dashboardGeral.js - DADOS REAIS DO BANCO + GRÁFICOS + LISTA FUNCIONANDO

const BarrasReciclavel = document.getElementById("cvs_grafico_reciclavel");
const BarrasOrganico = document.getElementById("cvs_grafico_organico");

// var listaEndereco = [];
var filtro = "Critico";

// window.onload = function () {
//   atualizarFeed();
//   alertasCriticos();
//   alertasInativos();
// };

// /* ------------------ BUSCA NO BANCO ------------------ */

// function atualizarFeed() {
//   fetch("/sensor/listarEnderecos")
//     .then(function (resposta) {
//       if (resposta.ok) {
//         return resposta.json();
//       }
//       throw "Erro ao buscar Endereco";
//     })
//     .then(function (respostaJSON) {
//       console.log("📦 DADOS RECEBIDOS -> ", respostaJSON);

//       listaEndereco = respostaJSON.map((item) => {
//         let statusVisual = "Estável";

//         if (item.status == 0) statusVisual = "Inativo";
//         else if (item.status == 1) statusVisual = "Estável";
//         else if (item.status == 2) statusVisual = "Moderado";
//         else if (item.status == 3) statusVisual = "Alerta";
//         else if (item.status == 4) statusVisual = "Crítico";

//         return {
//           idSensor: item.idSensor,
//           idEndereco: item.idEndereco,
//           nome: `${item.logradouro}, ${item.numero}`,
//           status: statusVisual,
//           categoria: item.categoria || "Reciclável",
//         };
//       });

//       mostrarLista();
//       atualizarGraficosComDadosReais();
//     })
//     .catch(function (resposta) {
//       console.error("❌ ERRO:", resposta);
//     });
// }

// /* ------------------ GRÁFICOS ------------------ */

// // function atualizarGraficosComDadosReais() {
// //   let rec_estavel = 0,
// //     rec_moderado = 0,
// //     rec_alerta = 0,
// //     rec_critico = 0;
// //   let org_estavel = 0,
// //     org_moderado = 0,
// //     org_alerta = 0,
// //     org_critico = 0;

// //   for (let i = 0; i < listaEndereco.length; i++) {
// //     let item = listaEndereco[i];
// //     if (item.status == "Inativo") continue;

// //     const reciclavel =
// //       item.categoria && item.categoria.toLowerCase().includes("recicl");

// //     if (reciclavel) {
// //       if (item.status == "Estável") rec_estavel++;
// //       else if (item.status == "Moderado") rec_moderado++;
// //       else if (item.status == "Alerta") rec_alerta++;
// //       else if (item.status == "Crítico") rec_critico++;
// //     } else {
// //       if (item.status == "Estável") org_estavel++;
// //       else if (item.status == "Moderado") org_moderado++;
// //       else if (item.status == "Alerta") org_alerta++;
// //       else if (item.status == "Crítico") org_critico++;
// //     }
// //   }

// //   let totalInativos = listaEndereco.filter((i) => i.status == "Inativo").length;
// //   let totalAtivos = listaEndereco.length - totalInativos;

// //   document.getElementById("inativo").innerHTML = totalInativos;
// //   document.getElementById("ativo").innerHTML = totalAtivos;
// // }

// /* ------------------ LISTA NA TELA ------------------ */

// var listaUnique = [];

// function mostrarLista() {
//   var div_ListaEndereco = document.getElementById("div_ListaEndereco");
//   var listaDivConteudo = "<ul>";

//   for (let i = 0; i < listaEndereco.length; i++) {
//     let itemAtual = listaEndereco[i];
//     let existe = false;

//     for (let j = 0; j < listaUnique.length; j++) {
//       if (listaUnique[j].nome === itemAtual.nome) {
//         existe = true;
//         break;
//       }
//     }

//     if (!existe) {
//       listaUnique.push(itemAtual);
//     }
//   }

//   for (let i = 0; i < listaUnique.length; i++) {
//     var endereco = listaUnique[i];

//     var mostrar = false;
//     if (filtro == "Todos") mostrar = true;
//     else if (endereco.status == filtro) mostrar = true;

//     if (mostrar) {
//       let icone = "../assets/LixeiraEstavelIcon.svg";
//       if (endereco.status == "Crítico")
//         icone = "../assets/LixeiraCriticaIcon.svg";
//       else if (endereco.status == "Alerta")
//         icone = "../assets/LixeiraAlertaIcon.svg";
//       else if (endereco.status == "Moderado")
//         icone = "../assets/LixeiraModeradaIcon.svg";
//       else if (endereco.status == "Inativo")
//         icone = "../assets/InativoIcon.svg";

//       listaDivConteudo += `
//         <li>
//             <img src='${icone}'>
//             <span class='ListaSensor' onclick="Especifica(${endereco.idEndereco}, ${endereco.idSensor})" >${endereco.nome}</span>
//         </li>
//       `;
//     }
//   }

//   listaDivConteudo += "</ul>";
//   div_ListaEndereco.innerHTML = listaDivConteudo;
// }

/* ------------------ FILTROS ------------------ */

function filtrarTodos() {
  filtro = "Todos";
  mostrarLista();
}
function filtrarCritico() {
  filtro = "Critico";
  mostrarLista();
}
function filtrarAlerta() {
  filtro = "Alerta";
  mostrarLista();
}
function filtrarModerado() {
  filtro = "Moderado";
  mostrarLista();
}
function filtrarEstavel() {
  filtro = "Estavel";
  mostrarLista();
}

/* ------------------ ALERTAS ------------------ */

function alertasInativos() {
  var mensagem = "";
  fetch(`/sensor/exibirInativos?fkEmpresa=${sessionStorage.FK_EMPRESA}`)
    .then((response) => response.json())
    .then((resultado) => {
      resultado.forEach((resultado) => {
        mensagem = `
          <div class="notificacao container">
              <img src="../assets/ErroIcon.svg" alt="">
              <span>${resultado.codigoSensor} - ${resultado.logradouro} sem resposta</span>
          </div>
        `;
        div_alertas.innerHTML += mensagem;
      });
    });
}

function alertasCriticos() {
  var mensagem = "";
  fetch(`/sensor/exibirCriticos?fkEmpresa=${sessionStorage.FK_EMPRESA}`)
    .then((response) => response.json())
    .then((resultado) => {
      resultado.forEach((resultado) => {
        mensagem = `
          <div class="notificacao container">
              <img src="../assets/LixeiraCriticaIcon.svg" alt="">
              <span>${resultado.codigoLixeira} - ${resultado.logradouro} se encontra em estado crítico</span>
          </div>
        `;
        div_alertas.innerHTML += mensagem;
      });
    });
}

/* ------------------ GRÁFICOS ------------------ */

var metricasOrganico = [0, 0, 0, 0];
var metricasReciclavel = [0, 0, 0, 0];

var organicoExiste = null;
var reciclavelExiste = null;

function graficoOrganico() {
  fetch(`/geral/dadosDashboardOrganica?fkEmpresa=${sessionStorage.FK_EMPRESA}`)
    .then((response) => response.json())
    .then((resultado) => {
      metricasOrganico = [0, 0, 0, 0];

      for (var i = 0; i < resultado.length; i++) {
        var distancia = Number(resultado[i].distancia);
        if (distancia < 26) {
          metricasOrganico[0]++;
        } else if (distancia < 51) {
          metricasOrganico[1]++;
        } else if (distancia < 76) {
          metricasOrganico[2]++;
        } else if (distancia <= 100) {
          metricasOrganico[3]++;
        }
      }

      criarGraficoOrganico();
    })
    .catch((error) => {
      console.error("Erro ao obter os dados dos gráficos: ", error);
    });
}

function graficoReciclavel() {
  fetch(
    `/geral/dadosDashboardReciclavel?fkEmpresa=${sessionStorage.FK_EMPRESA}`
  )
    .then((response) => response.json())
    .then((resultado) => {
      metricasReciclavel = [0, 0, 0, 0];

      for (var i = 0; i < resultado.length; i++) {
        var distancia = Number(resultado[i].distancia);
        if (distancia < 26) {
          metricasReciclavel[0]++;
        } else if (distancia < 51) {
          metricasReciclavel[1]++;
        } else if (distancia < 76) {
          metricasReciclavel[2]++;
        } else if (distancia <= 100) {
          metricasReciclavel[3]++;
        }
      }

      criarGraficoReciclavel();
    })
    .catch((error) => {
      console.error("Erro ao obter os dados dos gráficos: ", error);
    });
}

function criarGraficoOrganico() {
  if (organicoExiste != null) {
    organicoExiste.destroy();
  }

  organicoExiste = new Chart(BarrasReciclavel, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Estável",
          data: [metricasOrganico[0]],
          borderColor: ["rgb(0, 128, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(186, 255, 201)"],
        },
        {
          label: "Moderado",
          data: [metricasOrganico[1]],
          borderColor: ["rgb(204, 204, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 255, 186)"],
        },
        {
          label: "Alerta",
          data: [metricasOrganico[2]],
          borderColor: ["rgb(255, 140, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 223, 186)"],
        },
        {
          label: "Crítico",
          data: [metricasOrganico[3]],
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
            font: {
              weight: "semi-bold",
              size: 11,
            },
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
        },
      },
    },
  });
}

function criarGraficoReciclavel() {
  if (reciclavelExiste != null) {
    reciclavelExiste.destroy();
  }

  reciclavelExiste = new Chart(BarrasOrganico, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Estável",
          data: [metricasReciclavel[0]],
          borderColor: ["rgb(0, 128, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(186, 255, 201)"],
        },
        {
          label: "Moderado",
          data: [metricasReciclavel[1]],
          borderColor: ["rgb(204, 204, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 255, 186)"],
        },
        {
          label: "Alerta",
          data: [metricasReciclavel[2]],
          borderColor: ["rgb(255, 140, 0)"],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 223, 186)"],
        },
        {
          label: "Crítico",
          data: [metricasReciclavel[3]],
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
            font: {
              weight: "semi-bold",
              size: 11,
            },
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
        },
      },
    },
  });
}

function listarEnderecos() {
  Empresa = sessionStorage.FK_EMPRESA;

  fetch(`/geral/listarEndereco/${Empresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum sensor encontrada");
          throw "Nenhum resultado encontrado";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          
          var Endereco = resposta
          var Card = document.getElementById("div_ListaEndereco");
          var mensagem = "";

          mensagem = `<ul id="listaEndereco">`;

          console.log(Endereco.length)

          for (var i = 0; i < Endereco.length; i++) {
            var preenchimentoAtual = Endereco[i].preenchimentoAtual;

            if (preenchimentoAtual <= 25) {
              mensagem += `<li class="Endereco Estavel" onclick="limparDados(), abrir(${Endereco[i].idEndereco})" > 
              <img src="../assets/LixeiraEstavelIcon.svg" alt="">
              ${Endereco[i].logradouro}, ${Endereco[i].numero}</li>`;
            } else if (preenchimentoAtual > 25 && preenchimentoAtual <= 50) {
              mensagem += `<li class="Endereco Moderado" onclick="limparDados(), abrir(${Endereco[i].idEndereco})" > 
              <img src="../assets/LixeiraModeradaIcon.svg" alt="">
              ${Endereco[i].logradouro}, ${Endereco[i].numero}</li>`;
            } else if (preenchimentoAtual > 50 && preenchimentoAtual <= 75) {
              mensagem += `<li class="Endereco Alerta" onclick="limparDados(), abrir(${Endereco[i].idEndereco})" > 
              <img src="../assets/LixeiraAlertaIcon.svg" alt="">
              ${Endereco[i].logradouro}, ${Endereco[i].numero}</li>`;
            } else {
              mensagem += `<li class="Endereco Critico" onclick="limparDados(), abrir(${Endereco[i].idEndereco})" >
              <img src="../assets/LixeiraCriticaIcon.svg" alt="">
              ${Endereco[i].logradouro}, ${Endereco[i].numero}</li>`;
            }
          }

          mensagem += `</ul>`;

          Card.innerHTML = mensagem;
          mostrarLista();
          
        });
      } else {
        throw "Houve um erro na API!";
      }
    })

    .catch(function (resposta) {
      console.error(resposta);
    });
}

function abrir(idEndereco) {
  sessionStorage.ID_ENDERECO = idEndereco
  window.location = 'dashboardSensor.html'

}

function mostrarLista() {
  if (filtro == "Todos") {
    var classes = ['Estavel', 'Moderado', 'Alerta', 'Critico'];

    // Itera sobre cada classe
    classes.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'flex';
      }
    });

  }else if (filtro == "Estavel") {
    var classesOcultas = ['Moderado', 'Alerta', 'Critico'];
    var classesExpostas = ['Estavel'];

    // Itera sobre cada classe
    classesOcultas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'none';
      }
    });

    classesExpostas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'flex';
      }
    });

  }else if (filtro == "Moderado") {
    var classesOcultas = ['Estavel', 'Alerta', 'Critico'];
    var classesExpostas = ['Moderado'];

    // Itera sobre cada classe
    classesOcultas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'none';
      }
    });

    classesExpostas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'flex';
      }
    });

  }else if (filtro == "Alerta") {
    var classesOcultas = ['Estavel', 'Moderado', 'Critico'];
    var classesExpostas = ['Alerta'];

    // Itera sobre cada classe
    classesOcultas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'none';
      }
    });

    classesExpostas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'flex';
      }
    });
  }else if (filtro == "Critico") {
    var classesOcultas = ['Estavel', 'Moderado', 'Alerta'];
    var classesExpostas = ['Critico'];

    // Itera sobre cada classe
    classesOcultas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'none';
      }
    });

    classesExpostas.forEach(className => {

      var enderecos = document.getElementsByClassName(className);

      for (let i = 0; i < enderecos.length; i++) {
        enderecos[i].style.display = 'flex';
      }
    });
  }

}

function limparDados() {

  sessionStorage.removeItem('ID_ENDERECO')
  sessionStorage.removeItem('ID_SENSOR')

}

function atualizarOrganico() {
  graficoOrganico();

  setTimeout(atualizarOrganico, 60000);
}

function atualizarReciclavel() {
  graficoReciclavel();

  setTimeout(atualizarReciclavel, 60000);
}

function atualizarAlertas() {
  div_alertas.innerHTML = `<div class="title card_title"><h4>Alertas</h4></div>`;
  alertasInativos();
  alertasCriticos();

  setTimeout(atualizarAlertas, 60000);
}

atualizarOrganico();
atualizarReciclavel();
atualizarAlertas();