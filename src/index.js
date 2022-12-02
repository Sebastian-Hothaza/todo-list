import { DOM_Update, DOM_ListProjects, HOTKEY_selectAllTasks, HOTKEY_selectTdyTasks, HOTKEY_selectWeekTasks } from "./page";
import { LS_load } from "./localStorage"
import { loadSampleData } from "./sampleTasks";
export { loadSampleData } // Whatever we export here will be accessible in console using global.XXX

const modal = document.querySelector('#modal');
const modalProject = document.querySelector('#modalProject');

// Try to load from LS
if (localStorage.length){ 
    LS_load();
    DOM_ListProjects();
    DOM_Update();
} else {
    // Create blank inbox object (relied on for adding tasks later)
    let arr = [];
    localStorage.setItem("inbox", JSON.stringify(arr));
}
const createTaskBtn = document.querySelector('#createTask');
createTaskBtn.addEventListener('click', () => createTask());

const createProjectBtn = document.querySelector('#createProject');
createProjectBtn.addEventListener('click', () => createProject());

// Hotkey support
document.addEventListener('keydown', (e) => {
    if (modal.hasAttribute('open') || modalProject.hasAttribute('open')) return; // If a modal is already open, ignore the key
    switch (e.key){
        case 't':
            createTask();
            break;
        case 'p':
            createProject();
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


// CreateTask and createProject open the respective modal to gather info
function createTask(){
    modal.setAttribute('modalType', 'create');
    document.querySelector('#modal #heading').textContent = 'Create New Task';
    modal.showModal();
}

function createProject(){
    modalProject.setAttribute('modalType', 'create');
    document.querySelector('#modalProject #heading').textContent = 'Create New Project';
    modalProject.showModal();  
}
