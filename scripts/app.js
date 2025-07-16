import { wordList } from "./data.js";

// CONSTANTS
const keyboardElem = document.querySelector(".keyboard");
const keysElem = document.querySelectorAll(".keys");
const deleteButtonElem = document.querySelector(".del");
const enterButtonElem = document.querySelector(".ent");
const guessingWordElem = document.querySelectorAll(".letters");
const themeSwitchElem = document.querySelector(".theme-switch");
const bodyElem = document.querySelector("body");
const hintElem = document.querySelector("#hint");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const howToPlayModal = document.getElementById("howToPlayModal");
const HTPCloseBTN = document.querySelector(".HTP-close-btn");
const endGameModalElem = document.getElementById("end-game-modal");
const endGameCloseBTN = document.querySelector(".end-game-close-btn");
const endGameMessageH1Elem = document.querySelector("#end-game-message-h1");
const endGameMessageParaElem = document.querySelector("#end-game-message-p");
const playAgainBTN = document.querySelector("#play-again");

// VARIABLES
let arrayCount = 0;
let displayCount = 0;
let wordCount = 0;
let greenCount = 0;
let currentLetter;
let chosenWord;
let stringChosenWord;
let randomNum;
const currentGuess = [];

// FUNCTIONS

// choose random word from word list
function chooseRandWord() {
  randomNum = Math.floor(Math.random() * wordList.length);
  chosenWord = wordList[randomNum][0];
  console.log(chosenWord);
}
// update display function
function addLetters() {
  if (currentGuess.length < 5 && greenCount != 5 && wordCount < 6) {
    currentGuess.push(currentLetter);
    guessingWordElem[displayCount].textContent = currentGuess[arrayCount];
    arrayCount++;
    displayCount++;
  }
}

// delete letter function
function deleteLetter() {
  if (currentGuess.length > 0 && greenCount != 5) {
    currentGuess.pop();
    arrayCount--;
    displayCount--;
    guessingWordElem[displayCount].textContent = "";
  }
}
// checking if the player's guess is correct function
function checkGuess() {
  if (currentGuess.length === 5) {
    // counting the amount of times each letter is repeated in the chosen word
    const checkingDupArr = {};
    chosenWord.forEach(function (l) {
      if (checkingDupArr[l] === undefined) {
        checkingDupArr[l] = 1;
      } else {
        checkingDupArr[l]++;
      }
    });

    const result = Array(5).fill("gray");
    const displayOrder = displayCount - 5;
    // checks if guess is green (right letter, right position)
    for (let i = 0; i < 5; i++) {
      if (currentGuess[i] === chosenWord[i]) {
        result[i] = "green";
        checkingDupArr[currentGuess[i]]--;
      }
    }

    // checks if guess is orange (right letter, wrong position)
    for (let i = 0; i < 5; i++) {
      if (checkingDupArr[currentGuess[i]] > 0 && result[i] === "gray") {
        result[i] = "orange";
        checkingDupArr[currentGuess[i]]--;
      }
    }
    // coloring the guessing boxes
    for (let i = 0; i < 5; i++) {
      if (result[i] === "green") {
        guessingWordElem[displayOrder + i].style.backgroundColor = "#6aaa64";
        greenCount++;
      } else if (result[i] === "orange") {
        guessingWordElem[displayOrder + i].style.backgroundColor = "#c9b458";
      } else
        guessingWordElem[displayOrder + i].style.backgroundColor = "#787c7e";
    }
    wordCount++;
    currentGuess.length = 0;
    arrayCount = 0;
    // show hint
    if (wordCount <= 3 && greenCount === 5) {
      hintElem.textContent = "YOU WON WITHOUT USING ME! ಠ_ಠ";
    } else if (wordCount > 2 && greenCount !== 5) {
      hintElem.textContent = wordList[randomNum][1];
    }
    if (greenCount !== 5) {
      greenCount = 0;
    }
    showAnswer();
  }
}
function showAnswer() {
  stringChosenWord = chosenWord.join("");

  // winning message
  if (greenCount === 5) {
    endGameMessageH1Elem.style.color = "#6aaa64";
    endGameMessageH1Elem.textContent = "YOU WON!";
    endGameModalElem.style.display = "block";
  }
  // losing message
  if (wordCount === 6 && greenCount !== 5) {
    endGameMessageH1Elem.style.color = "red";
    endGameMessageH1Elem.textContent = "YOU LOST!";
    endGameModalElem.style.display = "block";
  }
  endGameMessageParaElem.textContent =
    "The selected word was: " + stringChosenWord;

  endGameCloseBTN.addEventListener("click", function () {
    endGameModalElem.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === endGameModalElem) {
      endGameModalElem.style.display = "none";
    }
  });
}

function clearGuess(i) {
  guessingWordElem[i].style.backgroundColor = "var(--base-color)";
  guessingWordElem[i].textContent = "";
  hintElem.textContent = "After the 3rd Guess";
}
// EVENT LISTENERS

// keyboard input event listener
document.addEventListener("keydown", function (event) {
  if (event.key >= "a" && event.key <= "z") {
    currentLetter = event.key.toUpperCase();
    addLetters();
  }
  if (event.key === "Backspace") {
    deleteLetter();
  } else if (event.key === "Enter") {
    checkGuess();
  }
});
// in-screen keyboard event listener
keysElem.forEach((element) => {
  element.addEventListener("click", function () {
    currentLetter = element.textContent;
    addLetters();
  });
});

// in-screen delete button event listener
deleteButtonElem.addEventListener("click", function () {
  deleteLetter();
});

// in-screen enter button event listner
enterButtonElem.addEventListener("click", function () {
  checkGuess();
});

// added page theme switch (light mode/dark mode)
themeSwitchElem.addEventListener("click", function (event) {
  if (event.target.checked === true) {
    bodyElem.classList.add("darkmode");
  } else {
    bodyElem.classList.remove("darkmode");
  }
});

// Open modal
howToPlayBtn.addEventListener("click", function () {
  howToPlayModal.style.display = "block";
});

// Close modal when clicking the X
HTPCloseBTN.addEventListener("click", function () {
  howToPlayModal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target === howToPlayModal) {
    howToPlayModal.style.display = "none";
  }
});

playAgainBTN.addEventListener("click", init);

function init() {
  for (let i = 0; i < displayCount; i++) {
    clearGuess(i);
  }
  arrayCount = 0;
  displayCount = 0;
  wordCount = 0;
  greenCount = 0;
  currentLetter;
  chosenWord;
  stringChosenWord;
  randomNum;
  currentGuess.length = 0;

  chooseRandWord();
}
init();
