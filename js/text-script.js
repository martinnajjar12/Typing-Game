document.addEventListener("DOMContentLoaded", function () {
  const typedWord = document.getElementById("typedWord");
  const currentText = document.getElementById("currentText");
  const timerDiv = document.getElementById("timerDiv");
  const resetButton = document.getElementById("myBtn");
  const tryAgain = document.getElementById("tryAgain");
  const span = document.getElementById("afterEnd");
  const checkBox = document.getElementById("checkBox");
  const bgAudio = new Audio();
  bgAudio.src = "../music/audioTexting.ogg";

  function check() {
    let textValue = typedWord.value;
    let currentLetter = currentText.innerText.substring(0, textValue.length);
    if (currentLetter == textValue) {
      typedWord.style.borderColor = "greenyellow";
    } else {
      typedWord.style.borderColor = "red";
    }
  }

  function stopWatch() {
    let popUp = document.getElementById("popUp");
    let popBox = document.getElementById("popBox");
    var mS = 00,
      s = 00,
      m = 00;
    var timer;

    this.run = function () {
      if (timer == null) {
        timer = setInterval(start, 10);
      }
    };

    function start() {
      mS++;
      if (mS > 99) {
        mS = 0;
        s++;
        if (s > 59) {
          s = 0;
          m++;
        }
      }
      timerDiv.innerText =
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        "," +
        (mS < 10 ? "0" + mS : mS);
    }

    this.stop = function () {
      var uiTime =
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        "," +
        (mS < 10 ? "0" + mS : mS);
      clearInterval(stopperInterval);
      span.insertAdjacentHTML("afterend", uiTime);
      popUp.style.display = "block";
      popBox.style.display = "block";
      clearInterval(timer);
      checkBox.checked = false;
      bgMusic.stopBgMusic();
    };

    this.reset = function () {
      clearInterval(timer);
      timer = null;
      m = 0;
      s = 0;
      mS = 0;
      timerDiv.innerText =
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        "," +
        (mS < 10 ? "0" + mS : mS);
      typedWord.value = null;
      popUp.style.display = "none";
      popBox.style.display = "none";
      typedWord.style.borderColor = "greenyellow";
      checkBox.checked = false;
      bgMusic.stopBgMusic();
    };
  }

  var watch = new stopWatch();
  var stopperInterval = setInterval(stopperCheck, 10);
  function stopperCheck() {
    if (typedWord.value == currentText.innerText) {
      watch.stop();
    }
  }

  function toggleBgMusic() {
    this.stopBgMusic = function () {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
    this.playBgMusic = function () {
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

  document.addEventListener("keyup", check);
  document.addEventListener("keypress", watch.run);
  resetButton.addEventListener("click", watch.reset);
  tryAgain.addEventListener("click", watch.reset);
  checkBox.addEventListener("click", startMusic);
});
