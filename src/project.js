export { projectFactory, projects, inbox };


let projects = [];

// TODO: Some logic to ensure project name is unique. This logic possibly will not reside here
const projectFactory = (title) => {
    let uuid = self.crypto.randomUUID();
    let tasks = [];

    

    function appendTask(task){ tasks.push(task); }

    function printTasks(){
        console.log(title + " has the following tasks: ");
        for (let i=0; i<tasks.length; i++){
            console.log("--"+tasks[i].getname());
        }
    }

    // Returns all tasks associated with that project
    function getTasks(){ return tasks; }

    // Returns single task object matching id 
    function getTask(id){
        return tasks.find(item => item.uuid == id);
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

    
    return { uuid, appendTask, printTasks, getTasks, getTask, getName, setName, addSelf};
};

const inbox = projectFactory('inbox');
inbox.addSelf();



