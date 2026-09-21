warning: in the working copy of 'index.html', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'script.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'styles.css', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/index.html b/index.html[m
[1mindex ad67c0e..c7b3525 100644[m
[1m--- a/index.html[m
[1m+++ b/index.html[m
[36m@@ -4,7 +4,7 @@[m
   <meta charset="UTF-8">[m
   <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
   <title>Todo 清单</title>[m
[31m-  <link rel="stylesheet" href="styles.css">[m
[32m+[m[32m  <link rel="stylesheet" href="styles.css?v=2">[m
 </head>[m
 <body>[m
   <main class="todo-app">[m
[36m@@ -24,6 +24,6 @@[m
     <ul id="todo-list" class="todo-list" aria-live="polite"></ul>[m
   </main>[m
 [m
[31m-  <script src="script.js"></script>[m
[32m+[m[32m  <script src="script.js?v=2"></script>[m
 </body>[m
 </html>[m
[1mdiff --git a/script.js b/script.js[m
[1mindex 08d25f5..43bccf1 100644[m
[1m--- a/script.js[m
[1m+++ b/script.js[m
[36m@@ -22,7 +22,27 @@[m [mfunction loadTodos() {[m
 [m
 function addTodoToList(task) {[m
   const todoItem = document.createElement("li");[m
[31m-  todoItem.textContent = task;[m
[32m+[m[32m  const todoText = document.createElement("span");[m
[32m+[m[32m  const deleteButton = document.createElement("button");[m
[32m+[m
[32m+[m[32m  todoText.textContent = task;[m
[32m+[m[32m  deleteButton.type = "button";[m
[32m+[m[32m  deleteButton.className = "delete-button";[m
[32m+[m[32m  deleteButton.textContent = "删除";[m
[32m+[m
[32m+[m[32m  deleteButton.addEventListener("click", () => {[m
[32m+[m[32m    const taskIndex = Array.from(todoList.children).indexOf(todoItem);[m
[32m+[m
[32m+[m[32m    if (taskIndex === -1) {[m
[32m+[m[32m      return;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    todos.splice(taskIndex, 1);[m
[32m+[m[32m    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));[m
[32m+[m[32m    todoItem.remove();[m
[32m+[m[32m  });[m
[32m+[m
[32m+[m[32m  todoItem.append(todoText, deleteButton);[m
   todoList.append(todoItem);[m
 }[m
 [m
[1mdiff --git a/styles.css b/styles.css[m
[1mindex f3d2afa..8ad4437 100644[m
[1m--- a/styles.css[m
[1m+++ b/styles.css[m
[36m@@ -66,11 +66,35 @@[m [mh1 {[m
 }[m
 [m
 .todo-list li {[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: space-between;[m
[32m+[m[32m  gap: 16px;[m
   padding: 12px 0;[m
   border-bottom: 1px solid #e5e7eb;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.todo-list li span {[m
[32m+[m[32m  min-width: 0;[m
   overflow-wrap: anywhere;[m
 }[m
 [m
[32m+[m[32m.delete-button {[m
[32m+[m[32m  flex: none;[m
[32m+[m[32m  padding: 6px 10px;[m
[32m+[m[32m  border: 0;[m
[32m+[m[32m  border-radius: 6px;[m
[32m+[m[32m  color: #b91c1c;[m
[32m+[m[32m  background: #fee2e2;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  font: inherit;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.delete-button:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background: #dc2626;[m
[32m+[m[32m}[m
[32m+[m
 .sr-only {[m
   position: absolute;[m
   width: 1px;[m
