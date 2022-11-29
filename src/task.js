export { taskItemFactory }

const taskItemFactory = (title, date) => {
    let uuid = self.crypto.randomUUID();
    let taskComplete = false;
    
    function getName(){
        return title;
    }
    function setName(newName){
        title = newName;
    }
    function getDate(){
        return date;
    }
    function setDate(newDate){
        date = newDate;
    }

    function isComplete(){
        return taskComplete;
    }

    function toggleComplete(){
        if (taskComplete){
            taskComplete = false;
        }else{
            taskComplete = true;
        }
    }

    return { uuid, title, date, getName, setName, getDate, setDate, isComplete, toggleComplete};
};

