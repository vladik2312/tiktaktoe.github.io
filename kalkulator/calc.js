let a = "";
let b = "";
let sign = "";
let finish = false;
let plus_minus_a = false;
let plus_minus_b = false;
const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["+", "-", "÷", "x"];

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  plus_minus_a = false;
  plus_minus_b = false;
  out.textContent = "0";
  console.table("clear ALL");
}

document.querySelector(".AC").onclick = clearAll;

document.querySelector(".buttons").onclick = (event) => {
  // нажата не кнопка
  if (!event.target.classList.contains("btn")) return;
  // нажата кнопка clearAll ac
  if (event.target.classList.contains("AC")) return;

  out.textContent = "";
  // получаю нажатую кнопку
  const key = event.target.textContent;

  if (key === "+/-") {
    if (b === "" && sign === "") {
      plus_minus_a = !plus_minus_a;
      if (plus_minus_a) {
        if (a === "") out.textContent = "0";
        else out.textContent = "-" + a;
      } else out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      plus_minus_b = !plus_minus_b;
      finish = false;
      out.textContent = "-" + b;
    } else {
      plus_minus_b = !plus_minus_b;
      if (plus_minus_b) {
        if (b === "") out.textContent = "0";
        else out.textContent = "-" + b;
      } else out.textContent = 0;
    }
    console.table(a, b, sign);
    return;
  }
  // если нажата клавиша 0-9 или.
  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      if (plus_minus_a) {
        out.textContent = "-" + a;
      } else out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      plus_minus_a = false;
      plus_minus_b = false;

      out.textContent = b;
    } else {
      b += key;
      if (plus_minus_b) out.textContent = "-" + b;
      else out.textContent = b;
    }
    console.table(a, b, sign);
    return;
  }

  // если нажата клавиша + - / *
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.table(a, b, sign);
    return;
  }

  // нажата =
  if (key === "=") {
    if (b === "") b = a;
    if (plus_minus_a) a = "-" + a;
    if (plus_minus_b) b = "-" + b;
    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "x":
        a = a * b;
        break;
      case "÷":
        if (b === "0") {
          out.textContent = "Ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    plus_minus_a = false;
    plus_minus_b = false;
    out.textContent = a;
    console.table(a, b, sign);
  }
};
