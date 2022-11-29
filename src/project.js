export { createProject, editProject, removeProject, projectFactory, projects, inbox };
import { LS_addProject } from "./localStorage"

let projects = [];

// Todo: Why arent we exporting delete Project?

const projectFactory = (title) => {
    let uuid = self.crypto.randomUUID();
    let tasks = [];

    

    function appendTask(task){
        tasks.push(task);
    }


    // Returns all tasks associated with that project
    function getTasks(){ return tasks; }

    // Returns single task object matching id 
    function getTask(id){
        return tasks.find(item => item.uuid == id);
    }

    function removeTask(id){
        tasks = tasks.filter(task => task.uuid != id); 
    }

    function getName(){
        return title;
    }

    function setName(newTitle){
        title = newTitle;
    }

    function addSelf(){
        projects.push(this);
    }

    
    return { uuid, title, appendTask, getTasks, getTask, getName, setName, addSelf, removeTask};
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

    

    // Make the freshly created project the center of attention!
    // workingProject = newProject; TODO; move out to page?

    
}

// Updates a project using info from modal
function editProject(){
    // Get the project we want to edit
    const project = projects.find(item => item.uuid == modalProject.getAttribute('uuid'));;

    // Update the project with the new params
    project.setName(document.querySelector('#modalProject #modalTitle').value);
}

function removeProject(id){
    projects = projects.filter(proj => proj.uuid != id);
}