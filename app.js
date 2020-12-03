// Global Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".todo-filter");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");

// Functions
function addTodo(e) {
  e.preventDefault();
  // New div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  // New Item
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  todoItem.classList.add("todo-li");
  todoDiv.appendChild(todoItem);
  // Save to Local
  saveToLocal(todoInput.value);
  // Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fa fa-check"></i>';
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);
  // Trash Button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  // Append All
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function removeItem(e) {
  const item = e.target;
  if (item.classList.contains("trash-btn")) {
    item.parentElement.classList.add("fall");
    removeLocaltodo(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }
  if (item.classList.contains("complete-btn")) {
    item.parentElement.classList.toggle("check");
  }
}

function filterTodo(e) {
  const todo = todoList.childNodes;
  todo.forEach((list) => {
    switch (e.target.value) {
      case "all":
        list.style.display = "flex";
        break;
      case "completed":
        if (list.classList.contains("check")) {
          list.style.display = "flex";
        } else {
          list.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!list.classList.contains("check")) {
          list.style.display = "flex";
        } else {
          list.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocal(todo) {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }
  todos.push(todo);
  localStorage.setItem("list", JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }

  todos.forEach((element) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    // New Item
    const todoItem = document.createElement("li");
    todoItem.innerText = element;
    todoItem.classList.add("todo-li");
    todoDiv.appendChild(todoItem);
    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    // Trash Button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Append All
    todoList.appendChild(todoDiv);
  });
}

function removeLocaltodo(todo) {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("list", JSON.stringify(todos));
}

// EventListeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeItem);
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodo);
