import { taskItemFactory } from "./task";
import { projectFactory, projects, inbox } from "./project";
import { format } from 'date-fns';

const editTaskModal = document.querySelector('#editTaskModal');

const createTaskModalConfirmBtn = document.querySelector('#createTaskModal #Confirm');
const editTaskModalConfirmBtn = document.querySelector('#editTaskModal #Confirm');

createTaskModalConfirmBtn.addEventListener('click', () => {
    const taskTitle = document.querySelector('#createTaskModal #modalTitle').value;
    document.querySelector('#createTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion

    const taskDate = document.querySelector('#createTaskModal #date').value;
    document.querySelector('#createTaskModal #date').value = ''; //TODO: wrap in a clear funtion
    
    // Use modal info to build a task object, append the task in the appropriate project
    const newTask = taskItemFactory(taskTitle, taskDate);

    inbox.appendTask(newTask);

    DOM_ListTasks(inbox.getTasks());
});

editTaskModalConfirmBtn.addEventListener('click', () => {
    inbox.getTask(editTaskModal.getAttribute('uniqueID')).setName(document.querySelector('#editTaskModal #modalTitle').value);
    document.querySelector('#editTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion
    
    DOM_ListTasks(inbox.getTasks());
});


// Given an array of tasks, lists them all on the page. Listeners added here too!
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    // Loop thru array and list each task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
        task.classList.add('task');
        task.textContent = tasks[i].getName();

        const taskDate = document.createElement('div');
        taskDate.classList.add('daaate');
        taskDate.textContent = tasks[i].getDate();
        task.appendChild(taskDate);

        //EDIT
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        task.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            editTaskModal.showModal();
            // STORE html data attribute with unique ID
            editTaskModal.setAttribute('uniqueID', tasks[i].uuid);
        });


        taskList.appendChild(task);
    }

}



