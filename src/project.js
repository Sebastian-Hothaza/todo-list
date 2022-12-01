export { createProject, editProject, removeProject, projectFactory, projects, inbox };
import { LS_addProject, LS_editProject, LS_removeProject } from "./localStorage"

let projects = [];

const projectFactory = (title) => {
    let uuid = self.crypto.randomUUID();
    let tasks = [];

    function appendTask(task){
        tasks.push(task);
    }

    // Returns single task object matching id 
    function getTask(id){
        return tasks.find(item => item.uuid == id);
    }

    function removeTask(id){
        tasks = tasks.filter(task => task.uuid != id); 
    }

    
    //TODO: can we do this as part of CTOR?
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
    // Fetch data from modal
    const title = document.querySelector('#modalProject #modalTitle').value;

    // Create new project object and add it to the projects array
    const newProject = projectFactory(title);
    newProject.addSelf();

    // Append the newly created project to localStorage. 
    LS_addProject(newProject);    
}

// Updates a project using info from modal
function editProject(){
    // Get the project we want to edit
    const project = projects.find(item => item.uuid == modalProject.getAttribute('uuid'));

    // Update the project with the new params
    project.title = (document.querySelector('#modalProject #modalTitle').value);

    // Update edited project to localStorage. 
    LS_editProject(project);
}

function removeProject(project){
    projects = projects.filter(proj => proj.uuid != project.uuid);
    LS_removeProject(project);
}