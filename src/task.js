export { taskItemFactory }

const taskItemFactory = (title) => {
    function getname(){
        return title;
    }
    function setname(newName){
        title = newName;
    }
    return { title, getname, setname };
};

