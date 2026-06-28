const  display = document.getElementById("display");
const numberButtons= document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const decimalButton = document.querySelector(".decimal");
let currentNum="";
let prevNum="";
let operator="";
let expression="";
function updateDisplay(){
    display.value = expression ||"0";
}
function appendNumber(number){
    currentNum += number;
    expression += number;
    updateDisplay();
}
function clearCalculator(){
    currentNum="";
    prevNum="";
    operator="";
    expression="";
    updateDisplay();
}
function deleteLast(){
    if(expression ===""){
        return;
    }
    expression = expression.slice(0,-1);
    currentNum = currentNum.slice(0,-1);
    updateDisplay();
}
function calculate(){
    if(prevNum === "" || currentNum ==="" || operator === "") {
        return;
    }
    const Num1=parseFloat(prevNum);
    const Num2=parseFloat(currentNum);
    let result;
    switch (operator){
        case "+":
            result = Num1+Num2;
            break;
        case "-":
            result = Num1-Num2;
            break;
        case "*":
            result = Num1 * Num2;
            break;
        case "/":
            if(Num2 === 0){
            expression = "Error";
            currentNum="";
            prevNum ="";
            operator="";
            updateDisplay();
            return;
            }
            result=Num1/Num2;
            break;
        default:
            return;
        }
    currentNum = result.toString();
    prevNum="";
    operator="";
    expression = result.toString();
    updateDisplay();

}
function chooseOperator(op){
    if(currentNum ===""){
       return;
    }
    if (prevNum !== "" && operator !== ""){
        calculate();
    }
    prevNum = currentNum;
    operator = op;
    expression += " "+ op + " ";
    currentNum ="";
    updateDisplay();
}

function appendDecimal(){
    if(!currentNum.includes(".")){
        currentNum +=".";
        expression += ".";
        updateDisplay();
    }
}
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
      appendNumber(button.textContent);
  });
});
clearButton.addEventListener("click", () => {
  clearCalculator();
});
deleteButton.addEventListener("click", () => {
 deleteLast();
});
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chooseOperator(button.dataset.value);
    });
});
equalButton.addEventListener("click",calculate);
decimalButton.addEventListener("click", appendDecimal);