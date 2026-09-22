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
      ? parsedTodos.flatMap((todo) => {
          if (typeof todo === "string") {
            return [{ text: todo, completed: false }];
          }

          if (todo && typeof todo.text === "string") {
            return [{ text: todo.text, completed: todo.completed === true }];
          }

          return [];
        })
      : [];
  } catch {
    return [];
  }
}

function addTodoToList(todo) {
  const todoItem = document.createElement("li");
  const todoText = document.createElement("span");
  const todoActions = document.createElement("div");
  const completeButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  todoText.textContent = todo.text;
  todoItem.classList.toggle("completed", todo.completed);
  todoActions.className = "todo-actions";
  completeButton.type = "button";
  completeButton.className = "complete-button";
  completeButton.textContent = todo.completed ? "撤销完成" : "完成";
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "删除";

  completeButton.addEventListener("click", () => {
    todo.completed = !todo.completed;
    todoItem.classList.toggle("completed", todo.completed);
    completeButton.textContent = todo.completed ? "撤销完成" : "完成";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  });

  deleteButton.addEventListener("click", () => {
    const taskIndex = Array.from(todoList.children).indexOf(todoItem);

    if (taskIndex === -1) {
      return;
    }

    todos.splice(taskIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    todoItem.remove();
  });

  todoActions.append(completeButton, deleteButton);
  todoItem.append(todoText, todoActions);
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

  const todo = { text: task, completed: false };
  addTodoToList(todo);
  todos.push(todo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

  todoInput.value = "";
  todoInput.focus();
});
