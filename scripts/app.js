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

function init() {}
init();
