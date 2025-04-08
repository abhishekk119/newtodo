// ===== Original Function (UNTOUCHED) ===== //
function addTask() {
    const inputVal = document.getElementById("input").value.trim();
    if (inputVal) {
        const now = new Date();
        const thetime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        let showToday = now.toDateString();
        const p = document.createElement("p");
        const pId = 'para-' + Date.now();
        const checkbox = document.createElement('input');
        const dltbtn = document.createElement('button');
        const taskdiv = document.createElement('div');
        const taskdivId = 'div-' + Date.now();
        p.textContent = inputVal + " " + "-" + " " + thetime + " " + showToday;
        p.id = pId;
        p.classList.add('tasks');
        checkbox.type = 'checkbox';
        taskdiv.id = taskdivId;
        taskdiv.classList.add('task-container');
        dltbtn.innerHTML = '<span class="material-icons">delete</span>';
        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(p);
        taskdiv.appendChild(dltbtn);
        document.body.append(taskdiv);
        document.getElementById("input").value = "";
        
        checkbox.addEventListener('click', function() {
            p.classList.toggle('strike', this.checked);
            saveTasksToLocalStorage(); // Sync checkbox state
        });
        
        dltbtn.addEventListener('click', function() {
            taskdiv.remove();
            saveTasksToLocalStorage(); // Sync deletion
        });

        saveTasksToLocalStorage(); // Save new task
    } else {
        alert("Enter a task");
    }
}

// ===== NEW: localStorage Functions ===== //

// 1. Save all tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-container').forEach(taskDiv => {
        tasks.push({
            text: taskDiv.querySelector('p').textContent,
            checked: taskDiv.querySelector('input[type="checkbox"]').checked,
            id: taskDiv.id
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 2. Load tasks from localStorage on page load
function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        // Recreate the task (mimics addTask() but without alert/input clearing)
        const p = document.createElement("p");
        const checkbox = document.createElement('input');
        const dltbtn = document.createElement('button');
        const taskdiv = document.createElement('div');
        
        p.textContent = task.text;
        p.classList.add('tasks');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked; // Restore checkbox state
        taskdiv.id = task.id;
        taskdiv.classList.add('task-container');
        dltbtn.innerHTML = '<span class="material-icons">delete</span>';
        
        if (checkbox.checked) p.classList.add('strike');
        
        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(p);
        taskdiv.appendChild(dltbtn);
        document.body.append(taskdiv);
        
        // Reattach event listeners
        checkbox.addEventListener('click', function() {
            p.classList.toggle('strike', this.checked);
            saveTasksToLocalStorage();
        });
        
        dltbtn.addEventListener('click', function() {
            taskdiv.remove();
            saveTasksToLocalStorage();
        });
    });
}

// 3. Initialize on page load
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);