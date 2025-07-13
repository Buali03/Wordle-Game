// Creating the keyboard keys
const keyboardElem = document.querySelector(".keyboard");
const letterElem = document.querySelector(".letters");
const guessOne = [];
const currentGuess = [];

for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.classList.add("key");
  keyboardElem.appendChild(button);

  button.addEventListener("click", function (event) {
    event.target.innerText = String.fromCharCode(i);
    currentLetter = event.target.innerText;
    if (currentGuess.length < 5) {
      currentGuess.push(currentLetter);
      letterElem.textContent = currentLetter;
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
  console.log(currentGuess);
  console.log("delete clicked");
});

const enterButton = document.createElement("button");
enterButton.innerText = "ENTER";
enterButton.classList.add("ent");
keyboardElem.appendChild(enterButton);

// enterButton.addEventListener("click", function () {
//   if (currentGuess.length === 5) {
//   }
// });

function init() {
  //   const guessElem = document.querySelector();
}
init();
