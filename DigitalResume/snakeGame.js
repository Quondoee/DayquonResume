

const canvas = document.getElementById("snakeGameCanvas");
const ctx = canvas.getContext("2d");


const gridSize = 20;
const canvasSize = 400;
const snakeColor = "#00FF00"; 
const foodColor = "#FF00FF"; 
const backgroundColor = "#222"; 
const borderColor = "#00FFFF"; 

let snake = [
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 }
]; 

let food = generateFood(); 
let direction = "RIGHT";
let score = 0;
let gameOver = false;


const gameSpeed = 100; 


document.addEventListener("keydown", function(event) {

  event.preventDefault();

  if (event.code === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.code === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.code === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.code === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
});


function generateFood() {
  const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  return { x, y };
}


function changeDirection(event) {

  event.preventDefault();

  if (event.code === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.code === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.code === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.code === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}


function moveSnake() {
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= gridSize;
  if (direction === "DOWN") head.y += gridSize;
  if (direction === "LEFT") head.x -= gridSize;
  if (direction === "RIGHT") head.x += gridSize;

  snake.unshift(head); 

  
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = generateFood(); 
  } else {
    snake.pop(); 
  }
}


function checkGameOver() {
  let head = snake[0];

  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    gameOver = true;
  }
 
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }
}


function drawSnake() {
  ctx.fillStyle = snakeColor;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }
}


function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}


function displayScore() {
  ctx.fillStyle = "#00FFFF"; 
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}


function displayGameOver() {
  ctx.fillStyle = "#fff"; 
  ctx.font = "30px Arial";
  
 
  const gameOverText = "Game Over";
  const restartText = "Press any key to Restart";

  const gameOverWidth = ctx.measureText(gameOverText).width;
  const restartWidth = ctx.measureText(restartText).width;

 
  const gameOverX = (canvasSize - gameOverWidth) / 2;
  const restartX = (canvasSize - restartWidth) / 2;

  
  const gameOverY = canvasSize / 3;
  const restartY = canvasSize / 1.8;

  
  ctx.fillText(gameOverText, gameOverX, gameOverY);
  ctx.fillText(restartText, restartX, restartY);
}


function updateGame() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    displayGameOver(); 
    return;
  }

  ctx.clearRect(0, 0, canvasSize, canvasSize); 
  moveSnake();
  checkGameOver();
  drawSnake();
  drawFood();
  displayScore();
}


function resetGame() {
  snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 }
  ]; 
  food = generateFood();
  direction = "RIGHT";
  score = 0;
  gameOver = false;
  updateGame();
}


document.addEventListener("keydown", function() {
  if (gameOver) {
    resetGame();
  }
});


const gameInterval = setInterval(updateGame, gameSpeed);
