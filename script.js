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
  const todoText = document.createElement("span");
  const deleteButton = document.createElement("button");

  todoText.textContent = task;
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "删除";

  deleteButton.addEventListener("click", () => {
    const taskIndex = Array.from(todoList.children).indexOf(todoItem);

    if (taskIndex === -1) {
      return;
    }

    todos.splice(taskIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    todoItem.remove();
  });

  todoItem.append(todoText, deleteButton);
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
