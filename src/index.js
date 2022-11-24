import { taskItemFactory } from "./task";
import { projectFactory, projects } from "./project";
import { DOM_ListTasks } from "./page"

const createTaskBtn = document.querySelector('#createTask');
const modalSubmitBtn = document.querySelector('#modalConfirm');
const myModal = document.querySelector('#modal');

const inbox = projectFactory('inbox');

createTaskBtn.addEventListener('click', () => {
    // We need some logic to determine if task is to be added to inbox or some project. TODO Later
    // TEMP: Assume we are adding to inbox

    // Pop up modal and get info from user
    myModal.showModal();
});

//TODO: For practice, re-write this fn without arrow fn :)
modalSubmitBtn.addEventListener('click', () => {
    const taskTitle = document.querySelector('#modalTitle').value;
    document.querySelector('#modalTitle').value = ''; //TODO: wrap in a clear funtion
    
    // Use modal info to build a task object, append the task in the appropriate project
     const newTask = taskItemFactory(taskTitle);

    inbox.appendTask(newTask);

    DOM_ListTasks(inbox.getTasks());


    console.log("projects:  "+projects);
    inbox.printTasks();
});