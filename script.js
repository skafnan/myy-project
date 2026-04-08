const inputBox = document.getElementById('input-box')
const submitBtn = document.getElementById('add-task-btn')
const taskListDisplay = document.getElementById('tasks-list')
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
renderTasks()

submitBtn.addEventListener('click', () => {
    let newTask = {
        taskId: Date.now(),
        taskname: inputBox.value.trim(),
        isCompleted: false
    }
    if (!newTask.taskname) return

    // const li = document.createElement('li')
    // const task = document.createElement('p')
    // const deleteBtn = document.createElement('button')
    // li.addEventListener('click', function () {
    //     this.classList.toggle('completed')
    // })
    // deleteBtn.addEventListener('click', function () {
    //     li.remove()
    //     tasks = tasks.filter(t => t.taskId != newTask.taskId)
    //     console.log(tasks);
    //     saveTasks()
    // })
    // deleteBtn.innerText = 'Delete'
    // task.innerText = newTask.taskname

    // li.append(task, deleteBtn)
    // taskListDisplay.append(li)

    tasks.push(newTask)
    renderTasks()
    saveTasks()
    inputBox.value = ''
    inputBox.focus()

})

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks() {
    taskListDisplay.innerHTML = ''
    if(tasks.length == 0){
        taskListDisplay.innerText = 'Tasks not found'
        return
    }
    tasks.forEach(t => {
        const li = document.createElement('li')
        const task = document.createElement('p')
        const deleteBtn = document.createElement('button')
        li.addEventListener('click', function () {
            this.classList.toggle('completed')
            const index = tasks.findIndex((task) => task.taskId == t.taskId)
            tasks[index].isCompleted = !tasks[index].isCompleted
            console.log(tasks);
            saveTasks()
            // renderTasks()
        })
        deleteBtn.addEventListener('click', function () {
            li.remove()
            tasks = tasks.filter(task => task.taskId != t.taskId)
            console.log(tasks);
            saveTasks()
        })
        deleteBtn.innerText = 'Delete'
        task.innerText = t.taskname

        if(t.isCompleted) li.classList.add('completed')

        li.append(task, deleteBtn)
        taskListDisplay.append(li)

        inputBox.focus()
    });
}