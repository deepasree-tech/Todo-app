const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");

    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function updateLocalStorage() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
