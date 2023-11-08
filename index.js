// const time = document.getElementById("timer");

// fetch("timer/timer.html")
//   .then((response) => response.text())
//   .then((data) => {
//     time.innerHTML = data;

//     const script = document.createElement("script");
//     script.src = "timer/timer.js";
//     document.body.appendChild(script);
//   })
//   .catch((error) => {
//     console.error("Error Loading", error);
//   });

const form = document.getElementById("form");
const inputTask = form["input"];

const addTask = document.getElementById("add");

const taskContainer = document.getElementById("task-container");

let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

let taskCount = 0;

/*      *** Add Task  ***     */

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  let taskstatus = 0;
  task = inputTask.value;
  storeData(task, taskstatus);

  updateTask(task, taskstatus);
});

function storeData(task, taskstatus) {
  taskData.push({ task, taskstatus });

  localStorage.setItem("taskData", JSON.stringify(taskData));
}

/*      *** Update Task Section ***     */

function updateTask(task, taskstatus) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const status = document.createElement("input");
  const del = document.createElement("button");

  status.type = "checkbox";
  del.classList.add(`delete`);
  del.classList.add(`${taskCount}`);

  label.innerText = task;

  div.append(label, status, del);
  taskContainer.appendChild(div);

  taskCount++;
}

taskData.forEach((element) => {
  updateTask(element.task, element.status);
});

/*      *** Delete Task Section ***     */
const deleteTask = document.querySelectorAll("delete");

deleteTask.forEach((element) => {
  element.addEventListener("click", () => {
    element.removepare;
  });
});
