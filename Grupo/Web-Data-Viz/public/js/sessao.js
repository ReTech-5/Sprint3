// sessão
function validarSessao(page) {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var acesso = sessionStorage.ACESSO_USUARIO;


    if (email != null && nome != null) {

        var idButton = document.getElementById('btn_cadastroPage')
        var idNavGeral = document.getElementById('bt_navGeral')
        var idNavEspecifica = document.getElementById('bt_navEspecifica')
        
        if(acesso != 'Administrador' && page == 1){

            idButton.style.display = 'none'

        }else if (acesso != 'Administrador' && page == 2){

            idNavGeral.style.display = 'none'

        }else if (acesso != 'Administrador' && page == 3){

            idNavEspecifica.style.display = 'none'
        }

    } else {
        window.location = "login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}

