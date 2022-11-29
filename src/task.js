export { createTask, editTask, removeTask, taskItemFactory }
import { LS_addTask } from "./localStorage"
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

    return { uuid, title, date, getName, setName, getDate, setDate, isComplete, toggleComplete};
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
     // Check each project to search for the task we want to edit
     // The edit modal is marked with the uuid of the task we want to edit
    for (let i=0; i<projects.length; i++){
        if (projects[i].getTask(modal.getAttribute('uuid'))){ // Returns a task object, else undefined
            task = projects[i].getTask(modal.getAttribute('uuid'));
            break;
        }
    }

    // Update the task with the new params
    task.setName(document.querySelector('#modal #modalTitle').value);
    task.setDate(document.querySelector('#modal #modalDate').value);

 
}

// Removes a task by uuid
function removeTask(id){
    // Check each project to see where the task is located
   for (let i=0; i<projects.length; i++){
       if (projects[i].getTask(id) && id == projects[i].getTask(id).uuid){ // We check that the task exists AND then if the uuid match
           // Remove the task in the corresponding project
           projects[i].removeTask(id);
           break;
       }
   }
}