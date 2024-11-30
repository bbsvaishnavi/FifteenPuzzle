"use strict";

let hasShuffled = false; // Tracks whether the player has shuffled the puzzle
const emptySpace = { x: 300, y: 300 }; // Initial empty space position
let timerInterval; // Timer interval reference
let secondsElapsed = 0; // Total seconds elapsed
let movesCount = 0; // Number of moves made

window.onload = function () {
  const playerName = localStorage.getItem("playerName") || "Player";
  const backgroundImage = localStorage.getItem("backgroundImage") || "bg1.jpg";

  // Display greeting
  document.getElementById("player-greeting").textContent = `Welcome, ${playerName}!`;

  // Apply background image and set initial positions for tiles
  const tiles = document.querySelectorAll("#puzzlearea div");
  tiles.forEach((tile, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;

    tile.style.backgroundImage = `url(${backgroundImage})`;
    tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    tile.style.left = `${col * 100}px`;
    tile.style.top = `${row * 100}px`;
    tile.classList.add("puzzlepiece");
  });

  // Shuffle button functionality
  document.getElementById("shufflebutton").onclick = function () {
    shuffleTiles();
    if (!hasShuffled) {
      hasShuffled = true; // Allow tile movement after first shuffle
    }
  };

  // Start the timer when the game page loads
  startTimer();

  // Make tiles movable
  makeTilesMovable();
};

// Timer logic
function startTimer() {
  clearInterval(timerInterval); // Clear any existing timer
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Increment the move counter
function incrementMoveCounter() {
  movesCount++;
  document.getElementById("moves").textContent = movesCount;
}

// Reset the game stats (timer and moves)
function resetGameStats() {
  stopTimer(); // Stop the timer
  secondsElapsed = 0; // Reset time
  movesCount = 0; // Reset moves
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("moves").textContent = "0";
}

// Make tiles movable
function makeTilesMovable() {
  const tiles = document.querySelectorAll("#puzzlearea div");
  tiles.forEach((tile) => {
    tile.onmouseover = function () {
      if (hasShuffled) {
        this.classList.add("movablepiece");
      }
    };
    tile.onmouseout = function () {
      this.classList.remove("movablepiece");
    };
    tile.onclick = function () {
      if (hasShuffled) {
        moveTile(this);
        incrementMoveCounter(); // Increment moves when a tile is moved
      } else {
        alert("You must shuffle the puzzle before starting!");
      }
    };
  });
}

function moveTile(tile) {
  const tileX = parseInt(tile.style.left);
  const tileY = parseInt(tile.style.top);

  // Check if the tile is adjacent to the empty space
  if (
    (Math.abs(tileX - emptySpace.x) === 100 && tileY === emptySpace.y) ||
    (Math.abs(tileY - emptySpace.y) === 100 && tileX === emptySpace.x)
  ) {
    // Swap positions
    tile.style.transition = "all 0.3s ease";
    tile.style.left = `${emptySpace.x}px`;
    tile.style.top = `${emptySpace.y}px`;

    // Update empty space
    emptySpace.x = tileX;
    emptySpace.y = tileY;
  }
}

function shuffleTiles() {
  const tiles = Array.from(document.querySelectorAll("#puzzlearea div"));
  let shuffleCount = 100;

  while (shuffleCount > 0) {
    const movableTiles = tiles.filter((tile) => isAdjacent(tile));
    const randomTile =
      movableTiles[Math.floor(Math.random() * movableTiles.length)];
    moveTile(randomTile);
    shuffleCount--;
  }
}

// Helper function to check if a tile is adjacent to the empty space
function isAdjacent(tile) {
  const tileX = parseInt(tile.style.left);
  const tileY = parseInt(tile.style.top);
  return (
    (Math.abs(tileX - emptySpace.x) === 100 && tileY === emptySpace.y) ||
    (Math.abs(tileY - emptySpace.y) === 100 && tileX === emptySpace.x)
  );
}

// Navigate back to the home page
function goHome() {
  resetGameStats(); // Reset timer and moves when going home
  window.location.href = "index.html";
}
