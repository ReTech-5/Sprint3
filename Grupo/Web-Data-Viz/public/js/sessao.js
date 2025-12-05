// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var acesso = sessionStorage.ACESSO_USUARIO;

    var usuarioNome = document.getElementById("usuario");
    var usuarioEmail = document.getElementById("email");

    if (email != null && nome != null) {
        usuarioNome.innerHTML = nome;
        usuarioEmail.innerHTML = email;

        var idButton = document.getElementById('btn_cadastroPage')
        var idNavGeral = document.getElementById('bt_navGeral')
        var idNavEspecifica = document.getElementById('bt_navEspecifica')
        

        if(acesso == 'Administrador'){

            idButton.style.display = 'block'
            bt_navGeral.innerHTML = 'Cadastrar'
            idNavEspecifica.innerHTML = 'Cadastrar'

        }else {

            idButton.style.display = 'none'
            idNavGeral.style.display = 'none'
            idNavEspecifica.style.display = 'none'

        }
        

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}

