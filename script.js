const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const circles = document.querySelectorAll(".circle");
const score = document.querySelector("#score");
const closeBtn = document.querySelector("#close");
const overlay = document.querySelector("#overlay");
const endResult = document.querySelector("#endResult");

const eating = document.querySelector("#eating");
const start = document.querySelector("#startgame");

let scoreNow = 0;
let active = 0;
let timer;
let pace = 1000;
let rounds = 0;

// circles.disabled = true;

stopBtn.style.visibility = "hidden";
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

const clickCircle = (i) => {
  eating.play();
  if (i !== active) {
    return endGame();
  } else {
    scoreNow++;
    rounds--;
    return (score.textContent = scoreNow);
  }
};

const startGame = (e) => {
  if (rounds >= 3) {
    return stopGame();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].style["pointer-events"] = "auto";
  }
  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;

  console.log("current active num:", active);

  timer = setTimeout(startGame, pace);

  pace = pace - 10;

  rounds++;

  function pickNew(active) {
    //below parameter of the function going with the index number to make it easy
    let nextActive = getRndInteger(0, 3);
    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
  circles.disabled = true;
  startBtn.style.visibility = "hidden";
  stopBtn.style.visibility = "visible";
};
const stopGame = (e) => {
  start.play();
  overlay.style.visibility = "visible";
  endResult.textContent = `I only eat ${scoreNow}. Still hungry, May I have more Pleaseee!`;
  clearTimeout(timer);
};

const resetGame = () => {
  window.location.reload();
};

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
closeBtn.addEventListener("click", resetGame);
