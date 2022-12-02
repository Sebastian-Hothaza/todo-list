export { createProject, editProject, removeProject, projectFactory, projects };
import { LS_addProject, LS_editProject, LS_removeProject } from "./localStorage"

let projects = [];

const projectFactory = (title) => {
    let uuid = self.crypto.randomUUID();
    let tasks = [];
    // console.log("CTOR run for project "+title);
    // console.log("this "+this);

    function appendTask(task){ tasks.push(task); }

    // Returns single task object matching id. Needs to work on uuid basis due to modal uuid fetching
    function getTask(id){ return tasks.find(item => item.uuid == id); }

    // Modifies tasks array to remove a task
    function removeTask(task){ tasks = tasks.filter(tsk => task != tsk);}

    //TODO: can we do this as part of CTOR for project?
    function addSelf(){ 
        projects.push(this);
    }

    
    return { 
        get title(){return title;}, set title(newTitle){title=newTitle},
        get uuid(){return uuid;}, set uuid(newUuid){uuid=newUuid},
        get tasks(){return tasks;}, getTask,
        appendTask, addSelf, removeTask
    };
};

const inbox = projectFactory('inbox');
inbox.addSelf();

// Creates a project using info from modal
function createProject(){
    // Create new project object and add it to the projects array
    const newProject = projectFactory(document.querySelector('#modalProject #modalTitle').value);
    newProject.addSelf();
     
    LS_addProject(newProject); // Append the newly created project to localStorage.
}

// Updates a project using info from modal
function editProject(){
    const project = projects.find(item => item.uuid == modalProject.getAttribute('uuid')); // Get the project we want to edit
    project.title = document.querySelector('#modalProject #modalTitle').value; // Update the project with the new params

    LS_editProject(project); // Update edited project to localStorage. 
}

function removeProject(project){
    projects = projects.filter(proj => proj != project);
    LS_removeProject(project);
}
