const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');
var gameInterval = null;

function checkCollision(rock) {
  const rockTop = positionToInteger(rock.style.top);
  if (rockTop > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = (dodgerLeftEdge + 40);
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = (rockLeftEdge + 20);
    if (true === (
        ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) ||
        ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
        ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
      )) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = rock.style.top = 0;
  GAME.appendChild(rock);

  function moveRockDown() {
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock) === true) {
      return endGame();
    }
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRockDown);
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRockDown);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  location.reload();
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.preventDefault();
  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  function leftmover() {
    if (left > 0) {
      DODGER.style.left = `${left - 8}px`;
    }
  }
  window.requestAnimationFrame(leftmover);
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  function rightmover() {
    if (left < 360) {
      DODGER.style.left = `${left + 8}px`;
    }
  }
  window.requestAnimationFrame(rightmover);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
