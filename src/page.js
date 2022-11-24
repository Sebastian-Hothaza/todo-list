import { taskItemFactory } from "./task";
import { projectFactory, projects, inbox } from "./project";

const editTaskModal = document.querySelector('#editTaskModal');

const createTaskModalConfirmBtn = document.querySelector('#createTaskModal #Confirm');
const editTaskModalConfirmBtn = document.querySelector('#editTaskModal #Confirm');

createTaskModalConfirmBtn.addEventListener('click', () => {
    const taskTitle = document.querySelector('#createTaskModal #modalTitle').value;
    document.querySelector('#createTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion
    
    // Use modal info to build a task object, append the task in the appropriate project
    const newTask = taskItemFactory(taskTitle);

    inbox.appendTask(newTask);

    DOM_ListTasks(inbox.getTasks());
});

editTaskModalConfirmBtn.addEventListener('click', () => {
    // ???
});


// Given an array of tasks, lists them all on the page. Listeners added here too!
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    // Loop thru array and list each task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
        task.textContent = tasks[i].getname();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        task.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            editTaskModal.showModal();
            // ???
        });
        taskList.appendChild(task);
    }

}

function editTask(task){
    task.setname('newName'); 
}



