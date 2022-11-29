export { projectFactory, projects, inbox };


let projects = [];

// TODO: Some logic to ensure project name is unique. This logic possibly will not reside here
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

    function removeProject(id){
        projects = projects.filter(proj => proj.uuid != id); 
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

    
    return { uuid, title, appendTask, getTasks, getTask, getName, setName, addSelf, removeTask, removeProject};
};

const inbox = projectFactory('inbox');
inbox.addSelf();




