let expressao = "";
const visor = document.getElementById("resultado");
const operadores = "+-*/";

function atualizarVisor() {
    if (expressao === "") {
        visor.textContent = "0";
        return;
    }
    visor.textContent = expressao.replace(/\*/g, "×").replace(/\//g, "÷");
}

function adicionar(valor) {
    const ultimo = expressao.slice(-1);

    if (operadores.includes(valor)) {
        if (expressao === "" && valor !== "-") return;
        if (expressao === "-") return;

        if (ultimo !== "" && operadores.includes(ultimo)) {
            expressao = expressao.slice(0, -1);
        }
    }

    if (valor === ".") {
        const ultimoNumero = expressao.split(/[+\-*/]/).pop();
        if (ultimoNumero.includes(".")) return;
        if (ultimoNumero === "") expressao += "0";
    }

    expressao += valor;
    atualizarVisor();
}

function limpar() {
    expressao = "";
    atualizarVisor();
}

function apagar() {
    expressao = expressao.slice(0, -1);
    atualizarVisor();
}

function porcentagem() {
    const partes = expressao.split(/([+\-*/])/);
    const ultimo = partes.pop();

    if (ultimo === "" || isNaN(ultimo)) return;

    partes.push(String(parseFloat(ultimo) / 100));
    expressao = partes.join("");
    atualizarVisor();
}

function calcular() {
    if (expressao === "") return;

    if (operadores.includes(expressao.slice(-1))) {
        expressao = expressao.slice(0, -1);
    }

    try {
        const resultado = Function('"use strict"; return (' + expressao + ")")();

        if (!isFinite(resultado)) {
            visor.textContent = "Erro";
            expressao = "";
            return;
        }

        expressao = String(parseFloat(resultado.toFixed(10)));
        atualizarVisor();
    } catch (erro) {
        visor.textContent = "Erro";
        expressao = "";
    }
}

document.addEventListener("keydown", (e) => {
    if ("0123456789.+-*/".includes(e.key)) adicionar(e.key);
    else if (e.key === "Enter" || e.key === "=") calcular();
    else if (e.key === "Backspace") apagar();
    else if (e.key === "Escape") limpar();
    else if (e.key === "%") porcentagem();
});
