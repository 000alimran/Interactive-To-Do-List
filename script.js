const addTaskBtn = document.getElementById("add-task-btn");
const taskTitleInput = document.getElementById("task-title");
const taskDateInput = document.getElementById("task-date");
const taskCategorySelect = document.getElementById("task-category");
const taskContainer = document.getElementById("task-container");
const progressText = document.getElementById("progress-text");
const darkModeToggle = document.getElementById("toggle-dark-mode");

let taskCount = 0;
let completedTasks = 0;

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Add Task
addTaskBtn.addEventListener("click", function () {
    const taskTitle = taskTitleInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskCategory = taskCategorySelect.value;

    if (taskTitle && taskDate) {
        createTaskElement(taskTitle, taskDate, taskCategory);
        taskTitleInput.value = "";
        taskDateInput.value = "";
        updateProgress();
    } else {
        alert("Please fill out all fields!");
    }
});

// Create Task Element
function createTaskElement(title, date, category) {
    taskCount++;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <div>
            <strong>${title}</strong> - ${category} <br />
            <small>Due: ${date}</small>
        </div>
    `;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", function () {
        if (!taskItem.classList.contains("completed")) {
            completedTasks++;
        } else {
            completedTasks--;
        }
        taskItem.classList.toggle("completed");
        updateProgress();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        taskContainer.removeChild(taskItem);
        if (taskItem.classList.contains("completed")) {
            completedTasks--;
        }
        taskCount--;
        updateProgress();
    });

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    taskContainer.appendChild(taskItem);
}

// Update Progress
function updateProgress() {
    progressText.textContent = `${completedTasks} out of ${taskCount} tasks completed`;
}
