const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundSpan = document.getElementById("round");
const replayBtn = document.getElementById("replay");
const playerPickDisplay = document.getElementById("player-pick");
const computerPickDisplay = document.getElementById("computer-pick");

let playerScore = 0;
let computerScore = 0;
let round = 1;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (round > 5) return;

    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();

    playerPickDisplay.textContent = getEmoji(playerChoice);
    computerPickDisplay.textContent = getEmoji(computerChoice);

    const winner = getWinner(playerChoice, computerChoice);

    if (winner === "player") {
      playerScore++;
      resultText.textContent = `You win this round! ${capitalize(playerChoice)} beats ${computerChoice}.`;
    } else if (winner === "computer") {
      computerScore++;
      resultText.textContent = `Computer wins this round! ${capitalize(computerChoice)} beats ${playerChoice}.`;
    } else {
      resultText.textContent = `It's a draw! You both chose ${playerChoice}.`;
    }

    updateUI();

    if (round === 5) {
      showFinalResult();
    } else {
      round++;
    }
  });
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }

  return "computer";
}

function updateUI() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  roundSpan.textContent = round;
}

function showFinalResult() {
  if (playerScore > computerScore) {
    resultText.textContent = "🎉 Congratulations! You won the game!";
  } else if (computerScore > playerScore) {
    resultText.textContent = "💻 Game over! Computer wins the game!";
  } else {
    resultText.textContent = "😐 It's a tie game! Try again!";
  }

  replayBtn.style.display = "inline-block";
}

// Return emoji based on player's or computer's choice
function getEmoji(choice) {
  switch (choice) {
    case "rock": return "🪨";
    case "paper": return "📄";
    case "scissors": return "✂️";
    default: return "?";
  }
}

// Capitalizes the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reset game to initial state when replay button is clicked
replayBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  updateUI();
  resultText.textContent = "Make your choice!";
  playerPickDisplay.textContent = "?";
  computerPickDisplay.textContent = "?";
  replayBtn.style.display = "none";
});
