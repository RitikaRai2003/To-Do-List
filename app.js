document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("task"));

  if (storedTasks) {
    storedTasks.forEach((tasks) => task.push(tasks));
    updateTaskList();
    updateStats();
  }
});

let task = [];

const saveTasks = () => {
  localStorage.setItem("task", JSON.stringify(task));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTastComplete = (index) => {
  task[index].completed = !task[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = task[index].text;

  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = task.filter((task) => task.completed).length;
  const totalTasks = task.length;
  const progress = (completedTasks / totalTasks) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;
  document.getElementById(
    "number"
  ).innerText = `${completedTasks}/${totalTasks}`;

  if (task.length && completedTasks == totalTasks) {
    blastConfetti();
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  task.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
              <input type="checkbox" class="checkbox" ${
                task.completed ? "checked" : ""
              } />
              <p>${task.text}</p>
            </div>
            <div class="icons">
              <img src="edit.png" onclick="editTask(${index})"/>
              <img src="bin.png" onclick="deleteTask(${index})"/>
            </div>
        </div>`;
    listItem.addEventListener("change", () => toggleTastComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
