export { DOM_ListTasks }

// Given an array of tasks, lists them all on the page
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    

    // Loop thru array and list each task
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
        task.textContent = tasks[i].getname();
        taskList.appendChild(task);
    }

    
}