var senhaValida = false;
var emailValido = false;

function validarSenha() {
  div_senha.innerHTML = "";
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
  // var listaNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var temCaracteresEspeciais = 0;
  var temNumeros = 0;

  var senha = ipt_senha.value;
  var tamanhoSenha = senha.length;
  var senhaMaiuscula = senha.toUpperCase();
  var senhaMinuscula = senha.toLowerCase();

  var cont = 0;
  var criterios = 0;

  while (cont < tamanhoSenha) {
    if (listaCaracteresEspeciais.includes(senha[cont]) == true) {
      temCaracteresEspeciais++;
    }
    if (!isNaN(senha[cont])) {
      temNumeros++;
    }
    cont++;
  }

  // Validar se a senha possui mais que 8 caracteres
  if (tamanhoSenha >= 8) {
    criterios++;
    div_senha.innerHTML +=
      "<span style='color: green;'>- A senha deve conter ao menos 8 caracteres</span><br>";
  } else {
    div_senha.innerHTML += "- A senha deve conter ao menos 8 caracteres<br>";
  }

  // Validar se a senha possui uma letra minúscula
  if (senha != senhaMaiuscula) {
    criterios++;
    div_senha.innerHTML +=
      "<span style='color: green;'>- A senha deve conter uma letra minúscula</span><br>";
  } else {
    div_senha.innerHTML += "- A senha deve conter uma letra minúscula<br>";
  }

  // Validar se a senha possui uma letra maiúscula
  if (senha != senhaMinuscula) {
    criterios++;
    div_senha.innerHTML +=
      "<span style='color: green;'>- A senha deve conter uma letra maiúscula</span><br>";
  } else {
    div_senha.innerHTML += "- A senha deve conter uma letra maiúscula<br>";
  }

  // Validar se a senha possui um número
  if (temNumeros != 0) {
    criterios++;
    div_senha.innerHTML +=
      "<span style='color: green;'>- A senha deve conter um número</span><br>";
  } else {
    div_senha.innerHTML += "- A senha deve conter um número<br>";
  }

  // Validar se a senha possui um caracter especial
  if (temCaracteresEspeciais != 0) {
    criterios++;
    div_senha.innerHTML +=
      "<span style='color: green;'>- A senha deve conter um caracter especial</span><br>";
  } else {
    div_senha.innerHTML += "- A senha deve conter um caracter especial<br>";
  }

  if (criterios == 5) {
    senhaValida = true;
  }
  else {
    senhaValida = false;
  }

  validarCampos();
}

function validarEmail() {
  var email = ipt_email.value;

  if (email.includes("@")) {
    emailValido = true;
    div_email.innerHTML = "<span style='color: green;'>- O email deve conter o símbolo de @</span><br>";
  } 
  else {
    emailValido = false;
    div_email.innerHTML = "- O email deve conter o símbolo de @";
  }

  validarCampos();
}

function validarCampos() {
  if (emailValido && senhaValida) {
    btn_entrar.disabled = false;
    btn_entrar.style.opacity = "1";
    btn_entrar.style.cursor = "pointer";
  } else {
    btn_entrar.disabled = true;
    btn_entrar.style.opacity = "0.5";
    btn_entrar.style.cursor = "not-allowed";
  }
}

function validar() {
  window.location.href = "../view/dashboardGeral.html";
  alert("Login Valido!");
}

function verSenha() {
  if (ipt_senha.type == "password") {
    ipt_senha.type = "text";
    icone_olho.classList.remove("fa-eye");
    icone_olho.classList.add("fa-eye-slash");
  }
  else {
    ipt_senha.type = "password";
    icone_olho.classList.remove("fa-eye-slash");
    icone_olho.classList.add("fa-eye");
  }
}