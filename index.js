const clock = document.querySelector(".clock");
const start = document.querySelectorAll(".start");
const reset = document.querySelector(".reset");

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
  } else if (dir === 1) {
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

reset.addEventListener("click", () => {
  hour = 0;
  min = 0;
  sec = 0;
  clock.innerHTML = `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
});

/* Timer 5 10 Start Clear */

fiveMin.addEventListener("click", () => {
  min += 5;
  updateclock();
});
tenMin.addEventListener("click", () => {
  min += 10;
  updateclock();
});
