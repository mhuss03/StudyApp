const taskForm = document.getElementById("task-form");
const inputTask = taskForm["input"];

const addTask = taskForm["add"];

const taskContainer = document.getElementById("task-container");

let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

/*      *** Add Task  ***     */

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
