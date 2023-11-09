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
taskData = JSON.parse(localStorage.getItem("taskData")) || [];

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  task = inputTask.value;

  storeData(task);
  updateTask(task);

  inputTask.value = "";
});

function storeData(task) {
  taskData.push(task);
  localStorage.setItem("taskData", JSON.stringify(taskData));
}

function updateTask(task) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const del = document.createElement("button");
  const check = document.createElement("input");

  check.type = "checkbox";
  label.innerText = task;
  div.append(label, check, del);
  taskContainer.appendChild(div);

  del.addEventListener("click", () => {
    taskData.splice(
      taskData.findIndex((e) => e === task),
      1
    );
    div.remove();
    localStorage.setItem("taskData", JSON.stringify(taskData));
  });

  check.addEventListener("change", () => {
    if (check.checked) {
      div.style.backgroundColor = "coral";
    } else {
      div.style.backgroundColor = "lightgreen";
    }
  });
}

for (const element of taskData) {
  updateTask(element);
}
