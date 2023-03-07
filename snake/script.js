// Дістаємо елемент canvas з HTML
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const output = document.querySelector(".counter");
const restar = document.getElementById("restart-button");
const reload = document.getElementById("reload");
const start = document.getElementById("start");
const mySelect = document.getElementById("option");
let speed = 1500;

mySelect.addEventListener("change", function () {
  switch (mySelect.value) {
    case "1":
      speed = 1500;
      console.log("1");
      break;
    case "2":
      speed = 1000;
      console.log("2");
      break;
    case "3":
      speed = 500;
      console.log("3");
      break;
    case "4":
      speed = 200;
      console.log("4");
      break;
  }
});

function drawGrid() {
  // Цикл для малювання клітинок
  for (let i = 0; i <= width * 2; i++) {
    for (let j = 0; j <= height * 2; j++) {
      // Малюємо квадратну клітинку
      context.strokeRect(j * grid, i * grid, grid, grid);
    }
  }
}
// Розміри поля
const grid = 15;
const width = canvas.width / grid;
const height = canvas.height / grid;
drawGrid();
// Створюємо початковий стан гри

let snake = {
  x: 0,
  y: 0,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};
let apple = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
};

// Оновлюємо гру кожен кадр
function loop() {
  // Очищуємо поле
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  output.textContent = snake.maxCells - 4;

    reload.addEventListener("click", function () {
   location.reload()
  });  // перезапуск сторінки

  // перезапуск всіх данних не вимикаючи гру
  restar.addEventListener("click", function () {
    snake = {
      x: 0,
      y: 0,
      dx: grid,
      dy: 0,
      cells: [],
      maxCells: 4,
    };
    apple = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  });

  // Рухаємо змійку
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Обробка виходу за межі поля
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Додаємо нову голову змійці
  snake.cells.unshift({ x: snake.x, y: snake.y });



  // Рендеримо яблоко
  context.fillStyle = "red";
  context.fillRect(apple.x * grid, apple.y * grid, grid, grid);


  context.fillStyle = "#228B22";
  cutSnake = 0;

  // цикд перебор
  snake.cells.forEach(function (cell) {
    cell.x === snake.x && cell.y === snake.y
      ? (context.fillStyle = "#006400")
      : (context.fillStyle = "#228B22");

      //виводимо графічно змію
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Обрізаємо хвіст змійки, якщо вона дуже довга
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    // Якщо змійка врізалась у свій хвіст, вона його відкушує
    if (cell.x - snake.dx === snake.x && cell.y - snake.dy === snake.y) {
      cutSnake < 4 ? (snake.maxCells = 4) : (snake.maxCells = cutSnake);
    }


    // Якщо змійка зїла яблоко, вона росте і додається нове яблоко
    if (snake.x === apple.x * grid && snake.y === apple.y * grid) {
      snake.maxCells++;
      apple = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    }
    if (cell.x === apple.x * grid && cell.y === apple.y * grid) {
      apple = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    }
    // додається +1 до розміру змії щоб дізнатись чи вкусила вона себе
    cutSnake++;
  });
}

// Обробка клавіш для керування змійкою
document.addEventListener("keydown", function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Запускаємо гру

start.addEventListener("click", function () {
  requestAnimationFrame(function () {
    setInterval(loop, speed / 10);
  });
});
