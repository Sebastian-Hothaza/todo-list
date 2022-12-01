import { DOM_Update, DOM_ListProjects } from "./page";
import { LS_load } from "./localStorage"

const createTaskBtn = document.querySelector('#createTask');
const createProjectBtn = document.querySelector('#createProject');
const modal = document.querySelector('#modal');
const modalProject = document.querySelector('#modalProject');

// Check local storage
if (localStorage.length){ 
    LS_load();
    DOM_ListProjects();
    DOM_Update();
}

// Create task
createTaskBtn.addEventListener('click', () => {
    modal.setAttribute('modalType', 'create');
    document.querySelector('#modal #heading').textContent = 'Create New Task';
    modal.showModal();
});

// Create project
createProjectBtn.addEventListener('click', () => {
    modalProject.setAttribute('modalType', 'create');
    document.querySelector('#modalProject #heading').textContent = 'Create New Project';
    modalProject.showModal();    
});

// TODO: FIX BUG WHERE Clear completed task not working correctly on multiple items!

// TODO: Bug fix where editing a project name will then set the active project to the last project in the list (?)

// TODO: Feature idea: when killing some project, lets not go back to working project = the inbox

// TODO: confirm and cancel dont put away the modal properly (user can hit confirm on invalid input and task is created; also cant hit cancel to exit modal)