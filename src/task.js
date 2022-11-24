export { taskItemFactory }

const taskItemFactory = (title, date) => {
    let uuid = self.crypto.randomUUID();
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

    return { uuid, getName, setName, getDate, setDate};
};

