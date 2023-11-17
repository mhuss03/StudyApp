document.addEventListener("DOMContentLoaded", () => {
  const taskC = document.querySelector("#task-container");
  const taskItems = document.querySelectorAll(".task-items");
  const taskN = document.querySelector(".note-container");
  const noteItems = document.querySelectorAll(".note-items");

  function setTaskContainerHeight() {
    const itemCount = taskItems.length;
    taskC.style.minHeight = itemCount > 4 ? "60vh" : "40vh";
  }
  function setNoteContainerHeight() {
    const noteCount = noteItems.length;
    taskN.style.minHeight = noteCount > 4 ? "60vh" : "40vh";
  }
  setTaskContainerHeight();
  setNoteContainerHeight();

  for (const element of taskData) {
    updateTask(element);
  }

  for (const element of noteData) {
    updateNote(element.note, element.title);
  }

  /* *** inititalise *** */
  updateclock();
});

/*      *** Task  ***     ***/
const taskBoxContainer = document.querySelector(".task-box-container");
const taskForm = document.getElementById("task-form");
const inputTask = taskForm["input"];

const addTask = taskForm["add"];

const taskContainer = document.getElementById("task-container");

let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

// /*      *** Add Task  ***     */

taskCount = taskData.length;

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  taskCount++;
  if (taskCount < 10) {
    task = inputTask.value;

    storeTaskData(task);
    updateTask(task);

    setTaskContainerHeight();

    inputTask.value = "";
  } else {
    alert("Delete a task");
    taskCount--;
  }
});

function storeTaskData(task) {
  taskData.push(task);
  localStorage.setItem("taskData", JSON.stringify(taskData));
}

function updateTask(task) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const del = document.createElement("button");
  const check = document.createElement("input");
  // const hr = document.createElement("hr");

  check.classList.add("check");
  div.classList.add("task-items");
  del.classList.add("delete");
  label.classList.add("task-text");

  del.innerHTML = "&#128465";
  check.type = "checkbox";
  label.innerText = task;
  div.append(label, check, del);
  taskContainer.appendChild(div);

  del.addEventListener("click", () => {
    taskCount--;
    taskData.splice(
      taskData.findIndex((e) => e === task),
      1
    );
    div.remove();
    localStorage.setItem("taskData", JSON.stringify(taskData));
  });

  check.addEventListener("change", () => {
    if (check.checked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "none";
    }
  });
}

/*      *** Note  ***     ***/
const noteBoxContainer = document.querySelector(".note-box-container");
const noteForm = document.getElementById("note-form");
const noteTitle = noteForm["title"];
const noteInput = noteForm["note"];

const addNote = document.getElementById("add-note");

const noteContainer = document.querySelector(".note-container");

let noteData = JSON.parse(localStorage.getItem("noteData")) || [];
noteCount = noteData.length;

addNote.addEventListener("click", (e) => {
  e.preventDefault();

  noteCount++;
  if (noteCount < 7) {
    note = noteInput.value;
    title = noteTitle.value;

    storeNoteData(note, title);
    updateNote(note, title);

    setNoteContainerHeight();

    noteTitle.value = "";
    noteInput.value = "";
  } else {
    alert("Delete a Note");
    noteCount--;
  }
});

function storeNoteData(note, title) {
  noteData.push({ note: note, title: title });
  localStorage.setItem("noteData", JSON.stringify(noteData));
}

function updateNote(note, title) {
  const div = document.createElement("div");
  const itemTitle = document.createElement("h4");
  const label = document.createElement("p");
  const del = document.createElement("button");
  const check = document.createElement("input");

  check.classList.add("check");
  div.classList.add("note-items");
  del.classList.add("delete");

  del.innerHTML = "&#128465";
  itemTitle.innerText = title;
  label.innerText = note;
  div.append(itemTitle, label, del);
  noteContainer.appendChild(div);

  del.addEventListener("click", () => {
    noteCount--;
    noteData.splice(
      noteData.findIndex((e) => e === note),
      1
    );
    div.remove();
    localStorage.setItem("noteData", JSON.stringify(noteData));
  });
}

/*      *** Timer  ***     ***/

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

let timerState = 0;

let hour = 0;
let min = 0;
let sec = 0;

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
    if (timerState === 0) {
      startclock(upDown);
      timerState = 1;
      button.classList.add("off");
      button.value = "Stop";
    } else if (timerState === 1) {
      stopclock(upDown);
      timerState = 0;
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

    timerState = 0;
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

/*      *** Background Music Player  ***     ***/

const vidUrl = document.getElementById("url");
const vidcontainer = document.getElementById("vid-container");
const vidButton = document.getElementById("vid-button");

vidButton.addEventListener("click", () => {
  const videoId = getYouTubeVideoId(vidUrl.value);

  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    vidcontainer.innerHTML = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    console.error("Invalid YouTube URL");
  }
});

function getYouTubeVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match && match[1];
}

/*      *** Change between Task and Note  ***     ***/

const taskButton = document.getElementById("task-button");
const noteButton = document.getElementById("note-button");

let state = -1;

taskButton.addEventListener("click", () => {
  if (state === 1) {
    noteBoxContainer.classList.add("hide");
    taskBoxContainer.classList.remove("hide");
    noteButton.style.opacity = 0.3;
    taskButton.style.opacity = 1;
    state *= -1;
  }
});

noteButton.addEventListener("click", () => {
  if (state === -1) {
    taskBoxContainer.classList.add("hide");
    noteBoxContainer.classList.remove("hide");
    taskButton.style.opacity = 0.3;
    noteButton.style.opacity = 1;
    state *= -1;
  }
});
