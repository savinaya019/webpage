document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const taskText = newTaskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: new Date().getTime(),
            text: taskText,
            completed: false,
        };

        saveTask(task);
        newTaskInput.value = "";
        loadTasks();
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">${task.completed ? "Uncomplete" : "Complete"}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskContainer.appendChild(taskElement);
    });
}

function toggleTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newText = prompt("Edit task:", tasks.find((task) => task.id === taskId).text);

    if (newText !== null) {
        tasks = tasks.map((task) => {
            if (task.id === taskId) {
                task.text = newText.trim();
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
