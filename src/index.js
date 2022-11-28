import "./page";
import { DOM_ListTasks, DOM_ListRangeTasks, workingProject, DOM_Update, resetSelection} from "./page"
import { projects } from "./project";

const createTaskBtn = document.querySelector('#createTask');
const createProjectBtn = document.querySelector('#createProject');
const modal = document.querySelector('#modal');
const modalProject = document.querySelector('#modalProject');



createTaskBtn.addEventListener('click', () => {
    // We need some logic to determine if task is to be added to inbox or some project. TODO Later
    // TEMP: Assume we are adding to inbox
    
    modal.setAttribute('modalType', 'create');
    document.querySelector('#modal #heading').textContent = 'Create new task';

    // Pop up modal and get info from user
    modal.showModal();
});





createProjectBtn.addEventListener('click', () => {
    modalProject.setAttribute('modalType', 'create');
    document.querySelector('#modalProject #heading').textContent = 'Create new Project';
    modalProject.showModal();    
});