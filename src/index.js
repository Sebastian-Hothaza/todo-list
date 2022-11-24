import { taskItemFactory } from "./task";
import { projectFactory, projects } from "./project";
import { DOM_ListTasks } from "./page"

const createTaskBtn = document.querySelector('#createTask');
const myModal = document.querySelector('#modal');

const inbox = projectFactory('inbox');

createTaskBtn.addEventListener('click', () => {
    // We need some logic to determine if task is to be added to inbox or some project.

    // TEMP: Assume we are adding to inbox

    // Pop up modal and get info from user
    myModal.showModal();



    // Use this info to build a task object, append the task in the appropriate project
    const newTask = taskItemFactory('Feed the Dog');

    inbox.appendTask(newTask);

    DOM_ListTasks(inbox.getTasks());


    console.log("projects:  "+projects);

    

});