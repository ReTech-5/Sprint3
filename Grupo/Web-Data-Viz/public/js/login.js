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
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.ACESSO_USUARIO = json.acesso;
          sessionStorage.ID_USUARIO = json.idUsuario;
          sessionStorage.FK_EMPRESA = json.fkEmpresa;

          var acesso = sessionStorage.ACESSO_USUARIO

          if (acesso == 'Suporte'){

            window.location = "bobIA.html"

          } else {

            window.location = "perfil.html"

          }

        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);

          document.getElementById('div_erro').innerHTML = texto
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}