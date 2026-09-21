const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const STORAGE_KEY = "todos";

function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos)
      ? parsedTodos.filter((todo) => typeof todo === "string")
      : [];
  } catch {
    return [];
  }
}

function addTodoToList(task) {
  const todoItem = document.createElement("li");
  todoItem.textContent = task;
  todoList.append(todoItem);
}

const todos = loadTodos();
todos.forEach(addTodoToList);

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = todoInput.value.trim();

  if (!task) {
    return;
  }

  addTodoToList(task);
  todos.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

  todoInput.value = "";
  todoInput.focus();
});
