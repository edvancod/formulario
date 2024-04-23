document.querySelector("#enviar").addEventListener("click", validarForm);
let erroNoForm;
let msgErro = document.getElementById('msg-erro');
msgErro.style.display = 'none';
let listaId = ["nome", "email", "dtNascimento", "escolaridade", "estadoCivil", "senha", "confirmar"];
function validarForm() {
    erroNoForm = false;
    for (const id of listaId) {
        validarInput(id);
    }
    validarSexo();
    console.log(pessoa);

    if (erroNoForm) {
        msgErro.innerHTML = '<strong>Atenção:</strong> Algum campo não foi preenchido!';
        msgErro.style.display = '';
    } else {
        validarSenha();
        if (erroNoForm) mostrarDados();
    }

}

function validarSexo() {
    let stSexo = false;
    let lsSexo = document.getElementsByName("sexo");
    for (sx of lsSexo) {
        if (sx.checked) {
            stSexo = true
            pessoa.sexo = sx.value
        }
    }
    if (!stSexo) {
        document.getElementById("sexo").style.border = '1px solid red';
        erroNoForm = true;
    } else {
        document.getElementById("sexo").style.border = '';
    }
}
function limparBordaSexo() {
    
    document.getElementById("sexo").style.border = '';
}

function validarInput(idItem) {
    let item = document.getElementById(idItem);
    if (item.value == '') {
        item.style.border = '1px solid red';
        erroNoForm = true;
    } else {
        item.style.border = '';
        pessoa[idItem] = item.value;
    }
}

function limparBorda(idItem) {
    let item = document.getElementById(idItem);
    item.addEventListener('focus', () => { item.style.border = ''; });
}

for (const id of listaId) {
    limparBorda(id);
}

function validarSenha() {
    let senha = pessoa.senha;
    let confirmar = pessoa.confirmar;
    if (senha.length < 8) {
        msgErro.innerHTML = "<strong>Atenção:</strong> Senha deve ter 8 ou mais caracteres";
        erroNoForm = false;
    }
    else if (senha == confirmar) {
        erroNoForm = true;
        msgErro.style.display = 'none';
    } else {
        msgErro.innerHTML = "<strong>Atenção:</strong> Senha e Confirmar Senha Estão Diferentes";
        erroNoForm = false;
    }
}

let pessoa = {};

function mostrarDados() {
    let txt = `Dados da Pessoa <br>
    Nome: ${pessoa.nome}<br>
    E-mail: ${pessoa.email}<br>
    Sexo: ${pessoa.sexo}<br>
    Data de Nascimento: ${pessoa.dtNascimento}<br>
    Escolaridade: ${pessoa.escolaridade}<br>
    Estado Civil: ${pessoa.estadoCivil}
    `;
    txt = txt.replaceAll('<br>', '<br><strong>');
    txt = txt.replaceAll(':', ':</strong>');
    document.querySelector("#dados").innerHTML = txt;
    document.querySelector("#dados").style.display = '';

}
document.querySelector("#dados").style.display = 'none';

function dark() {
    let html = document.getElementsByTagName('html')[0];
    if (document.getElementById('darkMode').checked) {
        html.dataset.bsTheme = 'dark';
    } else {
    
        html.dataset.bsTheme = ''
    }
}




    // para ativar e desativar o modoDark
    // html = document.getElementsByTagName('html')[0]
    // ativar    html.dataset.bsTheme = 'dark'
    // desativar html.dataset.bsTheme = ''

//  Manutenções evolutiva corretiva necessárias
//  1. O botar Modo Dark
//  > Ao clicar no botão Modo Dark a tela deve ficar na configuração escolhida.

//  2. Seleção de alguma opção sexo
//  > Se o campo sexo estivar marcado com a borda vermelha, e o usuário selecionar alguma das opções.
//  > A borda vermelha deve ser imediatamente removida.

//  3. Na tela a mensagem de erro e dados da pessoas estão aparecendo ao mesmo tempo.
//  > Quando os "Dados da Pessoa" é apresentado e posteriormente o usuário comete algum erro no formulário 2 mensagem aparecem.
//  > Deve ser apresentado sempre só uma das mensagem a de erro ou a de sucesso.
