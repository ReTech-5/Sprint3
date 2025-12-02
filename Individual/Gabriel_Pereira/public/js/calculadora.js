function calcular() {
  div_resultado.style.display = "block";
  div_mensagem.innerHTML = "";
  var lixeiras = Number(ipt_lixeiras.value);
  var capacidadeLixeira = Number(ipt_capacidadeLixeira.value);
  var capacidadeCaminhao = Number(ipt_capacidadeCaminhao.value);
  var custo = 700; // Custo Médio por Rota: R$700

  if (lixeiras == "" || capacidadeLixeira == "" || capacidadeCaminhao == "") {
    // Validação para campos vazios
    if (lixeiras == "") {
      div_mensagem.innerHTML +=
        "Insira a quantidade de lixeiras antes de prosseguir!<br><br>";
    }
    if (capacidadeLixeira == "") {
      div_mensagem.innerHTML +=
        "Insira a capacidade máxima lixeiras antes de prosseguir!<br><br>";
    }
    if (capacidadeCaminhao == "") {
      div_mensagem.innerHTML +=
        "Insira a capacidade de carga dos caminhões de coleta antes de prosseguir!<br>";
    }
  } else if (lixeiras < 0 || capacidadeLixeira < 0 || capacidadeCaminhao < 0) {
    // Validação para valores negativos
    if (lixeiras < 0) {
      div_mensagem.innerHTML +=
        "A quantidade de lixeiras não pode ser negativa!<br><br>";
    }
    if (capacidadeLixeira < 0) {
      div_mensagem.innerHTML +=
        "A capacidade máxima das lixeiras não pode ser negativa!<br><br>";
    }
    if (capacidadeCaminhao < 0) {
      div_mensagem.innerHTML +=
        "A capacidade de carga dos caminhões de coleta não pode ser negativa!<br>";
    }
  } else {
    // Calculo das Rotas
    var rotas = (lixeiras * (capacidadeLixeira / 2)) / capacidadeCaminhao;
    // Quantidade de Rotas necessárias por dia para coletar todas as lixeiras (levando em conta que todas estão parcialmente preenchidas)

    // Prejuízo Antes da ReTech
    // Viagens Desnecessárias: 30%
    var valorDiaAntes = rotas * custo * 0.3;
    var valorMesAntes = valorDiaAntes * 30;
    var valorAnoAntes = valorMesAntes * 12;

    // Prejuízo Depois da ReTech
    // Redução de 20% das Viagens Desnecessárias
    // Viagens Desnecessárias: 10%
    var valorDiaDepois = rotas * custo * 0.1;
    var valorMesDepois = valorDiaDepois * 30;
    var valorAnoDepois = valorMesDepois * 12;

    // Economia
    var economiaDia = valorDiaAntes - valorDiaDepois;
    var economiaMes = valorMesAntes - valorMesDepois;
    var economiaAno = valorAnoAntes - valorAnoDepois;

    div_mensagem.innerHTML =
      "<h3>Dados</h3><br>" +
      "<i><u>Total de Lixeiras:</u></i> " +
      lixeiras +
      "<br><i><u>Capacidade Máxima das Lixeiras:</u></i> " +
      capacidadeLixeira +
      "<br><i><u>Capacidade Máxima dos Caminhões:</u></i> " +
      capacidadeCaminhao +
      "<br>" +
      "<br>Com essas informações é possível calcular a quantidade mínima recomendável de rotas de coleta que devem ser realizadas diariamente para evitar a superlotação de suas lixeiras.<br>" +
      "<br>" +
      "<i><u>Rotas:</u></i> " +
      rotas.toFixed(0) +
      "<br>" +
      "<br>De acordo com dados da AMLURB e da ISWA, cerca de 30% das coletas realizadas são desnecessárias, gerando custos extras significativos. Com base nisso podemos calcular seu prejúizo financeiro pela falta de monitoramento." +
      "<br><br>" +
      "<h3>Prejuízo</h3><br>" +
      "<i><u>Diário:</u></i> " +
      valorDiaAntes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br><i><u>Mensal:</u></i> " +
      valorMesAntes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br><i><u>Anual:</u></i> " +
      valorAnoAntes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br>" +
      "<br>Com base em relatórios técnicos de cidades que já fazem uso de monitoramento inteligente, prevemos reduzir essas rotas desnecessárias para apenas 10%." +
      "<br><br>" +
      "<h3>Economia</h3><br>" +
      "<i><u>Diário:</u></i> " +
      economiaDia.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br><i><u>Mensal:</u></i> " +
      economiaMes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br><i><u>Anual:</u></i> " +
      economiaAno.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) +
      "<br>" +
      "<br>Gerando assim uma economia de despesas do dinheiro público com o setor de limpeza urbana.";
  }
}
