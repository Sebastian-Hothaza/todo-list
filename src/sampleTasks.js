export { loadSampleData, clear }
import {taskItemFactory} from "./task"
import {projectFactory, projects } from "./project"
import {LS_addTask, LS_addProject} from "./localStorage"


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var tdy = new Date().toLocaleDateString('en-CA', {timezone:'EST'});
var tmw = new Date().addDays(1).toLocaleDateString('en-CA', {timezone:'EST'});
var thisWeek = new Date().addDays(Math.floor(Math.random() * 7) + 2).toLocaleDateString('en-CA', {timezone:'EST'});
var farAway = new Date().addDays(Math.floor(Math.random() * 200) + 10).toLocaleDateString('en-CA', {timezone:'EST'});

// Loads sample data into the LS and refreshes the page
function loadSampleData(){
    // Clear localStorage, start fresh
    localStorage.clear();
    let arr = [];
    localStorage.setItem("inbox", JSON.stringify(arr));

    
    // Build Projects
    const shopping = projectFactory("Shopping List");
    projects.push(shopping);
    LS_addProject(shopping);

    const work = projectFactory("Workplace");
    projects.push(work);
    LS_addProject(work);  

    const vacation = projectFactory("Cuba Vacation Planning");
    projects.push(vacation);
    LS_addProject(vacation);

    const house = projectFactory("House Renovations");
    projects.push(house);
    LS_addProject(house);  

    const automotive = projectFactory("Car Work To-Do");
    projects.push(automotive);
    LS_addProject(automotive);  


    // Build tasks
    //INBOX
    createTask(projects[0], "Feed Garfield", "No more than 2 cups of kibbles!", tmw, false);
    createTask(projects[0], "Renew Amazon Prime Subscription", "Double check if there is a discount for 2-yr renewal", thisWeek, true);
    createTask(projects[0], "Water the Lawn", "", tdy, false);

    // SHOPPING
    createTask(shopping, "Apples", "", '', false);
    createTask(shopping, "Bananas", "", '', false);
    createTask(shopping, "Eggs", "2 dozen", '', false);
    createTask(shopping, "Milk", "", '', false);
    createTask(shopping, "Cheetos", "Crispy!", '', true);

    // WORK
    createTask(work, "Pay back Jarod for Friday's lunch", "", thisWeek, false);
    createTask(work, "Finish Sales Projections", "2025 Q4 results need to be printed on 7.5x11 sheets, 50 copies", tdy, true);
    createTask(work, "Ask for a promotion", "Bring extra coffee for Sam, he likes that", tdy, false);
    createTask(work, "Take team out for welcome lunch", "East Side Mario's", thisWeek, false);

    // VACATION
    createTask(vacation, "Get foreign-plug adapter", "", thisWeek, false);
    createTask(vacation, "Renew VISA's", "See if we can do it for 5 years?", tmw, true);
    createTask(vacation, "Save up $15,000", "You can do it!", '', false);

    // HOUSE
    createTask(house, "Measure square-footage for each bedroom", "", farAway, false);
    createTask(house, "Fix leaky faucet!", "", tdy, true);
    createTask(house, "Book appointment for roof inspection", "Call Mike (226)-913-1322", thisWeek, false);
    

    // AUTOMOTIVE
    createTask(automotive, "Change car oil", "Use Shell Rotella T6", thisWeek, true);
    createTask(automotive, "Change air filter", "", farAway, false);
    createTask(automotive, "Buy a new car", "2020+ BMW X3m40i", '2023-12-25', true);
    
    location.reload();
}

function createTask(project, title, desc, date, priority){
    const newProj = taskItemFactory(title, desc, date, priority);
    project.appendTask(newProj);  
    LS_addTask(project, newProj);
}

// Clears the localStorage and refreshes the site
function clear(){
    localStorage.clear();
    location.reload();
}