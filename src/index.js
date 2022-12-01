import { DOM_Update, DOM_ListProjects, HOTKEY_selectAllTasks, HOTKEY_selectTdyTasks, HOTKEY_selectWeekTasks } from "./page";
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
} else {
    // Create blank inbox object (relied on for adding tasks later)
    let arr = [];
    localStorage.setItem("inbox", JSON.stringify(arr));
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

// Hotkey support
document.addEventListener('keydown', (e) => {
    if (modal.hasAttribute('open') || modalProject.hasAttribute('open')) return;
    switch (e.key){
        case 't':
            modal.setAttribute('modalType', 'create');
            document.querySelector('#modal #heading').textContent = 'Create New Task';
            modal.showModal();
            break;
        case 'p':
            modalProject.setAttribute('modalType', 'create');
            document.querySelector('#modalProject #heading').textContent = 'Create New Project';
            modalProject.showModal(); 
            break;
        case '1':
            HOTKEY_selectAllTasks();
            break;
        case '2':
            HOTKEY_selectTdyTasks();
            break;    
        case '3':
            HOTKEY_selectWeekTasks();
            break;        
    }
    e.preventDefault();
    
}, false);

/*
*** A note about UUID ***
UUID is required since once a task is stored in LS, that UUID persists with it.
When we create new task from LS_load, if we don't re-use that UUID, we get a random one to which the delete btn associates with.
Thus when we click delete, the UUID doesn't match and we cannot update the LS to remove it
*/
