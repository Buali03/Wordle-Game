// Creating the keyboard keys
const keyboardElem = document.querySelector(".keyboard");
const wordOne1Elem = document.querySelector("#one");
const wordOne2Elem = document.querySelector("#two");
const wordOne3Elem = document.querySelector("#three");
const wordOne4Elem = document.querySelector("#four");
const wordOne5Elem = document.querySelector("#five");
const guessOne = [];
const currentGuess = [];

for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.classList.add("key");
  keyboardElem.appendChild(button);
  button.addEventListener("click", function (event) {
    currentLetter = String.fromCharCode(i);
    if (currentGuess.length < 5) {
      currentGuess.push(currentLetter);
      updateLetters();
      console.log(currentGuess);
    }
  });
}
const deleteButton = document.createElement("button");
deleteButton.innerText = "DELETE";
deleteButton.classList.add("del");
keyboardElem.appendChild(deleteButton);

deleteButton.addEventListener("click", function () {
  currentGuess.pop();
  updateLetters();
  console.log(currentGuess);
  console.log("delete clicked");
});

const enterButton = document.createElement("button");
enterButton.innerText = "ENTER";
enterButton.classList.add("ent");
keyboardElem.appendChild(enterButton);

function render() {}
// enterButton.addEventListener("click", function () {
//   if (currentGuess.length === 5) {
//   }
// });
function updateLetters() {
  wordOne1Elem.textContent = currentGuess[0];
  wordOne2Elem.textContent = currentGuess[1];
  wordOne3Elem.textContent = currentGuess[2];
  wordOne4Elem.textContent = currentGuess[3];
  wordOne5Elem.textContent = currentGuess[4];
}
function init() {
  //   const guessElem = document.querySelector();
  render();
}
init();
