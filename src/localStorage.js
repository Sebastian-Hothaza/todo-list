export { LS_addTask, LS_editTask, LS_removeTask, LS_addProject, LS_editProject, LS_removeProject, LS_load }
import { projects, projectFactory } from "./project"
import { taskItemFactory } from "./task";

/*
*** A note about UUID loading from LocalStorage ***
UUID loading is required since once a task is stored in LS, that UUID persists with it.
When we create new task from LS_load, if we don't re-use that UUID, we get a random one to which the delete btn associates with.
Thus when we click delete, the UUID doesn't match and we cannot update the LS to remove it
*/


// Adds task object to existing project 
function LS_addTask(project, task){
    let LS_key;
    (project == projects[0])? LS_key=project.title : LS_key=project.uuid

    let fetchedTasks = JSON.parse(localStorage.getItem(LS_key)); 
    fetchedTasks.push(task);
    localStorage.setItem(LS_key, JSON.stringify(fetchedTasks));
}

// Updates the LS in a project with given task containing updated info
function LS_editTask(project, task){
    let idx;
    let LS_key;
    if (project == projects[0]){
        idx = 0;
        LS_key = "inbox";
    }else{
        idx = 1;
        LS_key = project.uuid;
    }
    
    let fetchedTasks = JSON.parse(localStorage.getItem(LS_key));
    
    // go through tasks in the project until find matching ID, then update that task
    for ( ; idx<fetchedTasks.length; idx++){
        if (fetchedTasks[idx].uuid == task.uuid){

            // Update the task here!
            fetchedTasks[idx].title = task.title;
            fetchedTasks[idx].desc = task.desc;
            fetchedTasks[idx].date = task.date;
            fetchedTasks[idx].priority = task.priority;
            fetchedTasks[idx].complete = task.complete;
            
            // Finally, set the item in LS
            localStorage.setItem(LS_key, JSON.stringify(fetchedTasks));
            break; // No need to check remaining tasks
        }
    }
}

// Updates the LS by removing the task
function LS_removeTask(project, task){
    let LS_key;
    (project == projects[0])? LS_key="inbox" : LS_key=project.uuid
    
    let fetchedTasks = JSON.parse(localStorage.getItem(LS_key));
    // Filter: keep items that don't match the UUID of the task we want to remove
    localStorage.setItem(LS_key, JSON.stringify(fetchedTasks.filter(item => item.uuid != task.uuid)));
}

// Adds new project to LS
function LS_addProject(project){
    let arr = [project];
    localStorage.setItem(project.uuid, JSON.stringify(arr));
    LS_addProjectUUID(project.uuid); // Append the newly created project UUID to tracker to preserve order when restore from LS
}

// Updates the LS for a project with updated info
function LS_editProject(project){
    let fetchedTasks = JSON.parse(localStorage.getItem(project.uuid));
    fetchedTasks[0].title = project.title;
    localStorage.setItem(project.uuid, JSON.stringify(fetchedTasks));
}

function LS_removeProject(project){
    localStorage.removeItem(project.uuid);
    // We also need to update projectsOrder!
    let fetchedOrder = JSON.parse(localStorage.getItem("projectsOrder")); //This is an array of UUID's
    // Filter: keep items that don't match the UUID of the project we want to remove
    localStorage.setItem("projectsOrder", JSON.stringify(fetchedOrder.filter(item => item != project.uuid)));
}

// Used to track order of projects by UUID so we can restore them in order
function LS_addProjectUUID(uuid){
    let fetchedArray = JSON.parse(localStorage.getItem("projectsOrder") || "[]");
    fetchedArray.push(uuid);
    localStorage.setItem("projectsOrder", JSON.stringify(fetchedArray));
}

// Load from LS
function LS_load(){
    // Load inbox 
    let LS_inboxTasks = JSON.parse(localStorage.getItem("inbox"));
    for (let i=0; i<LS_inboxTasks.length; i++){
        let loadedTask = taskItemFactory(LS_inboxTasks[i].title, LS_inboxTasks[i].desc, LS_inboxTasks[i].date, LS_inboxTasks[i].priority);
        loadedTask.uuid = LS_inboxTasks[i].uuid; 
        loadedTask.complete = LS_inboxTasks[i].complete;
        projects[0].appendTask(loadedTask);
    }
     
    // If there are no user projects to load, we are done
    if (!(JSON.parse(localStorage.getItem("projectsOrder")))) return;

    // Load user projects in order of which they were originally created (specified by projectsOrder)
    const objectsOrder = JSON.parse(localStorage.getItem("projectsOrder"));

    // Go through the UUID's and load in the corresponding project and its tasks
    for (let i=0; i<objectsOrder.length; i++){
        // for each UUID, load in the project
        let loadedProject = projectFactory(JSON.parse(localStorage.getItem(objectsOrder[i]))[0].title); 
        // TODO: Why not load tasks here? Can we do that directly instead of the for loop below? (like how we assign the uuid)
        loadedProject.uuid = objectsOrder[i]; 
        projects.push(loadedProject);

        // Task loading
        let LS_tasks = JSON.parse(localStorage.getItem(objectsOrder[i]));
        
        for (let j=1; j<LS_tasks.length; j++){
            let loadedTask = taskItemFactory(LS_tasks[j].title, LS_tasks[j].desc, LS_tasks[j].date, LS_tasks[j].priority);
            loadedTask.uuid = LS_tasks[j].uuid; 
            loadedTask.complete = LS_tasks[j].complete;
            loadedProject.appendTask(loadedTask);
        }
    }
}
