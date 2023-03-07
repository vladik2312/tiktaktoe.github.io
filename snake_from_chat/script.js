// Дістаємо елемент canvas з HTML
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Розміри поля
const grid = 16;
const width = canvas.width / grid;
const height = canvas.height / grid;

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

  // Обрізаємо хвіст змійки, якщо вона дуже довга
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Рендеримо яблоко
  context.fillStyle = "red";
  context.fillRect(apple.x * grid, apple.y * grid, grid, grid);

  // Рендеримо змійку
  context.fillStyle = "green";
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Якщо змійка врізалась у свій хвіст, вона помирає
    if (cell.x === snake.x && cell.y === snake.y) {
      snake.maxCells = 4;
    }

    // Якщо змійка з'їла яблоко, вона росте і додається нове яблоко
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    }

    // Перевірка на наявність колізій з яблоком
    if (apple.x === snake.x && apple.y === snake.y) {
      snake.maxCells++;
      apple = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    }
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
requestAnimationFrame(function () {
  setInterval(loop, 1000 / 10);
});