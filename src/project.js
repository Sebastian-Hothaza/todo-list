export { projectFactory, projects };


const projects = [];

// TODO: Some logic to ensure project name is unique

const projectFactory = (title) => {
    let tasks = [];

    
    function appendTask(task){
        tasks.push(task);
    }

    function printTasks(){
        console.log(title + " has the following tasks: ");
        for (let i=0; i<tasks.length; i++){
            console.log("--"+tasks[i].getname());
        }
    }

    function getTasks(){
        return tasks;
    }



    projects.push(title);
    return { title, appendTask, printTasks, getTasks};
};



