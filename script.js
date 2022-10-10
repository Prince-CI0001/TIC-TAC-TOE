let boxes = document.querySelectorAll(".sq");
let turn = "X";
let gameOver = false;
let count = 0;

let fullPostRequest = "";
let postBaseApiLink = "https://localhost:7279/api/Game?location=";
let getEmptyMatrix = "https://localhost:7279/api/Game";

let checkWin = () => {
  console.log("hello");
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
      document.querySelector(".line").style.transform = `translate(${element[3]}vw,${element[4]}vw) rotate(${element[5]}deg)`;
    }
  });
};
async function start(e) {
  e.target.style.backgroundColor = "#caf0f8";
  for (items of boxes) {
    items.addEventListener("click", async (e) => {
      buttonText = e.target.innerText;
      count++;
      let cordinate = e.target.id;
      fullPostRequest = postBaseApiLink + cordinate;
      if (buttonText === "") {
        e.target.innerText = "X";
        checkWin();


       const response =  await fetch(fullPostRequest, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        response.json().then((data)=>{
        //  console.log(data);
        //  console.log(title);
        let title;
        if(data != null)
        {
          title = data.Id;
          console.log(title);
            document.getElementById(title).innerText="O";
          count++;
          checkWin();
        }
          return data.Id;
        })
        .catch(error => console.error('Unable to add item.', error));

        if (!gameOver) {
          document.getElementsByClassName("info")[0].innerText =
            "Turn for " + 'X';
          if (count == 9) {
            document.getElementsByClassName("info")[0].innerText = "DRAW";
          }
        }
      }
    });
  }
}

function resetGame() {
  // console.log("reset the game");
  EmptyMatrix();
  document.getElementById("start").style.backgroundColor = "#ffe4c4";
  let val = document.querySelectorAll(".sq");
  for (i of val){
    i.innerHTML = "";
    i.style.backgroundColor="#eeb1b1";
  }
  gameOver = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + 'X';
  document.querySelector(".line").style.width = "0";
  document.getElementById("win-gif").style.display = "none";
}


let EmptyMatrix = async () => {

  await fetch(getEmptyMatrix).then(data => {
    console.log(data);
    return data.json();
  }).catch(error => console.error("error:" , error));

}
