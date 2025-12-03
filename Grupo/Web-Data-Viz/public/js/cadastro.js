var listaCaracteresEspeciais = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "¨¨",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "}",
  "ª",
  "[",
  "]",
  "~",
  "^",
  ":",
  ";",
  ".",
  ",",
  "?",
  "°",
  "/",
];

var nome = "";
var email = "";
var senha = "";
var nivel = "";
var fkEmpresa;
var mensagem = "";
var campoValidado = false;

// Filtro atual
var filtro = "todos";

// Div da tabela
var tabelaDivConteudo = ""; // Variável que vai armazenar o HTML da tabela

var mostrarCadastro = false;

// Função para "renderizar" tabela dentro da div
function mostrarTabela() {
  fkEmpresa = sessionStorage.FK_EMPRESA;

  fetch(`/usuarios/listarUsuarios/${fkEmpresa}`, {
    method: "GET",
  }).then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        console.log("Nenhuma dado encontrado");
        throw "Nenhum resultado encontrado";
      }

      resposta.json().then(function (resposta) {
        console.log(resposta);

        tabelaDivConteudo =
          "<table class='tabela'><tr><th>Nome</th><th>E-mail</th><th>Senha</th><th>Nível</th></tr>";

        var tamanhoListaUsuario = resposta.length;

        for (var i = 0; i < tamanhoListaUsuario; i++) {
          var usuario = resposta[i];
          var mostrar = false;

          if (filtro == "todos") {
            mostrar = true;
          } else if (usuario.acesso.toLowerCase() == filtro) {
            mostrar = true;
          }

          if (mostrar == true) {
            tabelaDivConteudo +=
              "<tr>" +
              "<td>" +
              usuario.nome +
              "</td>" +
              "<td>" +
              usuario.email +
              "</td>" +
              "<td>" +
              usuario.senha +
              "</td>" +
              "<td>" +
              usuario.acesso +
              "</td>" +
              "</tr>";
          }
        }

        tabelaDivConteudo += "</table>";

        div_tabela.innerHTML = tabelaDivConteudo;
      });
    }
  });
}

// Função para renderizar o card de cadastro
function novoUsuario() {
  if (mostrarCadastro == false) {
    div_tela_cadastro.style.display = "flex";
    mostrarCadastro = true;
  } else if (mostrarCadastro == true) {
    div_tela_cadastro.style.display = "none";
    mostrarCadastro = false;
    ipt_nome.value = "";
    ipt_email.value = "";
    ipt_senha.value = "";
    slc_nivel.value = "#";
    div_erro.innerHTML = "";
  }
}

function validarCampos() {
  nome = ipt_nome.value.trim();
  email = ipt_email.value.trim().toLowerCase();
  senha = ipt_senha.value.trim();
  nivel = slc_nivel.value;

  var tamanhoSenha = senha.length;
  var senhaMaiuscula = senha.toUpperCase();
  var senhaMinuscula = senha.toLowerCase();
  var temCaracteresEspeciais = 0;
  var temNumeros = 0;

  var cont = 0;
  mensagem = "";

  while (cont < tamanhoSenha) {
    if (listaCaracteresEspeciais.includes(senha[cont]) == true) {
      temCaracteresEspeciais++;
    }
    if (!isNaN(senha[cont])) {
      temNumeros++;
    }
    cont++;
  }

  if (nome == "" || email == "" || senha == "" || nivel == "#") {
    mensagem = "Todos os campos devem estar preenchidos antes de prosseguir!";
  } else if (
    !email.includes("@") ||
    tamanhoSenha < 8 ||
    senha == senhaMaiuscula ||
    senha == senhaMinuscula ||
    temNumeros == 0 ||
    temCaracteresEspeciais == 0
  ) {
    if (!email.includes("@")) {
      mensagem = "- E-mail deve conter @<br>";
    }
    if (tamanhoSenha < 8) {
      mensagem += "- Senha deve ter 8 caracteres ou mais  <br>";
    }
    if (senha == senhaMaiuscula) {
      mensagem += "- Senha deve conter letra minúsucla<br>";
    }
    if (senha == senhaMinuscula) {
      mensagem += "- Senha deve conter letra maiúscula<br>";
    }
    if (temNumeros == 0) {
      mensagem += "- Senha deve conter número<br>";
    }
    if (temCaracteresEspeciais == 0) {
      mensagem += "- Senha deve conter caractere especial<br>";
    }
  } else {
    campoValidado = true;
  }
}

function cadastrar() {
  validarCampos();

  if (campoValidado) {
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha,
        nivelServer: nivel,
        empresaServer: fkEmpresa,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          mostrarTabela();
        } 
        else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

// Funções de filtro
function filtrarTodos() {
  filtro = "todos";
  mostrarTabela();
}
function filtrarAdmin() {
  filtro = "administrador";
  mostrarTabela();
}
function filtrarPadrao() {
  filtro = "padrão";
  mostrarTabela();
}

// Inicializa
mostrarTabela();