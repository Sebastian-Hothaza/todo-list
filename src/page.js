import { taskItemFactory } from "./task";
import { projectFactory, projects, inbox } from "./project";


const createTaskModalConfirmBtn = document.querySelector('#createTaskModal #Confirm');

//TODO: For practice, re-write this fn without arrow fn :)
createTaskModalConfirmBtn.addEventListener('click', () => {
    const taskTitle = document.querySelector('#createTaskModal #modalTitle').value;
    document.querySelector('#createTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion
    
    // Use modal info to build a task object, append the task in the appropriate project
    const newTask = taskItemFactory(taskTitle);

    inbox.appendTask(newTask);

    DOM_ListTasks(inbox.getTasks());


    console.log("projects:  "+projects);
    inbox.printTasks();
});

// Given an array of tasks, lists them all on the page. Listeners added here too!
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    // Loop thru array and list each task
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
        task.textContent = tasks[i].getname();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        task.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            // Access the task with tasks[i]
            console.log(tasks[i].getname());
        });

        taskList.appendChild(task);
    }
}