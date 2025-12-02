// dashboardSensor.js - VERSÃO FINAL: DADOS DO BANCO + DESIGN DE REFERÊNCIA

const urlParams = new URLSearchParams(window.location.search);
const idSensor = urlParams.get('id');

const tituloPagina = document.getElementById("titulo_pagina");
// Elementos de detalhes mantidos estáticos no HTML conforme solicitado

const LinhaReciclavel = document.getElementById("cvs_linhaReciclavel");
const RoscaReciclavel = document.getElementById("cvs_roscaReciclavel");

if (idSensor) {
    obterDadosSensor();
    obterDadosGrafico();
} else {
    tituloPagina.innerHTML = "Sensor não selecionado";
}

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