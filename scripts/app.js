const keyboardElem = document.querySelector(".keyboard");
for (let i = 65; i <= 90; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardElem.appendChild(button);
  button.addEventListener("click", function (event) {
    event.target.innerText = String.fromCharCode(i);
    cuurentLetter = event.target.innerText;
    init();
  });
}
const deleteButton = document.createElement("button");
deleteButton.innerText = "DELETE";
deleteButton.classList.add("del");
keyboardElem.appendChild(deleteButton);

const enterButton = document.createElement("button");
enterButton.innerText = "ENTER";
enterButton.classList.add("ent");
keyboardElem.appendChild(enterButton);
function init() {}
init();
