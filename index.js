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

const addTask = form["add"];

const taskContainer = document.getElementById("task-container");

// let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

/*      *** Add Task  ***     */
taskData = [];

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  taskData.push(inputTask.value);
  localStorage.setItem("taskData", JSON.stringify(taskData));

  const items = JSON.parse(localStorage.getItem("taskData"));
  for (const element of items) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const del = document.createElement("button");

    label.innerText = element;
    div.append(label, del);
    taskContainer.appendChild(div);
  }
});

// addTask.addEventListener("click", (e) => {
//   e.preventDefault();
//   let taskstatus = 0;
//   task = inputTask.value;
//   storeData(task, taskstatus);

//   updateTask(task, taskstatus);
// });

// function storeData(task, taskstatus) {
//   taskData.push({ task, taskstatus });

//   localStorage.setItem("taskData", JSON.stringify(taskData));
// }

// /*      *** Update Task Section ***     */
// let count = 0;
// function updateTask(task, taskstatus) {
//   const div = document.createElement("div");
//   const label = document.createElement("label");
//   const status = document.createElement("input");
//   const del = document.createElement("button");

//   status.type = "checkbox";
//   del.classList.add(`delete`);
//   del.classList.add(`${count}`);

//   label.innerText = task;

//   div.append(label, status, del);
//   taskContainer.appendChild(div);
//   count++;
// }

// taskData.forEach((element) => {
//   updateTask(element.task, element.status);
// });

// /*      *** Delete Task Section ***     */

// const deleteTask = document.querySelectorAll(".delete");

// deleteTask.forEach((element) => {
//   element.addEventListener("click", (e) => {
//     e.preventDefault();

//     const currentItem = JSON.parse(localStorage.getItem("taskData"));

//     for (let i = 0; i < taskData.length; i++) {
//       if (element.classList.contains(`${i}`)) {
//         taskData.splice(i, 1);
//       }
//     }

//     element.parentElement.remove();
//     localStorage.setItem("taskData", JSON.stringify(taskData));
//   });
// });
