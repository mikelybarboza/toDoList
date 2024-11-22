/* script.js */
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const showAllButton = document.getElementById("showAll");
const showPendingButton = document.getElementById("showPending");
const showCompletedButton = document.getElementById("showCompleted");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Carregar tarefas do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

// Adicionar uma nova tarefa
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Digite uma tarefa!");
    return;
  }
  addTask(taskText);
  saveTasks();
  taskInput.value = "";
});

// Adicionar a tarefa à lista
function addTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  // Botão de excluir
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  // Marcar como concluída
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
    updateCounts();
  });

  // Permitir editar a tarefa
  span.addEventListener("dblclick", () => {
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
  updateCounts();
}

// Salvar tarefas no localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    const li = taskList.lastChild;
    if (task.completed) {
      li.classList.add("completed");
    }
  });
}

// Atualizar os contadores de tarefas
function updateCounts() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll("li.completed").length;
  const pendingTasks = totalTasks - completedTasks;
  pendingCount.textContent = pendingTasks;
  completedCount.textContent = completedTasks;
}

// Filtros de exibição
showAllButton.addEventListener("click", () => {
  showTasks("all");
});
showPendingButton.addEventListener("click", () => {
  showTasks("pending");
});
showCompletedButton.addEventListener("click", () => {
  showTasks("completed");
});

// Mostrar tarefas de acordo com o filtro
function showTasks(filter) {
  document.querySelectorAll("#taskList li").forEach((li) => {
    switch (filter) {
      case "pending":
        li.style.display = li.classList.contains("completed") ? "none" : "flex";
        break;
      case "completed":
        li.style.display = li.classList.contains("completed") ? "flex" : "none";
        break;
      default:
        li.style.display = "flex";
        break;
    }
  });
}
