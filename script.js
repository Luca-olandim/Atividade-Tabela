// Declarando variáveis globais
let clientes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoCliente = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoCliente.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoCliente.onclick = function () {
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

// Função para identificar cliente por placa
function identifica(placa) {
    for (let cliente of clientes) {
        if (cliente.placa === placa.id) {
            return cliente;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let cliente = identifica(button);

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

    // Elementos do modal de informações do cliente
    let placaModal = modal.querySelector("#placaModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let atendimentoModal = modal.querySelector("#atendimentoModal");
    let conhecimentoModal = modal.querySelector("#conhecimentoModal");
    let infraestruturaModal = modal.querySelector("#infraestruturaModal");
    let qualidadeServicoModal = modal.querySelector("#qualidadeServicoModal");
    let btnExcluirCliente = modal.querySelector("#btnExcluirCliente");

    if (!placaModal || !nomeModal || !atendimentoModal || !conhecimentoModal || !infraestruturaModal || !qualidadeServicoModal || !btnExcluirCliente) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    placaModal.innerHTML = cliente.placa;
    nomeModal.innerHTML = cliente.nome;
    atendimentoModal.innerHTML = cliente.atendimento;
    conhecimentoModal.innerHTML = cliente.conhecimento;
    infraestruturaModal.innerHTML = cliente.infraestrutura;
    qualidadeServicoModal.innerHTML = cliente.qualidadeServico;

    // Configurando o botão de excluir
    btnExcluirCliente.onclick = function () {
        excluirCliente(cliente.placa);
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

// Função para excluir cliente
function excluirCliente(placa) {
    clientes = clientes.filter(cliente => cliente.placa !== placa);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("alunos");
    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    tabela.innerHTML = "";

    for (let cliente of clientes) {
        let botaoid = `<td><button id='${cliente.placa}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${cliente.placa}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.atendimento}</td>
            <td>${cliente.conhecimento}</td>
            <td>${cliente.infraestrutura}</td>
            <td>${cliente.qualidadeServico}</td>            
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

// Função para cadastrar novo cliente
function cadastrarAluno() {
    let placa = document.getElementById("placa").value;
    let nome = document.getElementById("nome").value;
    let atendimento = document.getElementById("atendimento").value;
    let conhecimento = document.getElementById("conhecimento").value;
    let infraestrutura = document.getElementById("infraestrutura").value;
    let qualidadeServico = document.getElementById("qualidadeServico").value;

    // Verifica se a placa já está cadastrada
    if (clienteExistente(placa)) {
        alert("Placa já cadastrada. Insira uma placa única.");
        return;
    }

    let novoCliente = {
        placa: placa,
        nome: nome,
        atendimento: atendimento,
        conhecimento: conhecimento,
        infraestrutura: infraestrutura,
        qualidadeServico: qualidadeServico
    };

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(novoCliente);

    // Salva no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o cliente já existe
function clienteExistente(placa) {
    return clientes.some(cliente => cliente.placa === placa);
}