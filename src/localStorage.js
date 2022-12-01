export { LS_addTask, LS_editTask, LS_removeTask, LS_addProject, LS_editProject, LS_removeProject, LS_load }
import { inbox, projectFactory } from "./project"
import { taskItemFactory } from "./task";


// Adds task object to existing project 
function LS_addTask(project, task){
    // We differentiate between inbox and custom project tasks
    if (project == inbox){
        let fetchedArray = JSON.parse(localStorage.getItem(project.getName()) || "[]");
        fetchedArray.push(task);
        localStorage.setItem(project.getName(), JSON.stringify(fetchedArray));
    }else{
        // TODO: This should be able to be simplified
        let fetchedArray = JSON.parse(localStorage.getItem(project.uuid) || "[]");
        fetchedArray.push(task);
        localStorage.setItem(project.uuid, JSON.stringify(fetchedArray));
    }
}

// Updates the LS in a project with given task containing updated info
function LS_editTask(project, task){
  
    let startingIdx;
    let projectKey;
    
    if (project == inbox){
        startingIdx = 0;
        projectKey = "inbox";
    }else{
        startingIdx = 1;
        projectKey = project.uuid;
    }
    
    let fetchedArray = JSON.parse(localStorage.getItem(projectKey));
    
    // go through array of tasks in the project until find matching ID, then update that task
    for ( ; startingIdx<fetchedArray.length; startingIdx++){
        if (fetchedArray[startingIdx].uuid == task.uuid){

            // Update the task here!
            fetchedArray[startingIdx].title = task.title;
            fetchedArray[startingIdx].desc = task.desc;
            fetchedArray[startingIdx].date = task.date;
            fetchedArray[startingIdx].priority = task.priority;
            fetchedArray[startingIdx].complete = task.complete;
            
            
            // Finally, set the item in LS
            localStorage.setItem(projectKey, JSON.stringify(fetchedArray));
        }
    }
}

// Updates the LS by removing the task
function LS_removeTask(project, task){
    let projectKey;
    (project == inbox)? projectKey="inbox" : projectKey=project.uuid
    
    let fetchedArray = JSON.parse(localStorage.getItem(projectKey));
    localStorage.setItem(projectKey, JSON.stringify(fetchedArray.filter(item => item.uuid != task.uuid)));
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
    let fetchedArray = JSON.parse(localStorage.getItem(project.uuid));
    fetchedArray[0].title = project.getName();
    localStorage.setItem(project.uuid, JSON.stringify(fetchedArray));
}

function LS_removeProject(project){
    localStorage.removeItem(project.uuid);
    // We also need to update projectsOrder!
    let fetchedOrderArray = JSON.parse(localStorage.getItem("projectsOrder")); //This is an array of UUID's
    localStorage.setItem("projectsOrder", JSON.stringify(fetchedOrderArray.filter(item => item != project.uuid)));
}

// Used to track order of projects by UUID so we can restore them in order
function LS_addProjectUUID(uuid){
    let fetchedArray = JSON.parse(localStorage.getItem("projectsOrder") || "[]");
    fetchedArray.push(uuid);
    localStorage.setItem("projectsOrder", JSON.stringify(fetchedArray));
}

// Load from LS
function LS_load(){
    // Load inbox if it exists. The inbox MUST be the first item loaded? Maybe not...just that the inbox tasks must be appened to inbox. check later
    if (localStorage.getItem("inbox")){
        // console.log("Inbox exists. Loading it now");
        let tasks = JSON.parse(localStorage.getItem("inbox"));
        for (let i=0; i<tasks.length; i++){
            let loadedTask = taskItemFactory(tasks[i].title, tasks[i].desc, tasks[i].date, tasks[i].priority);
            loadedTask.uuid = tasks[i].uuid; 
            loadedTask.complete = tasks[i].complete;
            inbox.appendTask(loadedTask);
        }
    }
    

    // Check if user projects exist
    if (JSON.parse(localStorage.getItem("projectsOrder"))){
        // Load UUID array and iterate thought it
        const objectsOrder = JSON.parse(localStorage.getItem("projectsOrder"));
        for (let i=0; i<objectsOrder.length; i++){
            // console.log("Building object with UUID "+objectsOrder[i]);

            // for each UUID, load in the project
            let loadedProject = projectFactory(JSON.parse(localStorage.getItem(objectsOrder[i]))[0].title);
            loadedProject.uuid = objectsOrder[i]; //TODO: THIS IS BROKEN AND DOES NOTHING ?
            loadedProject.addSelf();

            // Task loading
            let tasks = JSON.parse(localStorage.getItem(objectsOrder[i]));
            // console.log("start loading tasks for project "+loadedProject.getName());
            for (let j=1; j<tasks.length; j++){
                // console.log("--building new task: "+tasks[j].title);
                let loadedTask = taskItemFactory(tasks[j].title, tasks[j].desc, tasks[j].date, tasks[j].priority);
                loadedTask.uuid = tasks[j].uuid;
                loadedTask.complete = tasks[i].complete;
                // Append the newly loaded object to the project
                loadedProject.appendTask(loadedTask);
            }
            
        }
    }
    
}

