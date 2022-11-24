export { taskItemFactory }

const taskItemFactory = (title, date) => {
    let uuid = self.crypto.randomUUID();
    function getName(){
        return title;
    }
    function getDate(){
        return date;
    }
    function setName(newName){
        title = newName;
    }
    return { uuid, getName, setName, getDate };
};

