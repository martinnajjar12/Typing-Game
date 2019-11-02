document.addEventListener("DOMContentLoaded", function() {
  const currentWord = document.getElementById("currentWord");
  const typedWord = document.getElementById("typedWord");
  const scoreElem = document.getElementById("score");
  const timeElem = document.getElementById("time");
  const checkBox = document.getElementById("checkBox");
  const tryAgain = document.getElementById("tryAgain");
  const popUp = document.getElementById("popUp");
  const popBox = document.getElementById("popBox");
  const beforeEnd = document.getElementById("beforeEnd");
  const bgAudio = new Audio();
  bgAudio.src = "../music/audioWord.ogg";
  let score = 0,
    isPlaying,
    decrease,
    executed = false,
    mS = 99,
    s = 4;
  const words = [
    "value",
    "code",
    "continue",
    "variable",
    "constant",
    "purpose",
    "play",
    "reset",
    "innerHTML",
    "innerText",
    "insertAdjacentHTML",
    "pause",
    "current",
    "word",
    "Hello",
    "1MAC",
    "Udacity",
    "UAE",
    "Egypt",
    "Iraq",
    "Lebanon",
    "Algeria",
    "Morrocco",
    "Tunisia",
    "Libya",
    "Sudan",
    "KSA",
    "Syria",
    "Palestine",
    "Jordan",
    "Kuwait",
    "Bahrain",
    "Yemen",
    "prevent",
    "main",
    "aside",
    "navigation",
    "bar",
    "bold",
    "center",
    "color",
    "background",
    "style",
    "filter",
    "opacity",
    "rotate",
    "translate",
    "transform",
    "transfer",
    "transport",
    "class",
    "head",
    "body",
    "pretty",
    "something",
    "opportunity",
    "peace",
    "love",
    "grace",
    "faith",
    "fate",
    "face",
    "child",
    "son",
    "Sao Paulo",
    "Milano",
    "New York",
    "Manhattan",
    "Rome",
    "Prague",
    "Stockholm",
    "Venice",
    "Michigan",
    "Baghdad",
    "car",
    "bus",
    "van",
    "train",
    "railway",
    "toys",
    "fly",
    "Dinosaur",
    "Heaven",
    "wonderful",
    "great",
    "sample",
    "urgent",
    "Hope"
  ];

  function toggleBgMusic() {
    this.stopBgMusic = function() {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
    this.playBgMusic = function() {
      bgAudio.play();
      bgAudio.loop = true;
    };
  }

  var bgMusic = new toggleBgMusic();

  function startMusic() {
    if (checkBox.checked) {
      bgMusic.playBgMusic();
    } else {
      bgMusic.stopBgMusic();
    }
  }

  function randomizer() {
    var randomNO = Math.floor(Math.random() * words.length);
    currentWord.innerText = words[randomNO];
  }

  function main() {
    if (!executed) {
      isPlaying = true;
      interval();
      checking();
      setInterval(checking, 10);
      executed = true;
    }
  }

  function interval() {
    if (isPlaying == true) {
      decrease = setInterval(decreasingTime, 10);
      isPlaying = false;
    }
  }

  function checking() {
    if (typedWord.value == currentWord.innerText) {
      score++;
      mS = 99;
      s = 4;
      typedWord.value = "";
      randomizer();
      scoreElem.innerText = score;
      isPlaying = true;
    }
  }

  function decreasingTime() {
    mS--;
    if (mS < 9) {
      timeElem.innerText = "0" + s + "," + "0" + mS;
    } else {
      timeElem.innerText = "0" + s + "," + mS;
    }
    if (mS == 0) {
      mS = 99;
      s--;
    } else if (s == -1) {
      timeElem.innerText = "00,00";
      beforeEnd.insertAdjacentText("beforeend", score);
      popUp.style.display = "block";
      popBox.style.display = "block";
      clearInterval(decrease);
      isPlaying = false;
      bgMusic.stopBgMusic();
      checkBox.checked = false;
    }
  }

  function tryAgainFunc() {
    popUp.style.display = "none";
    popBox.style.display = "none";
    typedWord.value = "";
    score = 0;
    mS = 99;
    s = 4;
    scoreElem.innerText = score;
    timeElem.innerText = "05,00";
    randomizer();
    checkBox.checked = false;
    executed = false;
    beforeEnd.innerText = "Your score is: ";
  }

  randomizer();

  checkBox.addEventListener("click", startMusic);
  document.addEventListener("keypress", main);
  tryAgain.addEventListener("click", tryAgainFunc);
});
