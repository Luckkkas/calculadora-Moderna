let expressao = "";

const resultado = document.getElementById("resultado");

function adicionar(valor) {
    expressao += valor;
    resultado.textContent = expressao;
}

function limpar() {
    expressao = "";
    resultado.textContent = "0";
}

function apagar() {
    expressao = expressao.slice(0, -1);

    if (expressao === "") {
        resultado.textContent = "0";
    } else {
        resultado.textContent = expressao;
    }
}

function porcentagem() {
    if (expressao !== "") {
        expressao = String(Number(expressao) / 100);
        resultado.textContent = expressao;
    }
}

function calcular() {
    try {
        let conta = expressao;

        let resposta = Function("return " + conta)();

        resultado.textContent = resposta;
        expressao = String(resposta);

    } catch (erro) {
        resultado.textContent = "Erro";
        expressao = "";
    }
}