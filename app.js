// Selectors
const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todocontainer = document.querySelector(".todo-container");
const todolist = document.querySelector(".todo-list");
const todofilter = document.querySelector(".todo-filter");

// Functions
// 1. Add to the list
const addToDo = (e) => {
  e.preventDefault();
  // Create div element
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo-div");
  // Create li element
  const todoli = document.createElement("li");
  todoli.classList.add("todo-li");
  todoli.innerText = todoinput.value;
  // Create trash button
  const trashbutton = document.createElement("button");
  trashbutton.classList.add("trash-btn");
  trashbutton.innerHTML = '<i class="material-icons">clear</i>';
  // Create check element
  const completebutton = document.createElement("button");
  completebutton.classList.add("complete-btn");
  completebutton.innerHTML = '<i class="material-icons">check</i>';
  // Append all three to div
  tododiv.appendChild(todoli);
  tododiv.appendChild(completebutton);
  tododiv.appendChild(trashbutton);
  // Append div to todo-list
  todolist.appendChild(tododiv);
  // Reset input bar
  todoinput.value = "";
};

// 2. Remove from the list
const removeCheck = (e) => {
  const item = e.target;
  if (item.innerText === "clear") {
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }

  if (item.innerText === "check") {
    item.parentElement.classList.toggle("check");
  }
};

// 3. Filter the list
const filterToDo = (e) => {
  const item = todolist.childNodes;
  item.forEach((element) => {
    switch (e.target.value) {
      case "all":
        element.style.display = "flex";
        break;
      case "completed":
        if (element.classList.contains("check")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!element.classList.contains("check")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
    }
  });
};
// 4. Save to local storage and remove.

// Event Listeners
todobutton.addEventListener("click", addToDo);
todolist.addEventListener("click", removeCheck);
todofilter.addEventListener("click", filterToDo);
