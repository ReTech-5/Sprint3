// dashboardGeral.js - DESIGN ORIGINAL COM DADOS DO BANCO

const BarrasReciclavel = document.getElementById("cvs_grafico_reciclavel");
const BarrasOrganico = document.getElementById("cvs_grafico_organico");

var listaEndereco = [];
var filtro = "Todos";

window.onload = function () {
  atualizarFeed();
  alertasCriticos();
  alertasInativos();
};

// FUNÇÃO PRINCIPAL — BUSCA DO BANCO
function atualizarFeed() {
  fetch("/sensor/listarEnderecos")
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("div_ListaEndereco");
          feed.innerHTML = "Nenhum resultado encontrado.";
          throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (respostaJSON) {
          // Processa os dados vindos do banco
          listaEndereco = respostaJSON.map((item) => {
            let statusVisual = "Estável";

            // STATUS REAL DO BANCO
            if (item.status == 0) statusVisual = "Inativo";
            else if (item.status == 1) statusVisual = "Estável";
            else if (item.status == 2) statusVisual = "Moderado";
            else if (item.status == 3) statusVisual = "Alerta";
            else if (item.status == 4) statusVisual = "Crítico";

            return {
              idSensor: item.idSensor,
              nome: `${item.logradouro}, ${item.numero}`,
              status: statusVisual,
              categoria: item.categoria || "reciclável",
            };
          });

          mostrarLista();
          atualizarGraficosComDadosReais();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

// GRÁFICOS (REAL DO BD)
function atualizarGraficosComDadosReais() {
  let rec_estavel = 0,
    rec_moderado = 0,
    rec_alerta = 0,
    rec_critico = 0;
  let org_estavel = 0,
    org_moderado = 0,
    org_alerta = 0,
    org_critico = 0;

  for (let i = 0; i < listaEndereco.length; i++) {
    let item = listaEndereco[i];
    if (item.status == "Inativo") continue;

    const reciclavel = item.categoria && item.categoria.toLowerCase().includes("recicl");

    if (reciclavel) {
      if (item.status == "Estável") rec_estavel++;
      else if (item.status == "Moderado") rec_moderado++;
      else if (item.status == "Alerta") rec_alerta++;
      else if (item.status == "Crítico") rec_critico++;
    } else {
      if (item.status == "Estável") org_estavel++;
      else if (item.status == "Moderado") org_moderado++;
      else if (item.status == "Alerta") org_alerta++;
      else if (item.status == "Crítico") org_critico++;
    }
  }

  let totalInativos = listaEndereco.filter((i) => i.status == "Inativo").length;
  let totalAtivos = listaEndereco.length - totalInativos;

  document.getElementById("inativo").innerHTML = totalInativos;
  document.getElementById("ativo").innerHTML = totalAtivos;

  new Chart(BarrasReciclavel, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Estável",
          data: [rec_estavel],
          borderWidth: 0.5,
          backgroundColor: ["rgb(186, 255, 201)"],
        },
        {
          label: "Moderado",
          data: [rec_moderado],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 255, 186)"],
        },
        {
          label: "Alerta",
          data: [rec_alerta],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 223, 186)"],
        },
        {
          label: "Crítico",
          data: [rec_critico],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 179, 186)"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    },
  });

  new Chart(BarrasOrganico, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Estável",
          data: [org_estavel],
          borderWidth: 0.5,
          backgroundColor: ["rgb(186, 255, 201)"],
        },
        {
          label: "Moderado",
          data: [org_moderado],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 255, 186)"],
        },
        {
          label: "Alerta",
          data: [org_alerta],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 223, 186)"],
        },
        {
          label: "Crítico",
          data: [org_critico],
          borderWidth: 0.5,
          backgroundColor: ["rgb(255, 179, 186)"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    },
  });
}

// LISTA NA TELA
function mostrarLista() {
  var div_ListaEndereco = document.getElementById("div_ListaEndereco");
  var listaDivConteudo = "<ul>";

  for (let i = 0; i < listaEndereco.length; i++) {
    var endereco = listaEndereco[i];
    var mostrar = false;

    if (filtro == "Todos") mostrar = true;
    else if (endereco.status == filtro) mostrar = true;

    if (mostrar) {
      listaDivConteudo += "<li>";

      let icone = "../assets/LixeiraEstavelIcon.svg";
      if (endereco.status == "Crítico") icone = "../assets/LixeiraCriticaIcon.svg";
      else if (endereco.status == "Alerta") icone = "../assets/LixeiraAlertaIcon.svg";
      else if (endereco.status == "Moderado") icone = "../assets/LixeiraModeradaIcon.svg";
      else if (endereco.status == "Inativo") icone = "../assets/InativoIcon.svg";

      let linkPagina =
        endereco.status == "Inativo"
          ? "dashboardSensorInativo.html"
          : "dashboardSensor.html";

      listaDivConteudo += `
        <img src='${icone}'>
        <a href='${linkPagina}?id=${endereco.idSensor}'>${endereco.nome}</a>
      </li>`;
    }
  }
  listaDivConteudo += "</ul>";
  div_ListaEndereco.innerHTML = listaDivConteudo;
}

// FILTROS
function filtrarTodos() {
  filtro = "Todos";
  mostrarLista();
}
function filtrarCritico() {
  filtro = "Crítico";
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
  filtro = "Estável";
  mostrarLista();
}

// ALERTAS
function alertasInativos() {
  var mensagem = "";
  fetch(`/sensor/exibirInativos?fkEmpresa=${sessionStorage.FK_EMPRESA}`)
    .then((response) => response.json())
    .then((resultado) => {
      resultado.forEach((resultado) => {
        mensagem = `
          <div class="notificacao container">
              <img src="../assets/ErroIcon.svg" alt="">
              <span>Sensor ${resultado.codigoSensor} - ${resultado.logradouro} sem resposta</span>
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
              <span>Lixeira ${resultado.codigoLixeira} - ${resultado.logradouro} se encontra em estado crítico</span>
          </div>
        `;
        div_alertas.innerHTML += mensagem;
      });
    });
}
