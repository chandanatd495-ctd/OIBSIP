
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");

console.log(addTaskBtn);
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const pendingEmpty = document.getElementById("pendingEmpty");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const summaryText = document.getElementById("summaryText");
let tasks = [];
addTaskBtn.addEventListener("click", addTask);
function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Please enter a task.");

        return;

    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: new Date().toLocaleString()

    };

    tasks.push(task);
     saveTasks();
    renderTasks();
    taskInput.value = "";

    console.log(tasks);

}
function createTaskCard(task) {

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    if (task.completed) {
        taskCard.classList.add("completed");
    }

    taskCard.innerHTML = `
        <div class="task-info">
            <h3 class="task-title">${task.text}</h3>
            <p class="task-time">${task.createdAt}</p>
        </div>

        <div class="task-actions">

            ${
                !task.completed
                ? `<button class="complete-btn">✓</button>`
                : ""
            }

            <button class="edit-btn">✏️</button>

            <button class="delete-btn">🗑️</button>

        </div>
    `;

    const deleteBtn = taskCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id);
    });
    const editBtn = taskCard.querySelector(".edit-btn");

editBtn.addEventListener("click", () => {
    editTask(task.id);
});

    const completeBtn = taskCard.querySelector(".complete-btn");

    if (completeBtn) {
        completeBtn.addEventListener("click", () => {
            completeTask(task.id);
        });
    }

    return taskCard;
}
function renderTasks() {

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    pendingCount.textContent = `${pendingTasks.length} Pending`;
    completedCount.textContent = `${completedTasks.length} Completed`;

    if (pendingTasks.length === 0) {
        pendingList.innerHTML = `
            <p class="empty-message">
                No pending tasks. Add one to get started!
            </p>
        `;
    } else {

        pendingTasks.forEach(task => {
            pendingList.appendChild(createTaskCard(task));
        });

    }

    if (completedTasks.length === 0) {

        completedList.innerHTML = `
            <p class="empty-message">
                No completed tasks yet.
            </p>
        `;

    } else {

        completedTasks.forEach(task => {
            completedList.appendChild(createTaskCard(task));
        });

    }
   updateSummary();
}
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();

}
function completeTask(id) {

    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = true;
    }
    saveTasks();
    renderTasks();

}
function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText === null) return;

    if (updatedText.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }

    task.text = updatedText.trim();
    saveTasks();
    renderTasks();

}
function updateSummary() {

    const pendingTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = tasks.filter(task => task.completed).length;

    if (tasks.length === 0) {

        summaryText.textContent = "You have no tasks yet.";

    }
    else if (pendingTasks === 0) {

        summaryText.textContent = "🎉 Amazing! All tasks completed.";

    }
    else {

        summaryText.textContent =
            `${pendingTasks} pending • ${completedTasks} completed`;

    }

}
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

    renderTasks();

}