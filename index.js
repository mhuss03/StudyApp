const add = document.querySelector(".add");
const input = document.querySelector(".text");
let count = 0;

add.addEventListener("click", () => {
  count++;
  const div = document.createElement("div");
  div.innerHTML = input.innerHTML;
  console.log(div);
});
