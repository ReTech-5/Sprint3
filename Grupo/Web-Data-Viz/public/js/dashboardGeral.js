const BarrasReciclavel = document.getElementById("cvs_grafico_reciclavel");
const BarrasOrganico = document.getElementById("cvs_grafico_organico");

// Gráfico de Barras das Lixeiras Reciclaveis
new Chart(BarrasReciclavel, {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Estável",
        data: [4],
        borderColor: ["rgb(0, 128, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(186, 255, 201)"],
      },
      {
        label: "Moderado",
        data: [10],
        borderColor: ["rgb(204, 204, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 255, 186)"],
      },
      {
        label: "Alerta",
        data: [2],
        borderColor: ["rgb(255, 140, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 223, 186)"],
      },
      {
        label: "Crítico",
        data: [6],
        borderColor: ["rgb(255, 0, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 179, 186)"],
      },
    ],
  },
  options: {
    responsive: true, // Faz o gráfico redimensionar automaticamente com o container
    plugins: {
      // Configurações para plugins nativos (legend, title, tooltip, etc.)
      legend: { display: true , // Mostra a legenda (nome do dataset)
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
      }, // Título do gráfico
      tooltip: {
        // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
        callbacks: {
          label: function (context) {
            // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
            return context.dataset.label + ": " + context.parsed.y;
            // context.dataset.label = nome do dataset
            // context.parsed = valor do data do eixo y
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          // Título do eixo Y
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

// Gráfico de Barras das Lixeiras Orgânicas
new Chart(BarrasOrganico, {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Estável",
        data: [6],
        borderColor: ["rgb(0, 128, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(186, 255, 201)"],
      },
      {
        label: "Moderado",
        data: [10],
        borderColor: ["rgb(204, 204, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 255, 186)"],
      },
      {
        label: "Alerta",
        data: [4],
        borderColor: ["rgb(255, 140, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 223, 186)"],
      },
      {
        label: "Crítico",
        data: [2],
        borderColor: ["rgb(255, 0, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 179, 186)"],
      },
    ],
  },
  options: {
    responsive: true, // Faz o gráfico redimensionar automaticamente com o container
    plugins: {
      // Configurações para plugins nativos (legend, title, tooltip, etc.)
      legend: { display: true , // Mostra a legenda (nome do dataset)
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
      }, // Título do gráfico
      tooltip: {
        // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
        callbacks: {
          label: function (context) {
            // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
            return context.dataset.label + ": " + context.parsed.y;
            // context.dataset.label = nome do dataset
            // context.parsed = valor do data do eixo y
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          // Título do eixo Y
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

// Gráfico de Pizza dos Status das Lixeiras

var listaEndereco = [
  {
    nome: "Av. Lins de Vasconcelos",
    status: "Crítico",
  },
  {
    nome: "Av. Francisco Matarazzo",
    status: "Crítico",
  },
  {
    nome: "Rua Haddock Lobo",
    status: "Crítico",
  },
  {
    nome: "Rua Lomas Valentinas",
    status: "Crítico",
  },
  {
    nome: "Av. Cruzeiro do Sul",
    status: "Crítico",
  },
  {
    nome: "Rua Vergueiro",
    status: "Crítico",
  },
  {
    nome: "Av. Paulista",
    status: "Alerta",
  },
  {
    nome: "Rua Arnaldo Cintra",
    status: "Alerta",
  },
  {
    nome: "Av. Brigadeiro Faria Lima",
    status: "Alerta",
  },
  {
    nome: "Rua Oscar Freire",
    status: "Alerta",
  },
  {
    nome: "Av. João Dias",
    status: "Alerta",
  },
  {
    nome: "Rua José Paulino",
    status: "Alerta",
  },
  {
    nome: "Av. 23 de Maio",
    status: "Moderado",
  },
  {
    nome: "Rua Cardeal Arcoverde",
    status: "Moderado",
  },
  {
    nome: "Av. Ipiranga",
    status: "Moderado",
  },
  {
    nome: "Rua Heitor Penteado",
    status: "Moderado",
  },
  {
    nome: "Av. Ricardo Jafet",
    status: "Moderado",
  },
  {
    nome: "Rua Palestra Itália",
    status: "Moderado",
  },
  {
    nome: "Av. Avenida Sapopemba",
    status: "Estável",
  },
  {
    nome: "Av. Santo Amaro",
    status: "Estável",
  },
  {
    nome: "Av. dos Bandeirantes",
    status: "Estável",
  },
  {
    nome: "Rua da Consolação",
    status: "Estável",
  },
  {
    nome: "Av. Washington Luís",
    status: "Estável",
  },
  {
    nome: "Rua dos Três Irmãos",
    status: "Estável",
  },
];

var filtro = "Todos";

function mostrarLista() {
  var listaDivConteudo = "<ul>";

  var cont = 0;
  var tamanhoListaEndereco = listaEndereco.length;

  while (cont < tamanhoListaEndereco) {
    var endereco = listaEndereco[cont];
    var mostrar = false;

    if (filtro == "Todos" || endereco.status == filtro) {
      mostrar = true;
    }

    if (mostrar) {
      listaDivConteudo += "<li>";

      if (endereco.status == "Crítico") {
        listaDivConteudo += "<img src='../assets/LixeiraCriticaIcon.svg'>";
      } else if (endereco.status == "Alerta") {
        listaDivConteudo += "<img src='../assets/LixeiraAlertaIcon.svg'>";
      } else if (endereco.status == "Moderado") {
        listaDivConteudo += "<img src='../assets/LixeiraModeradaIcon.svg'>";
      } else if (endereco.status == "Estável") {
        listaDivConteudo += "<img src='../assets/LixeiraEstavelIcon.svg'>";
      }

      if (endereco.nome == "Av. Francisco Matarazzo") {
        listaDivConteudo +=
          "<a href='dashboardSensorInativo.html'>" +
          endereco.nome +
          "</a></li>";
      } else {
        listaDivConteudo +=
          "<a href='dashboardSensor.html'>" + endereco.nome + "</a></li>";
      }
    }

    cont++;
  }

  listaDivConteudo += "</ul>";

  div_ListaEndereco.innerHTML = listaDivConteudo;
}

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

filtrarCritico();