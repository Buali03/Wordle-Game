import { wordList } from "./data.js";

// CONSTANTS
const keyboardElem = document.querySelector(".keyboard");
const guessingWordElem = document.querySelectorAll(".letters");
const themeSwitchElem = document.querySelector(".theme-switch");
const bodyElem = document.querySelector("body");
const hintElem = document.querySelector("#hint");

// VARIABLES
let arrayCount = 0;
let displayCount = 0;
let wordCount = 0;
let greenCount = 0;
let currentLetter;
let chosenWord;
let randomNum;
const currentGuess = [];

// creating keyboard buttons
for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.classList.add("key");
  keyboardElem.appendChild(button);

  // letter buttons event listener
  button.addEventListener("click", function (event) {
    currentLetter = String.fromCharCode(i);
    addLetters();
  });
}

// creating delete button
const deleteButton = document.createElement("button");
deleteButton.innerText = "DELETE";
deleteButton.classList.add("del");
keyboardElem.appendChild(deleteButton);

// creating enter button
const enterButton = document.createElement("button");
enterButton.innerText = "ENTER";
enterButton.classList.add("ent");
keyboardElem.appendChild(enterButton);

// FUNCTIONS

function chooseRandWord() {
  randomNum = Math.floor(Math.random() * wordList.length);
  console.log(randomNum);
  chosenWord = wordList[randomNum][0];
  console.log(chosenWord);
}
// update display function
function addLetters() {
  if (currentGuess.length < 5 && greenCount != 5) {
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
    if (greenCount === 5) {
      console.log("YOU WIN");
    } else {
      greenCount = 0;
    }
    wordCount++;
    currentGuess.length = 0;
    arrayCount = 0;
    if (wordCount > 2) {
      hintElem.textContent = wordList[randomNum][1];
    }
  }
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

// delete button event listener
deleteButton.addEventListener("click", function () {
  deleteLetter();
});

// enter button event listner
enterButton.addEventListener("click", function () {
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
function init() {
  chooseRandWord();
}
init();
