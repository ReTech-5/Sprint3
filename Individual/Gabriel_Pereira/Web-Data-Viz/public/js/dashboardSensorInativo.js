// dashboardSensorInativo.js ADAPTADO PARA API

// 1. Captura o ID da URL (ex: dashboardSensorInativo.html?id=3)
const urlParams = new URLSearchParams(window.location.search);
const idSensor = urlParams.get('id');

// Elementos HTML para preencher
const tituloGrupo = document.getElementById("titulo_grupo");
const spanCategoria = document.getElementById("span_categoria");
const spanSensor = document.getElementById("span_sensor");

// Gráficos
const LinhaReciclavel = document.getElementById("cvs_linhaReciclavel");
const RoscaReciclavel = document.getElementById("cvs_roscaReciclavel");

// Inicia o processo
if (idSensor) {
    obterDadosSensor();
    obterDadosGrafico();
} else {
    tituloGrupo.innerHTML = "Sensor não identificado";
}

// Função 1: Busca os dados cadastrais (Endereço, Código, Categoria)
function obterDadosSensor() {
    fetch(`/lixeiras/${idSensor}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(dados => {
                    const sensor = dados[0];
                    // Atualiza o HTML com os dados do banco
                    tituloGrupo.innerHTML = `Grupo: ${sensor.logradouro} (Inativo)`;
                    spanCategoria.innerHTML = sensor.categoria;
                    spanSensor.innerHTML = sensor.codigoSensor;
                });
            } else {
                console.error("Erro ao buscar dados do sensor");
            }
        })
        .catch(erro => console.error(erro));
}

// Função 2: Busca as medidas (Mesmo inativo, pode ter histórico)
function obterDadosGrafico() {
    fetch(`/lixeiras/medidas/${idSensor}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(medidas => {
                    plotarGrafico(medidas);
                });
            } else {
                // Se não tiver medidas (comum em sensores novos ou muito antigos), plota vazio
                console.log("Sem medidas encontradas.");
                plotarGrafico([]);
            }
        })
        .catch(erro => console.error(erro));
}

function plotarGrafico(medidas) {
    // Inverte para ordem cronológica
    medidas.reverse();

    var labels = [];
    var dados = [];

    for (var i = 0; i < medidas.length; i++) {
        labels.push(medidas[i].momento);
        dados.push(medidas[i].preenchimento);
    }

    // Pega o último valor para a rosca, ou 0 se não tiver dados
    var ultimoValor = dados.length > 0 ? dados[dados.length - 1] : 0;

    // --- Configuração da Rosca (Donut) ---
    // Plugin para texto no centro
    const centerTextPlugin = {
        id: "centerText",
        afterDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#0a1911";
            
            // Ajuste dinâmico da fonte
            const fontSize = Math.min(width, height) / 8;
            ctx.font = `bold ${fontSize}px Arial`;
            
            // Texto principal
            ctx.fillText(ultimoValor + "%", width / 2, height / 2 - 10);
            
            // Subtítulo
            ctx.font = `bold ${fontSize / 2.5}px Arial`;
            ctx.fillText("Último Registro", width / 2, height / 2 + 20);
            
            ctx.restore();
        },
    };

    // Definição da cor (Cinza se for 0/inativo, ou colorido se tiver histórico)
    let corDestaque = "rgb(150, 150, 150)"; // Cor neutra para inativo
    if (ultimoValor > 0) corDestaque = "rgb(209, 9, 9)"; // Vermelho se tiver lixo parado

    new Chart(RoscaReciclavel, {
        type: "doughnut",
        data: {
            datasets: [{
                data: [100 - ultimoValor, ultimoValor],
                backgroundColor: ["rgb(240, 240, 240)", corDestaque],
                hoverOffset: 4,
            }],
        },
        options: {
            responsive: true,
            cutout: "80%",
            plugins: { legend: { display: false } }
        },
        plugins: [centerTextPlugin],
    });

    // --- Configuração da Linha ---
    new Chart(LinhaReciclavel, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Histórico de Preenchimento",
                data: dados,
                borderColor: "rgb(120, 120, 120)", // Cor cinza para indicar inatividade
                tension: 0.2,
                fill: false,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: "Histórico Recente" }
            },
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        },
    });
}