export { loadSampleData }
import {taskItemFactory} from "./task"
import {projectFactory, inbox} from "./project"
import {LS_addTask, LS_addProject} from "./localStorage"
import { DOM_ListProjects, DOM_Update } from "./page";



// Loads sample data into the LS and refreshes the page
function loadSampleData(){
    // Clear localStorage, start fresh
    localStorage.clear();
    let arr = [];
    localStorage.setItem("inbox", JSON.stringify(arr));

    // Build Projects
    const work = projectFactory("Work");
    work.addSelf();
    LS_addProject(work);  

    const automotive = projectFactory("Automotive");
    automotive.addSelf();
    LS_addProject(automotive);  


    // Build tasks
    //INBOX
    const feedCat = taskItemFactory("Feed my Cat", "Use only the kibbles in the drawer under the cuppboard!", '2022-12-23', false);
    inbox.appendTask(feedCat);  
    LS_addTask(inbox, feedCat);

    //WORK
    const salesproj = taskItemFactory("Finish Sales Projections", "2025 Q4 results need to be printed on 7.5x11 sheets, 50 copies ", '2023-02-05', true);
    work.appendTask(salesproj);  
    LS_addTask(work, salesproj);

    //AUTOMOTIVE
    const oilchange = taskItemFactory("Change car oil", "Use Shell Rotella T6", '', false);
    automotive.appendTask(oilchange);  
    LS_addTask(automotive, oilchange);
    

    //TODO: Instead of this, just refresh page
    DOM_ListProjects();
    DOM_Update();
}
