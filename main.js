let input = document.querySelector(".input");
let submit = document.querySelector(".form .add");
let tasksDiv = document.querySelector(".tasks")

// create an empty array to add added tasks to it
let arrayOFTasks = []

// check if there is data in local storage
if (window.localStorage.getItem("tasks")) {
    arrayOFTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

// trigger get data form local storage
getDataFromLocalStorage()


// click on Add task
submit.addEventListener("click", main)
submit.addEventListener("keyup", main)
// 
// main function to add tasks to page and local storage
// function that happen when events happen
function main() {
    if (input.value !== "") {
        addTaskToArray(input.value);

        input.value = "";
    }
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete btn
    if(e.target.classList.contains("del")) {
        // remove element from page
        e.target.parentElement.remove()
        // remove task form local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
    }
    // task element
    if(e.target.classList.contains("task")) {
        // Toggle completed for task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done")
    }
    
})

function addTaskToArray(textTask) {
    // task data
    const task = {
        id : Date.now(),
        title : textTask,
        completed : false,
    }
    // push task to array of tasks
    arrayOFTasks.push(task);
    // add tasks to page form arry of tasks
    addElementsToPageFrom(arrayOFTasks)
    // add tasks to local storage
    addDataToLocalStorageFrom(arrayOFTasks)
}

function addElementsToPageFrom (arrayOFTasks) {
    // empty tasks div
    tasksDiv.innerHTML = ""
    // add task to the page
    arrayOFTasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "task"
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span")
        span.appendChild(document.createTextNode("delete"))
        span.className = "del"
        // append span to main div
        div.appendChild(span)
        // append task div to tasks container
        tasksDiv.appendChild(div)
    })
}

function addDataToLocalStorageFrom(arrayOFTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOFTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        // sava data in task array
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
    }
}
function deleteTaskWith(taskId) {
    arrayOFTasks = arrayOFTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOFTasks);
}

function toggleStatusTaskWith(taskId) {
    for ( let i=0; i< arrayOFTasks.length; i++) {
        if (arrayOFTasks[i].id == taskId) {
            arrayOFTasks[i].completed == false ? (arrayOFTasks[i].completed = true) : (arrayOFTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOFTasks);
}
