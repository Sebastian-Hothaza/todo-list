import "./page";
import { LS_load } from "./localStorage"

const createTaskBtn = document.querySelector('#createTask');
const createProjectBtn = document.querySelector('#createProject');
const modal = document.querySelector('#modal');
const modalProject = document.querySelector('#modalProject');

// Check local storage
if (localStorage.length){ LS_load(); }

createTaskBtn.addEventListener('click', () => {
    modal.setAttribute('modalType', 'create');
    document.querySelector('#modal #heading').textContent = 'Create new task';
    modal.showModal();
});

createProjectBtn.addEventListener('click', () => {
    modalProject.setAttribute('modalType', 'create');
    document.querySelector('#modalProject #heading').textContent = 'Create new Project';
    modalProject.showModal();    
});