const addTaskBtn = document.getElementById("add-task-btn");
const taskTitleInput = document.getElementById("task-title");
const taskContainer = document.getElementById("task-container");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskBtn.addEventListener("click", function () {
    const taskTitle = taskTitleInput.value.trim();

    if (taskTitle) {
        createTaskElement(taskTitle);
        saveTaskToLocalStorage(taskTitle);
        taskTitleInput.value = ""; // Clear input
    } else {
        alert("Please enter a task title!");
    }
});

// Create Task Element
function createTaskElement(taskTitle) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskTitle;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        taskContainer.removeChild(taskItem);
        removeTaskFromLocalStorage(taskTitle);
    });

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    taskContainer.appendChild(taskItem);
}

// Save Task to Local Storage
function saveTaskToLocalStorage(taskTitle) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskTitle);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => createTaskElement(task));
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskTitle) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskTitle);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
