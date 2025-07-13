// constants
const keyboardElem = document.querySelector(".keyboard");
const guessingWordElem = document.querySelectorAll(".letters");
let position = 0;
let count = 0;
let count2 = 0;
const guessOne = [];
const currentGuess = [];
const chosenWord = ["A", "D", "M", "I", "N"];

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
      currentGuess.push(currentLetter);
      updateLetters();
      console.log(currentGuess); // delete later
    }
  });
}

// creating delete button
const deleteButton = document.createElement("button");
deleteButton.innerText = "DELETE";
deleteButton.classList.add("del");
keyboardElem.appendChild(deleteButton);

// delete button event listener
deleteButton.addEventListener("click", function () {
  if (currentGuess.length > 0) {
    deleteLetter();
    console.log(currentGuess); // delete later
    console.log("delete clicked"); // delete later
  }
});

// creating enter button
const enterButton = document.createElement("button");
enterButton.innerText = "ENTER";
enterButton.classList.add("ent");
keyboardElem.appendChild(enterButton);

// enter button event listner
enterButton.addEventListener("click", function () {
  if (currentGuess.length === 5) {
    check();
    currentGuess.length = 0;
    count = 0;
  }
});

// update display function
function updateLetters() {
  guessingWordElem[count2].textContent = currentGuess[count];
  count++;
  count2++;
  console.log(currentGuess); // delete later
}

// delete letter function
function deleteLetter() {
  currentGuess.pop();
  count--;
  count2--;
  guessingWordElem[count].textContent = "";
}

// checking if the guess is correct function
function check() {
  for (let i = 0; i < currentGuess.length; i++)
    if (currentGuess[i] === chosenWord[i]) {
      guessingWordElem[i].style.backgroundColor = "#1bb152";
    }
}
function init() {}
init();
