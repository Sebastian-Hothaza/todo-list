export { LS_addTask, LS_editTask, LS_removeTask, LS_addProject, LS_editProject, LS_removeProject, LS_load }
import { inbox, projectFactory } from "./project"
import { taskItemFactory } from "./task";


// Adds task object to existing project 
function LS_addTask(project, task){
    let LS_key;
    (project == inbox)? LS_key=project.title : LS_key=project.uuid

    let fetchedTasks = JSON.parse(localStorage.getItem(LS_key)); 
    fetchedTasks.push(task);
    localStorage.setItem(LS_key, JSON.stringify(fetchedTasks));
}

// Updates the LS in a project with given task containing updated info
function LS_editTask(project, task){
    let idx;
    let LS_key;
    if (project == inbox){
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
    (project == inbox)? LS_key="inbox" : LS_key=project.uuid
    
    let fetchedTasks = JSON.parse(localStorage.getItem(LS_key));
    // Filter: keep items that don't match the UUID of the task we want to remove
    localStorage.setItem(LS_key, JSON.stringify(fetchedTasks.filter(item => item.uuid != task.uuid)));
}

// Adds new project to LS
function LS_addProject(project){
    let arr = [project];
    localStorage.setItem(project.uuid, JSON.stringify(arr));
    // Append the newly created project UUID to tracker to preserve order when restore from LS
    LS_addProjectUUID(project.uuid);
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
    // Load inbox if it exists. NOTE: It always exists if LS_load is called!
    if (localStorage.getItem("inbox")){
        console.log("Inbox exists. Loading it now");
        let LS_tasks = JSON.parse(localStorage.getItem("inbox"));
        for (let i=0; i<LS_tasks.length; i++){
            let loadedTask = taskItemFactory(LS_tasks[i].title, LS_tasks[i].desc, LS_tasks[i].date, LS_tasks[i].priority);
            loadedTask.uuid = LS_tasks[i].uuid;  //TODO: THIS IS BROKEN AND DOES NOTHING ? NO! It does!
            loadedTask.complete = LS_tasks[i].complete;
            inbox.appendTask(loadedTask);
        }
    } 
    

    // Check if user projects exist
    if (JSON.parse(localStorage.getItem("projectsOrder"))){
        // Load UUID array and iterate thought it
        const objectsOrder = JSON.parse(localStorage.getItem("projectsOrder"));
        for (let i=0; i<objectsOrder.length; i++){
            
            // for each UUID, load in the project
            let loadedProject = projectFactory(JSON.parse(localStorage.getItem(objectsOrder[i]))[0].title);
            loadedProject.uuid = objectsOrder[i]; //TODO: THIS IS BROKEN AND DOES NOTHING ? NO! It does!
            loadedProject.addSelf();

            // Task loading
            let tasks = JSON.parse(localStorage.getItem(objectsOrder[i]));
            console.log("start loading tasks for project "+loadedProject.title);
            for (let j=1; j<tasks.length; j++){
                // console.log("--building new task: "+tasks[j].title);
                let loadedTask = taskItemFactory(tasks[j].title, tasks[j].desc, tasks[j].date, tasks[j].priority);
                loadedTask.uuid = tasks[j].uuid; //TODO: THIS IS BROKEN AND DOES NOTHING ? NO! It does!
                loadedTask.complete = tasks[j].complete;
                // Append the newly loaded object to the project
                loadedProject.appendTask(loadedTask);
            }
            
        }
    }
    
}

