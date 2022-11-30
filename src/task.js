export { createTask, editTask, removeTask, toggleCompleteTask, togglePriorityTask, taskItemFactory }
import { LS_addTask, LS_editTask, LS_removeTask } from "./localStorage"
import { projects } from "./project";


const taskItemFactory = (title, desc, date, priority, complete) => {
    let uuid = self.crypto.randomUUID();
    
    function getName(){
        return title;
    }
    function setName(newName){
        title = newName;
    }
    function getDate(){
        return date;
    }
    function setDate(newDate){
        date = newDate;
    }

    function getDesc(){
        return desc;
    }
    function setDesc(newDesc){
        desc = newDesc;
    }

    function isPriority(){
        return priority;
    }
    function setPriority(newPriority){
        priority = newPriority;
    }

    function isComplete(){
        return complete;
    }

    function toggleComplete(){
        if (complete){
            complete = false;
        }else{
            complete = true;
        }
    }
    function togglePriority(){
        if (priority){
            priority = false;
        }else{
            priority = true;
        }
    }

    function markComplete(){
        complete = true;
    }

    function markIncomplete(){
        complete = false;
    }

    return { uuid, title, desc, date, priority, complete, getName, setName, getDate, setDate, getDesc, setDesc,isPriority, setPriority, togglePriority, isComplete, toggleComplete, markComplete, markIncomplete };
};

// Creates a task using info from modal for a project
function createTask(project){
    // Fetch data from modal
    const title = document.querySelector('#modal #modalTitle').value;
    const desc = document.querySelector('#modal #modalDesc').value;
    const date = document.querySelector('#modal #modalDate').value;
    const priority = document.querySelector('#modal #modalPriority').checked;
    
    // Create task object
    const newTask = taskItemFactory(title, desc, date, priority, false);

    // Append the newly created task to localStorage. 
    LS_addTask(project, newTask);

    // Append the newly created object to the project
    project.appendTask(newTask);    
}

// Updates a task using info from modal for a project
function editTask(){
    let task;
    let project;
     // Check each project to search for the task we want to edit
     // The edit modal is marked with the uuid of the task we want to edit
    for (let i=0; i<projects.length; i++){
        if (projects[i].getTask(modal.getAttribute('uuid'))){ // Returns a task object, else undefined
            task = projects[i].getTask(modal.getAttribute('uuid'));
            project = projects[i];
            break;
        }
    }

    // Update the task with the new params
    task.setName(document.querySelector('#modal #modalTitle').value);
    task.setDate(document.querySelector('#modal #modalDate').value);
    task.setDesc(document.querySelector('#modal #modalDesc').value);
    task.setPriority(document.querySelector('#modal #modalPriority').checked);


    // Update edited task to localStorage. 
    LS_editTask(project, task);
 
}

// Removes a task by uuid from project
function removeTask(task){
    let project;
    // Check each project to see where the task is located
   for (let i=0; i<projects.length; i++){
       if (projects[i].getTask(task.uuid) && task.uuid == projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match
           // Remove the task in the corresponding project
           projects[i].removeTask(task.uuid);
           project = projects[i];
           break;
       }
   }
    // Remove task from localStorage. 
    LS_removeTask(project, task);
}

// Toggles a task as complete
function toggleCompleteTask(task){
    task.toggleComplete();
    let project;
    // We've updated the task object, now we need to update the LS

     // Check each project to see where the task is located
    for (let i=0; i<projects.length; i++){
        if (projects[i].getTask(task.uuid) && task.uuid == projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match
            project = projects[i];
            break;
        }
    }
    // Update the LS
    LS_editTask(project,task);
}

// Toggles a task as priority
function togglePriorityTask(task){
    task.togglePriority();
    let project;
    // We've updated the task object, now we need to update the LS

     // Check each project to see where the task is located
    for (let i=0; i<projects.length; i++){
        if (projects[i].getTask(task.uuid) && task.uuid == projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match
            project = projects[i];
            break;
        }
    }
    // Update the LS
    LS_editTask(project,task);
}


// TODO: Privatize elements as follows:

/*

check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

const objectFactory = (value) =>{
    function getValue(){ return value; }
    function setValue(newValue){ value=newValue; }
    const toJSON = () => {
        return JSON.stringify({value})
    }
    return { getValue, setValue, toJSON }
};

const myObject = objectFactory("John");

*/



