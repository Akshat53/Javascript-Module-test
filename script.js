setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);
let userScore = 0;
let computerScore = 0;

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
let score = 0;

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const compChoice = computerChoice();
  displayResults([choice, compChoice]);
  displayWinner([choice, compChoice]);
}

function computerChoice() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".next-btn").style.display = "none";
  document.querySelector(".results").style.display="none";

  document.querySelector(".win").style.display = "flex";
});
function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 100);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}
function toggleNextButton() {
  const nextBtn = document.querySelector(".next-btn");
  if (userScore > 0) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
}
function initializeScores() {
  const storedUserScore = localStorage.getItem("userScore");
  const storedComputerScore = localStorage.getItem("computerScore");

  if (storedUserScore) {
    userScore = parseInt(storedUserScore);
    const userScoreElement = document.querySelector(".score__number");
    userScoreElement.innerText = userScore;
  }

  if (storedComputerScore) {
    computerScore = parseInt(storedComputerScore);
    const computerScoreElement = document.querySelector(
      ".computer_score__number"
    );
    computerScoreElement.innerText = computerScore;
  }
}

initializeScores();

function saveScores() {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const compWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (compWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 300);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}
function keepScore(point) {
  score += point;

  if (point === 1) {
    const userScoreElement = document.querySelector(".score__number");
    userScoreElement.innerText = parseInt(userScoreElement.innerText) + 1;
    userScore++;

    if (userScore > 0) {
      const nextBtn = document.querySelector(".next-btn");
      nextBtn.style.display = "block";
    }
  } else if (point === -1) {
    const computerScoreElement = document.querySelector(
      ".computer_score__number"
    );
    computerScoreElement.innerText =
      parseInt(computerScoreElement.innerText) + 1;
    computerScore++;
  }

  saveScores();
}



const winPlayAgainBtn = document.querySelector(".winPlayAgain");
winPlayAgainBtn.addEventListener("click", () => {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".next-btn").style.display = "block";

  document.querySelector(".win").style.display = "none";
});

playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  document.querySelector(".win").style.display = "none";
});

function toggleWinDisplay(show) {
  const winSection = document.querySelector(".win");
  winSection.style.display = show ? "flex" : "none";
}

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
