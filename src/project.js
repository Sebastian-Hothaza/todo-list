export { projectFactory, projects, inbox };


const projects = [];

// TODO: Some logic to ensure project name is unique
const projectFactory = (title) => {
    let tasks = [];
    projects.push(title);

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

    
    return { title, appendTask, printTasks, getTasks, getTask};
};

const inbox = projectFactory('inbox');



