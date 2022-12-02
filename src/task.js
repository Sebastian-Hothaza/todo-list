export { taskItemFactory, createTask, editTask, removeTask, toggleCompleteTask, togglePriorityTask }
import { LS_addTask, LS_editTask, LS_removeTask } from "./localStorage"
import { projects } from "./project";


const taskItemFactory = (title, desc, date, priority) => {
    // NOTE: These defaults will need to be loaded in when recall from LocalStorage
    let uuid = self.crypto.randomUUID(); 
    let complete = false; 

    return {
        get title(){return title;}, set title(newTitle){title=newTitle},
        get desc(){return desc;}, set desc(newDesc){desc=newDesc},
        get date(){return date;}, set date(newDate){date=newDate},
        get priority(){return priority;}, set priority(newPriority){priority=newPriority},

        get complete(){return complete;}, set complete(newComplete){complete=newComplete},
        get uuid(){return uuid;}, set uuid(newUuid){uuid=newUuid}
    };
};

// Creates a task using info from modal for a project
function createTask(project){
    // Create task object
    const newTask = taskItemFactory(document.querySelector('#modal #modalTitle').value, 
                                    document.querySelector('#modal #modalDesc').value,
                                    document.querySelector('#modal #modalDate').value,
                                    document.querySelector('#modal #modalPriority').checked);

    
    project.appendTask(newTask); // Append the newly created object to the project
    LS_addTask(project, newTask); // Append the newly created task to localStorage. 
}

// Updates a task using info from modal for a project. Called from modal!
function editTask(){
    // NOTE: edit modal is marked with the uuid of the task we want to edit
    const project = projects.find(proj => proj.getTask(modal.getAttribute('uuid'))); // Get the project associated with the task we want to update
    const task = project.getTask(modal.getAttribute('uuid')); // Get the task we are wanting to edit

    // Update the task with the new params
    task.title = (document.querySelector('#modal #modalTitle').value);
    task.desc = (document.querySelector('#modal #modalDesc').value);
    task.date = (document.querySelector('#modal #modalDate').value);
    task.priority = (document.querySelector('#modal #modalPriority').checked);

    LS_editTask(project, task); // Update edited task to localStorage. 
}

// Removes a task from project
function removeTask(task){
    let project = getProject(task); // We need this otherwise LS won't find project since task doesn't exist in that project after deletion
    project.removeTask(task); // Removes the task from the project
    LS_removeTask(project, task); // Remove task from localStorage. 
}

// Toggles a task as complete
function toggleCompleteTask(task){
    (task.complete)? task.complete = false : task.complete = true
    LS_editTask(getProject(task),task); // Update the LS
}

// Toggles a task as priority
function togglePriorityTask(task){
    (task.priority)? task.priority = false : task.priority = true
    LS_editTask(getProject(task),task); // Update the LS
}

// Returns the project a task is associated with
function getProject(task){
    return projects.find(project => project.getTask(task.uuid) && task == project.getTask(task.uuid)); // Need to check for existance first!
}