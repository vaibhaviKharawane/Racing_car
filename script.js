const gameArea = document.querySelector('.gameArea');
const car = document.querySelector('.car');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

let gameRunning = false;
let player = { speed: 5, score: 0 };

document.addEventListener('keydown', moveCar);

startBtn.addEventListener('click', startGame);

function startGame() {
  gameRunning = true;
  player.score = 0;
  gameArea.innerHTML = '';
  gameArea.appendChild(car);
  car.style.left = '125px';
  player.x = car.offsetLeft;

  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.top = (i * 200) * -1 + 'px';
    enemy.style.left = Math.floor(Math.random() * 250) + 'px';
    gameArea.appendChild(enemy);
  }

  window.requestAnimationFrame(playGame);
}

function playGame() {
  if (!gameRunning) return;

  let enemies = document.querySelectorAll('.enemy');

  enemies.forEach(enemy => {
    let eTop = enemy.offsetTop + player.speed;
    if (eTop > 500) {
      eTop = -100;
      enemy.style.left = Math.floor(Math.random() * 250) + 'px';
      player.score++;
      scoreDisplay.textContent = player.score;
    }
    enemy.style.top = eTop + 'px';

    if (isCollide(car, enemy)) {
      endGame();
    }
  });

  window.requestAnimationFrame(playGame);
}

function moveCar(e) {
  if (!gameRunning) return;
  if (e.key === 'ArrowLeft' && player.x > 0) {
    player.x -= 10;
  }
  if (e.key === 'ArrowRight' && player.x < 250) {
    player.x += 10;
  }
  car.style.left = player.x + 'px';
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  gameRunning = false;
  alert(`Game Over! Your score: ${player.score}`);
}
