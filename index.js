const timer = document.querySelector(".timer");
const start = document.querySelector(".start");
const reset = document.querySelector(".stop");

let state = 0;

let hour = 0;
let min = 0;
let sec = 0;

timer.innerHTML = "00:00:00";

start.addEventListener("click", () => {
  if (state === 0) {
    interval = setInterval(() => {
      sec++;

      if (sec > 59) {
        min++;
        sec = 0;
      }
      if (min > 59) {
        hour++;
        min = 0;
      }

      timer.innerHTML = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }, 100);
    state = 1;
  } else if (state === 1) {
    clearInterval(interval);
    state = 0;
  }
  console.log(state);
});

reset.addEventListener("click", () => {
  hour, min, (sec = 0);
  timer.innerHTML = `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
});
