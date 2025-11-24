function verSenha() {
  if (ipt_senha.type == "password") {
    ipt_senha.type = "text";
    icone_olho.classList.remove("fa-eye");
    icone_olho.classList.add("fa-eye-slash");
  } else {
    ipt_senha.type = "password";
    icone_olho.classList.remove("fa-eye-slash");
    icone_olho.classList.add("fa-eye");
  }
}

function entrar() {
  var emailVar = ipt_email.value.trim().toLowerCase();
  var senhaVar = ipt_senha.value.trim();

  if (emailVar == "" || senhaVar == "") {
    div_erro.innerHTML = "Todos os campos devem ser preenchidos!";
    return;
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;
          sessionStorage.AQUARIOS = JSON.stringify(json.aquarios);

          setTimeout(function () {
            window.location = "./dashboard/cards.html";
          }, 1000); // apenas para exibir o loading
        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}