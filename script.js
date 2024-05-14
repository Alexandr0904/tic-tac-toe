let cards = document.querySelectorAll(".card");
let scoreX = document.querySelector(".score-x");
let scoreO = document.querySelector(".score-o");
let scoreDraft = document.querySelector(".score-draft");
let playBtn = document.querySelector(".play__btn");
let player = "X";
let disable = false;
let winPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
cards.forEach((card) => {
  card.onclick = cardClick;
});
playBtn.onclick = restartGame;
function cardClick(event) {
  let card = event.target; // элемент на котором произошло событие клика
  if (card.innerHTML == "" && !disable) {
    card.innerHTML = player;
    checkWin(player);
    checkDraw();
    if (player == "X") {
      player = "O";
    } else {
      player = "X";
    }
  }
}
function checkWin(player) {
  winPositions.forEach((position) => {
    let box1 = document.getElementById(position[0]); // получить HTML элемент по его Id
    let box2 = document.getElementById(position[1]);
    let box3 = document.getElementById(position[2]);

    if (
      box1.innerHTML == player &&
      box2.innerHTML == player &&
      box3.innerHTML == player
    ) {
      box1.classList.add("box-win");
      box2.classList.add("box-win");
      box3.classList.add("box-win");
      setTimeout(() => {
        alert(`Winner:${player}`);
        playBtn.classList.add("btn-active");

        changeScore(player);
      }, 1000);

      disable = true;
    }
  });
}
function checkDraw() {
  let count = 0;
  cards.forEach((card) => {
    if (card.innerHTML != "") {
      count++;
    }
  });
  if (count == cards.length) {
    setTimeout(() => {
      alert(`draw!`);
      playBtn.classList.add("btn-active");

      changeScore();
    }, 1000);

    disable = true;
  }
}
function changeScore(player) {
  if (player == "X") {
    scoreX.innerHTML = +scoreX.innerHTML + 1;
  } else if (player == "O") {
    scoreO.innerHTML = +scoreO.innerHTML + 1;
  } else {
    scoreDraft.innerHTML = +scoreDraft.innerHTML + 1;
  }
}
function restartGame() {
  playBtn.classList.remove("btn-active");
  disable = false;
  player = "X";
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove("box-win");
  });
}
