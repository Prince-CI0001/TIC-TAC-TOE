// console.log("hiee");
let boxes = document.querySelectorAll(".sq");
let turn = "X";
let gameOver = false;
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
            return;
        }
    });
};
function start() {
    for (items of boxes) {
        items.addEventListener("click", (e) => {
            buttonText = e.target.innerText;
            if (buttonText === "") {
                e.target.innerText = turn;
                console.log(buttonText);
                turn = changeTurn();
                checkWin();
                if (!gameOver) {
                    console.log(gameOver);
                    document.getElementsByClassName("info")[0].innerText =
                        "Turn for " + turn;
                }
            }
        });
    }
}

function Over() {
    const foo = document.querySelector(".sq");
    foo.addEventListener("click", (event) => {
        event.preventDefault();
    });
}
function resetGame() {
    // console.log("reset the game");

    let val = document.querySelectorAll(".sq");
    for (i of val) i.innerHTML = "";
    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".line").style.width = "0";
    document.getElementById("win-gif").style.display = "none";
}
