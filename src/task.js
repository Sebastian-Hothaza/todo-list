export { taskItemFactory }

const taskItemFactory = (title) => {
    function sayname(){
        console.log(title);
    }
    function getname(){
        return title;
    }
    return { title, sayname, getname };
};

