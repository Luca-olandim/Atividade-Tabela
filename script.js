// Declarando variáveis globais
let alunos = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo aluno
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo aluno
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar aluno por matricula
function identifica(matricula) {
    for (let aluno of alunos) {
        if (aluno.matricula === matricula.id) {
            return aluno;
        }
    }
    return null;
}

// Função para exibir modal de informações do aluno
function modal(button) {
    let aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do aluno
    let nomeModal = modal.querySelector("#nomeModal");
    let generoModal = modal.querySelector("#generoModal");
    let datadenascimentoModal = modal.querySelector("#datadenascimentoModal");
    let turmaModal = modal.querySelector("#turmaModal");
    let matriculaModal = modal.querySelector("#matriculaModal");
    let itinerarioModal = modal.querySelector("#itinerarioModal");
    let btnExcluiraluno = modal.querySelector("#btnExcluiraluno");

    if (!nomeModal || !generoModal || !datadenascimentoModal || !turmaModal || !matriculaModal || !itinerarioModal || !btnExcluiraluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    nomeModal.innerHTML = aluno.nome;
    generoModal.innerHTML = aluno.genero;
    datadenascimentoModal.innerHTML = aluno.datadenascimentoModal;
    turmaModal.innerHTML = aluno.turma;
    matriculaModal.innerHTML = aluno.matricula;
    itinerarioModal.innerHTML = aluno.itinenario;

    // Configurando o botão de excluir
    btnExcluiraluno.onclick = function () {
        excluiraluno(aluno.matricula);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir aluno
function excluiraluno(matricula) {
    alunos = alunos.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("alunos");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoid = `<td><button id='${aluno.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.genero}</td>
            <td>${aluno.datadenascimentoModal}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.itinenario}</td>            
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo aluno
function cadastrarAluno() {
    let nome = document.getElementById("nome").value;
    let genero = document.getElementById("genero").value;
    let datadenascimentoModal = document.getElementById("datadenascimento").value;
    let turma = document.getElementById("turma").value;
    let matricula = document.getElementById("matricula").value;
    let itinenario = document.getElementById("itinenario").value;

    // Verifica se a matricula já está cadastrada
    if (alunoExistente(matricula)) {
        alert("Placa já cadastrada. Insira uma matricula única.");
        return;
    }

    let NovoAluno = {
        nome: nome,
        genero: genero,
        datadenascimento: datadenascimento,
        turma: turma,
        matricula: matricula,
        itinenario: itinenario
    };

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(NovoAluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Recarrega a tabela após cadastrar um novo aluno
    carrega();

    // Esconde o modal de novo aluno
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o aluno já existe
function alunoExistente(matricula) {
    return alunos.some(aluno => aluno.matricula === matricula);
}