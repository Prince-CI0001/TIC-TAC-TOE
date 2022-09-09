let boxes = document.querySelectorAll(".sq");
let turn = "X";
let gameOver = false;
let count = 0;
let changeTurn = () => {
  return turn === "X" ? "0" : "X";
};
let checkWin = () => {
  let data = document.getElementsByClassName("sq");
  let condition = [
    [0, 1, 2, 4, 4, 0],
    [3, 4, 5, 4, 10, 0],
    [6, 7, 8, 4, 18, 0],
    [0, 3, 6, -6, 12, 90],
    [1, 4, 7, 3, 12, 90],
    [2, 5, 8, 13, 12, 90],
    [0, 4, 8, 3, 12, 35],
    [2, 4, 6, 3, 12, 138],
  ];
  condition.forEach((element) => {
    if (
      data[element[0]].innerText === data[element[1]].innerText &&
      data[element[2]].innerText === data[element[1]].innerText &&
      data[element[0]].innerText !== ""
    ) {
      document.getElementsByClassName("info")[0].innerText =
        data[element[0]].innerText + " WON";
      gameOver = true;
      document.getElementById("win-gif").style.display = "block";
      document.querySelector(".line").style.width = "80%";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${element[3]}vw,${element[4]}vw) rotate(${element[5]}deg)`;
      Over();
    }
  });
};
function start(e) {
  e.target.style.backgroundColor = "#caf0f8";
  for (items of boxes) {
    items.addEventListener("click", (e) => {
      buttonText = e.target.innerText;
      count++;
      if (buttonText === "") {
        e.target.innerText = turn;
        turn = changeTurn();
        checkWin();
        if (!gameOver) {

          document.getElementsByClassName("info")[0].innerText =
            "Turn for " + turn;
          if (count == 9) {
            document.getElementsByClassName("info")[0].innerText = "DRAW";
          }
        }
      }
    });
  }
}

function Over() {
  // console.log("over");
  let boxes = document.querySelectorAll(".sq");
  for(items of boxes)
  {
    items.addEventListener('click',(e)=>{
      // e.target.setAttribute("class","stop");
      e.target.style.backgroundColor = "red";
      e.target.innerHTML = '';
      // document.getElementsByClassName("stop").innerText="sorry";
    })
  }
}
function resetGame() {
  // console.log("reset the game");
  document.getElementById("start").style.backgroundColor = "#ffe4c4";
  let val = document.querySelectorAll(".sq");
  for (i of val) i.innerHTML = "";
  turn = "X";
  gameOver = false;
  document.getElementsByClassName("info").innerText = "Turn for " + turn;
  document.querySelector(".line").style.width = "0";
  document.getElementById("win-gif").style.display = "none";
}
