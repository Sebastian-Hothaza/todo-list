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

