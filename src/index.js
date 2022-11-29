import "./page";
import {LS_loadTasks, LS_loadTasks2} from "./page"

const createTaskBtn = document.querySelector('#createTask');
const createProjectBtn = document.querySelector('#createProject');
const modal = document.querySelector('#modal');
const modalProject = document.querySelector('#modalProject');

// Check local storage
if (localStorage.length){
    console.log('LS is populated!');
    LS_loadTasks2();
}


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