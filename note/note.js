const noteForm = document.getElementById("note-form");
const noteTitle = noteForm["title"];
const noteInput = noteForm["note"];

const addNote = document.getElementById("add");

const noteContainer = document.querySelector(".note-container");

let noteData = JSON.parse(localStorage.getItem("noteData")) || [];
noteCount = noteData.length;

addNote.addEventListener("click", (e) => {
  e.preventDefault();

  noteCount++;
  if (noteCount < 7) {
    note = noteInput.value;
    title = noteTitle.value;

    storeData(note, title);
    updateNote(note, title);

    noteInput.value = "";
    noteTitle.value = "";
  } else {
    alert("Delete a Note");
    noteCount--;
  }
});

function storeData(note, title) {
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

  itemTitle.innerText = title;
  del.innerText = "Remove";
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

for (const element of noteData) {
  updateNote(element.note, element.title);
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const noteItems = document.querySelectorAll(".note-items");

  function setContainerHeight() {
    const itemCount = noteItems.length;
    container.style.minHeight = itemCount > 4 ? "60vh" : "40vh";
  }

  setContainerHeight();

  addNote.addEventListener("click", setContainerHeight);
});
