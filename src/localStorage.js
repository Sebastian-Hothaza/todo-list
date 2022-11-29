export { LS_addTask, LS_editTask, LS_addProject, LS_load }
import { inbox, projectFactory } from "./project"
import { taskItemFactory } from "./task";


// Adds task object to existing project.
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

// Adds new project to LS
function LS_addProject(project){
    console.log("Adding project to LS: "+project.getName());
    let arr = [project];
    localStorage.setItem(project.uuid, JSON.stringify(arr));
    // Append the newly created project UUID to tracker to preserve order when restore from LS
    LS_addProjectUUID(project.uuid);
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
            let loadedTask = taskItemFactory(tasks[i].title, tasks[i].date);
            loadedTask.uuid = tasks[i].uuid; // THIS DOES NOTHING! CAN NOT ACCESS DIRECTLY HERE. In fact, can write garbage here
            tasks[i].taskComplete? loadedTask.markComplete() : loadedTask.markIncomplete()
            inbox.appendTask(loadedTask);
        }
    }
    

    // Check if user projects exist
    if (JSON.parse(localStorage.getItem("projectsOrder"))){
        console.log("Loading user project");
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
                let loadedTask = taskItemFactory(tasks[j].title, tasks[j].date);
                loadedTask.uuid = tasks[j].uuid; 
                tasks[j].taskComplete? loadedTask.markComplete() : loadedTask.markIncomplete();
                
                // Append the newly loaded object to the project
                loadedProject.appendTask(loadedTask);
            }
            
        }
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
            fetchedArray[startingIdx].title = task.getName();
            fetchedArray[startingIdx].date = task.getDate();
            fetchedArray[startingIdx].taskComplete = task.isComplete();
            
            // Finally, set the item in LS
            localStorage.setItem(projectKey, JSON.stringify(fetchedArray));
        }
    }
}