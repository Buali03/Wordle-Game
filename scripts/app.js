// CONSTANTS
const keyboardElem = document.querySelector(".keyboard");
const guessingWordElem = document.querySelectorAll(".letters");
const themeSwitchElem = document.querySelector(".theme-switch");
const bodyElem = document.querySelector("body");

// VARIABLES
let arrayCount = 0;
let displayCount = 0;
let wordCount = 0;
const checkingDupArr = [];
const currentGuess = [];
const chosenWord = ["A", "R", "R", "O", "W"];

// creating keyboard buttons
for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.classList.add("key");
  keyboardElem.appendChild(button);

  // letter buttons event listener
  button.addEventListener("click", function (event) {
    currentLetter = String.fromCharCode(i);
    if (currentGuess.length < 5) {
      addLetters();
    }
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

// update display function
function addLetters() {
  currentGuess.push(currentLetter);
  guessingWordElem[displayCount].textContent = currentGuess[arrayCount];
  arrayCount++;
  displayCount++;
}

// delete letter function
function deleteLetter() {
  currentGuess.pop();
  arrayCount--;
  displayCount--;
  guessingWordElem[displayCount].textContent = "";
}

// checking if the player's guess is correct function
function checkGuess() {
  // counting the amount of times each letter is repeated in the chosen word
  const counts = {};
  chosenWord.forEach(function (let) {
    if (counts[let] === undefined) {
      counts[let] = 1;
    } else {
      counts[let]++;
    }
  });

  const result = Array(5).fill("gray");
  const displayOrder = displayCount - 5;

  // checks if guess is green (right letter, right position)
  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === chosenWord[i]) {
      result[i] = "green";
      counts[currentGuess[i]]--;
    }
  }

  // checks if guess is orange (right letter, wrong position)
  for (let i = 0; i < 5; i++) {
    if (counts[currentGuess[i]] > 0 && result[i] === "gray") {
      result[i] = "orange";
      counts[currentGuess[i]]--;
    }
  }

  // coloring the guessing boxes
  for (let i = 0; i < 5; i++) {
    if (result[i] === "green") {
      guessingWordElem[displayOrder + i].style.backgroundColor = "#6aaa64";
    } else if (result[i] === "orange") {
      guessingWordElem[displayOrder + i].style.backgroundColor = "#c9b458";
    } else guessingWordElem[displayOrder + i].style.backgroundColor = "#787c7e";
  }

  wordCount++;
  currentGuess.length = 0;
  arrayCount = 0;
}

// EVENT LISTENERS

// delete button event listener
deleteButton.addEventListener("click", function () {
  if (currentGuess.length > 0) {
    deleteLetter();
  }
});

// enter button event listner
enterButton.addEventListener("click", function () {
  if (currentGuess.length === 5) {
    checkGuess();
  }
});

// added page theme switch (light mode/dark mode)
themeSwitchElem.addEventListener("click", function (event) {
  if (event.target.checked === true) {
    bodyElem.classList.add("darkmode");
  } else {
    bodyElem.classList.remove("darkmode");
  }
});
function init() {}
init();
