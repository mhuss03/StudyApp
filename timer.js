const clock = document.querySelector(".clock");
const start = document.querySelectorAll(".start");
const reset = document.querySelectorAll(".reset");
const back = document.querySelectorAll(".back");

const optionList = document.querySelector(".options-container");

const stopwatchOption = document.querySelector(".stopwatch-option");
const stopwatchContainer = document.querySelector(".stopwatch-container");

const timerOption = document.querySelector(".timer-option");
const timerContainer = document.querySelector(".timer-container");

const fiveMin = document.querySelector(".five-min");
const tenMin = document.querySelector(".ten-min");

let state = 0;

let hour = 0;
let min = 0;
let sec = 0;

/* *** inititalise *** */
updateclock();

/* **  Choosing Stopwatch or Timer **/
stopwatchOption.addEventListener("click", () => {
  optionList.classList.add("hide");
  stopwatchContainer.classList.remove("hide");
});

timerOption.addEventListener("click", () => {
  optionList.classList.add("hide");
  timerContainer.classList.remove("hide");
});

/* Functions to Update count Start Stop Clock */
function updateclock() {
  clock.innerHTML = `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function count(dir) {
  if (dir === 0) {
    sec++;
    if (sec > 59) {
      min++;
      sec = 0;
    }
    if (min > 59) {
      hour++;
      min = 0;
    }
  } else if (dir === 1 && (min > 0 || hour > 0)) {
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
    }
    if (min < 0 && hour > 0) {
      hour--;
      min = 59;
    }
  }
}

function startclock(upDown) {
  interval = setInterval(() => {
    count(upDown);
    updateclock();
  }, 1000);
}

function stopclock() {
  clearInterval(interval);
  updateclock();
}

/* StopWatch Start Stop Reset */
start.forEach((button) =>
  button.addEventListener("click", () => {
    let upDown;
    if (timerContainer.classList.contains("hide")) {
      upDown = 0;
    } else {
      upDown = 1;
    }
    if (state === 0) {
      startclock(upDown);
      state = 1;
      button.classList.add("off");
      button.value = "Stop";
    } else if (state === 1) {
      stopclock(upDown);
      state = 0;
      button.classList.remove("off");
      button.value = "Start";
    }
  })
);

/* Reset Implementation */

reset.forEach((element) =>
  element.addEventListener("click", () => {
    hour = 0;
    min = 0;
    sec = 0;
    updateclock();
    stopclock();

    state = 0;
    if (stopwatchContainer.classList.contains("hide")) {
      start[1].classList.remove("off");
      start[1].value = "Start";
    } else if (timerContainer.classList.contains("hide")) {
      start[0].classList.remove("off");
      start[0].value = "Start";
    }
  })
);

/* Go Back Implementation */

back.forEach((element) =>
  element.addEventListener("click", () => {
    stopwatchContainer.classList.add("hide");
    timerContainer.classList.add("hide");
    optionList.classList.remove("hide");
    hour = 0;
    min = 0;
    sec = 0;
    updateclock();
    stopclock();
  })
);

/* Timer 5 10  */
function setTimer() {
  if (sec > 59) {
    min++;
    sec = 0;
  }
  if (min > 59) {
    hour++;
    min = 0;
  }
}

fiveMin.addEventListener("click", () => {
  min += 5;
  setTimer();
  updateclock();
});
tenMin.addEventListener("click", () => {
  min += 10;
  setTimer();
  updateclock();
});
