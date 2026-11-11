const calculation = document.querySelector(".calculation");
const oprBtn = document.querySelectorAll(".oprBtn");
const numBtn = document.querySelectorAll(".numBtn");

let number = "";

// descimal function
function addDecimal() {
    let currentNumber = calculation.innerText.split(/[+/*%]/).pop();

    if (!currentNumber.includes(".")) {
        number += ".";
        calculation.innerText = number;
    }
}


numBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        number += btn.innerText;
        calculation.innerText = number;
    })
})

oprBtn.forEach((opp) => {
    opp.addEventListener('click', () => {

       if(number == "") {
        return;
       }

       let operationCheck = calculation.innerText.slice(-1)
       if("+-/*%".includes(operationCheck)) {
        return;
       }

        number += opp.innerText;
        calculation.innerText = number;

    })
})

document.getElementById("equalBtn").addEventListener('click',() => {
    
    number = eval(number);
    calculation.innerText = number;
})

document.getElementById("clear").addEventListener('click', () => {
    calculation.innerText = "0";
    number = "";
})

document.getElementById("delete").addEventListener('click', () => {
    let delChar = calculation.innerText.slice(0, -1);
    number = delChar;
    calculation.innerText = number;

    if(delChar.length === "0") {
        calculation.innerText = "0";
        number = "";
    }
})
