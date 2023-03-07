let pole = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let who_turn = true;


const out_win = document.querySelector(".screen p");

document.querySelector(".buttons").onclick = (event) => {
  const key = event.target.id; //id елементу на який було нажато
  const out_table = document.getElementById(key + ""); //запоминаємо куди виводити потім символ

  console.log(key);

  //якщо ще нема переможця і на клітку ще не нажимали, то вона записується в масив і виводиться на екран
  if (pole[key] === 0 && pole[0] === 0) {
    if (who_turn) {
      who_turn = false;
      pole[key] = 1;
      out_table.innerHTML = "x";
    } else {
      who_turn = true;
      pole[key] = 2;
      out_table.innerHTML = "o";
    }
  }

  let ta;
  // перетворення черги в цифру для перевірки
  ta = who_turn ? 1 : 2;

  // Перевірка чи є переможець і якщо знайдене переможна комбінація то вона занесецця в нулеве місце масива
  let n = 0;
  while (n < 10) {
    if (pole[1 + n] === ta && pole[n + 2] === ta && pole[3 + n] === ta)
      pole[0] = ta;
    n = n + 3;
  }
  for (let i = 1; i < 4; i++) {
    if (pole[i] === ta && pole[i + 3] === ta && pole[6 + i] === ta)
      pole[0] = ta;
    //виграшан комбінація по горизонталі заноситься в нулеву позиція
  }
  if (
    (pole[1] === ta && pole[5] === ta && pole[9] === ta) ||
    (pole[3] === ta && pole[5] === ta && pole[7] === ta)
  )
    pole[0] = ta;
  //виграшан комбінація на іскосок заноситься в нулеву позиція

  // вивід на екран інфу
  switch (pole[0]) {
    case 0: // якщо гра ще не завершена
      if (who_turn)
        out_win.textContent =
          "you turn"; // в залежності чий крок виведеться інформація
      else out_win.textContent = "gamer number 2 ";
      break;
    case 1:
      out_win.textContent = `You win`; //якщо переможець гравець 1
      break;
    case 2:
      out_win.textContent = `gamer 2 win`; //якщо переможець гравець 2
      break;
  }
  console.log(pole);
};
