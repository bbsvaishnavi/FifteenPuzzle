let selectedBackground = "";

// Function to handle background selection
function selectBackground(thumbnail) {
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("selected");
  });
  thumbnail.classList.add("selected");
  selectedBackground = thumbnail.dataset.image;
}

// Function to handle the Play Now button
function startGame() {
  const playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("Please enter your name before starting the game!");
    return;
  }
  if (!selectedBackground) {
    alert("Please select a background image before starting the game!");
    return;
  }
  // Save player data to localStorage
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("backgroundImage", selectedBackground);

  // Redirect to game section
  window.location.href = "game.html";
}
