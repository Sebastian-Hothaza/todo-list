export { createTask, editTask, removeTask, toggleCompleteTask, togglePriorityTask, taskItemFactory }
import { LS_addTask, LS_editTask, LS_removeTask } from "./localStorage"
import { projects } from "./project";


const taskItemFactory = (title, desc, date, priority) => {
    // NOTE: These defaults will need to be loaded in when recall from LocalStorage
    let uuid = self.crypto.randomUUID(); 
    let complete = false; 

    // TODO: Can we get rid of/simply these toggles?
    
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

    return {
        get title(){return title;}, set title(newTitle){title=newTitle},
        get desc(){return desc;}, set desc(newDesc){desc=newDesc},
        get date(){return date;}, set date(newDate){date=newDate},
        get priority(){return priority;}, set priority(newPriority){priority=newPriority},

        get complete(){return complete;}, set complete(newComplete){complete=newComplete},
        get uuid(){return uuid;}, set uuid(newUuid){uuid=newUuid},
        
        toggleComplete, togglePriority
    };
};

// Creates a task using info from modal for a project
function createTask(project){
    // Fetch data from modal
    const title = document.querySelector('#modal #modalTitle').value;
    const desc = document.querySelector('#modal #modalDesc').value;
    const date = document.querySelector('#modal #modalDate').value;
    const priority = document.querySelector('#modal #modalPriority').checked;
    
    // Create task object
    const newTask = taskItemFactory(title, desc, date, priority);

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
    task.title = (document.querySelector('#modal #modalTitle').value);
    task.desc = (document.querySelector('#modal #modalDesc').value);
    task.date = (document.querySelector('#modal #modalDate').value);
    task.priority = (document.querySelector('#modal #modalPriority').checked);


    // Update edited task to localStorage. 
    LS_editTask(project, task);
 
}

// Removes a task from project
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
