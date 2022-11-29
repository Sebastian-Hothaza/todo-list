export { createTask, editTask, removeTask, toggleCompleteTask, taskItemFactory }
import { LS_addTask, LS_editTask, LS_removeTask } from "./localStorage"
import { projects } from "./project";


const taskItemFactory = (title, date) => {
    let uuid = self.crypto.randomUUID();
    let taskComplete = false;
    
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

    function isComplete(){
        return taskComplete;
    }

    function toggleComplete(){
        if (taskComplete){
            taskComplete = false;
        }else{
            taskComplete = true;
        }
    }

    function markComplete(){
        taskComplete = true;
    }

    function markIncomplete(){
        taskComplete = false;
    }

    return { uuid, title, date, taskComplete, getName, setName, getDate, setDate, isComplete, toggleComplete, markComplete, markIncomplete };
};

// Creates a task using info from modal for a project
function createTask(project){
    // Fetch data from modal
    const title = document.querySelector('#modal #modalTitle').value;
    const date = document.querySelector('#modal #modalDate').value;

    // Create task object
    const newTask = taskItemFactory(title, date);

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