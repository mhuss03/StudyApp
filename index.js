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
taskCount = taskData.length;

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  taskCount++;
  if (taskCount < 7) {
    task = inputTask.value;

    storeData(task);
    updateTask(task);

    inputTask.value = "";
  } else {
    alert("Delete a task");
    taskCount--;
  }
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
  const hr = document.createElement("hr");

  check.classList.add("check");
  div.classList.add("task-items");
  del.classList.add("delete");
  check.type = "checkbox";
  label.innerText = task;
  div.append(label, check, del, hr);
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
      div.style.backgroundColor = "lightgreen";
    } else {
      div.style.backgroundColor = "white";
    }
  });
}

for (const element of taskData) {
  updateTask(element);
}
