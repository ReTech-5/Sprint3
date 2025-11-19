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

// Lista de usuários
var listaUsuarios = [{
  nome: "Lucas Quevedo",
  email: "lucas.castro@sptech.gov",
  senha: "Polenta7?",
  nivel: "Administrador",
}, {
  nome: "Samara Freitas",
  email: "samara.farias@sptech.gov",
  senha: "Chocolate9.",
  nivel: "Administrador",
}, {
  nome: "Gleison Almeida",
  email: "gleison.almeida@sptech.gov",
  senha: "OrdemParanormal20!",
  nivel: "Padrão",
}, {
  nome: "Pedro Cardoso",
  email: "pedro.cardoso@sptech.gov",
  senha: "Formula1)",
  nivel: "Padrão",
}, {
  nome: "Gabriel Pereira",
  email: "gabriel.pereira@sptech.gov",
  senha: "Espanhol12$",
  nivel: "Padrão",
}, {
  nome: "Arthur Rodrigues",
  email: "arthur.rodrigues@sptech.gov",
  senha: "Minecraft33#",
  nivel: "Administrador",
}];

var nome = "";
var email = "";
var senha = "";
var nivel = "";
var mensagem = "";
var campoValidado = false;
var usuarioValidado = false;

// Filtro atual
var filtro = "todos";

// Div da tabela
var tabelaDivConteudo = ""; // Variável que vai armazenar o HTML da tabela

var mostrarCadastro = false;

// Função para "renderizar" tabela dentro da div
function mostrarTabela() {
  tabelaDivConteudo =
    "<table class='tabela'><tr><th>Nome</th><th>E-mail</th><th>Senha</th><th>Nível</th></tr>";

  var cont = 0;
  var tamanhoListaUsuario = listaUsuarios.length;
  while (cont < tamanhoListaUsuario) {
    var usuario = listaUsuarios[cont];
    var mostrar = false;

    if (filtro == "todos") {
      mostrar = true;
    } else if (usuario.nivel.toLowerCase() == filtro) {
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
        usuario.nivel +
        "</td>" +
        "</tr>";
    }

    cont++;
  }

  tabelaDivConteudo += "</table>";

  // Atualiza o conteúdo da div
  div_tabela.innerHTML = tabelaDivConteudo;
}

// Função para renderizar o card de cadastro
function novoUsuario() {
  if (mostrarCadastro == false) {
    div_tela_cadastro.style.display = "flex";
    mostrarCadastro = true;
  }
  else if (mostrarCadastro == true) {
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
  } 
  else if (
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
  }
  else {
    campoValidado = true;
  }
}

function usuarioExistente() {
  var tamanhoListaUsuario = listaUsuarios.length;
  var cont = 0;
  var falha = 0;

  while (cont < tamanhoListaUsuario) {
    var usuario = listaUsuarios[cont];

    if (usuario.email == email) {
      mensagem += "- Esse e-mail já está sendo utilizado!"
      falha++;
    }

    cont++;
  }

  if (falha == 0) {
    usuarioValidado = true;
  }
}

// Função para cadastrar novo usuário
function cadastrar() {
  validarCampos();
  usuarioExistente();

  if (campoValidado && usuarioValidado) {
    listaUsuarios.push({ nome: nome, email: email, senha: senha, nivel: nivel });
    mostrarTabela();
    ipt_nome.value = "";
    ipt_email.value = "";
    ipt_senha.value = "";
    slc_nivel.value = "#";
    div_erro.innerHTML = "";
  }

  div_erro.innerHTML = mensagem;
}

/*
// Função para editar usuário
function editarUsuario() {
  mostrarTabela();
  var id = prompt("Digite o ID do usuário que deseja editar:");
  var idNum = id * 1; // converte string em número

  if (idNum < 0 || idNum >= usuarios.length || id == "") {
    alert("ID inválido!");
  } else {
    var u = usuarios[idNum];
    var novoNome = prompt("Editar nome:", u.nome);
    var novoEmail = prompt("Editar e-mail:", u.email);
    var novoNivel = prompt("Editar nível:", u.nivel);

    if (novoNome && novoEmail && novoNivel) {
      usuarios[idNum].nome = novoNome;
      usuarios[idNum].email = novoEmail;
      usuarios[idNum].nivel = novoNivel;
      mostrarTabela();
    } else {
      alert("Todos os campos são obrigatórios!");
    }
  }
}
*/

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