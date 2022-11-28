import { taskItemFactory } from "./task";
import { projectFactory, projects, inbox } from "./project";
import { format } from 'date-fns';

// ISSUE: Cannot edit a task in a project UNLESS that current project is selected!

export {DOM_ListTasks, DOM_ListRangeTasks, DOM_Update, resetSelection}

const modalConfirmBtn = document.querySelector('#modal #Confirm');
const modalProjectConfirmBtn = document.querySelector('#modalProject #Confirm');

const allTasksBtn = document.querySelector('#allTasks');
const todayBtn = document.querySelector('#today');
const thisWeekBtn = document.querySelector('#thisWeek');

// This tracks where new tasks should be placed. Starts off with being "inbox"
let workingProject = projects[0]; 

modalConfirmBtn.addEventListener('click', () => {
    (modal.getAttribute('modalType') == 'create') ? createTask(workingProject) : editTask();
});

modalProjectConfirmBtn.addEventListener('click', () => {
    (modalProject.getAttribute('modalType') == 'create') ? createProject() : editProject();
});

// Given an array of tasks, lists them all on the page. Listeners added here too!
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    // taskList.innerHTML = ''; CANT DO THIS HERE! Or we lose ability to append!

    // Loop thru array and list each task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
        task.classList.add('task');
        task.setAttribute('uuid', tasks[i].uuid);
        task.textContent = tasks[i].getName();

        const taskDate = document.createElement('div');
        taskDate.classList.add('daaate');
        taskDate.textContent = tasks[i].getDate();
        task.appendChild(taskDate);

        //EDIT
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        task.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            modal.setAttribute('modalType', 'edit');
            
            // STORE html data attribute with unique ID
            modal.setAttribute('uniqueID', tasks[i].uuid);

            // Set heading accordingly and pre-load fields with our tasks content
            document.querySelector('#modal #heading').textContent = 'Edit task';
            document.querySelector('#modal #modalTitle').value = tasks[i].getName();
            document.querySelector('#modal #modalDate').value = tasks[i].getDate();


            modal.showModal();
        });


        taskList.appendChild(task);
    }

}


// Given an array of tasks, lists the ones due within the range. 
// Note: When given a range of 1, it will only list tasks with same duedate as today!
function DOM_ListRangeTasks(tasks, range){
    const taskList = document.querySelector('#taskList');
    // taskList.innerHTML = ''; CANT DO THIS HERE! Or we lose ability to append!

    // Loop thru array and list each task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        
        // Convert due date into a date object so we can work with it
        var parts = tasks[i].getDate().split('-');
        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); 
        // Duedate is now in valid date obj form


        const time_diff = dueDate.getTime()-new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);
        
        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)
        if (range == 1 && (dueDate.getDate() != new Date().getDate())) continue;

        if (days_diff <= range){
            const task = document.createElement('div');
            task.setAttribute('uuid', tasks[i].uuid);
            task.classList.add('task');
            task.textContent = tasks[i].getName();
    
            const taskDate = document.createElement('div');
            taskDate.classList.add('daaate');
            taskDate.textContent = tasks[i].getDate();
            task.appendChild(taskDate);
    
            //EDIT
            const editBtn = document.createElement('button');
            editBtn.textContent = 'edit';
            task.appendChild(editBtn);
    
            editBtn.addEventListener('click', () => {
                modal.setAttribute('modalType', 'edit');
                
                // STORE html data attribute with unique ID
                modal.setAttribute('uniqueID', tasks[i].uuid);
    
                // Set heading accordingly and pre-load fields with our tasks content
                document.querySelector('#modal #heading').textContent = 'Edit task';
                document.querySelector('#modal #modalTitle').value = tasks[i].getName();
                document.querySelector('#modal #modalDate').value = tasks[i].getDate();
    
    
                modal.showModal();
            });    
            taskList.appendChild(task);
        }


    }
}

// Creates a task using info from modal for a project
function createTask(project){
    //console.log("createTask called");
    //console.log(project.getName()); 

    // Fetch data from modal
    const title = document.querySelector('#modal #modalTitle').value;
    const date = document.querySelector('#modal #modalDate').value;

    // Create task object
    const newTask = taskItemFactory(title, date);

    // Append the newly created object to the inbox
    project.appendTask(newTask);

    DOM_Update();
    resetModal();
}

// Updates a task using info from modal for a project
function editTask(){
    let task;
     // Check each project to search for the task we want to edit
    for (let i=0; i<projects.length; i++){
        if (projects[i].getTask(modal.getAttribute('uniqueID'))){ // Returns a task object, else undefined
            task = projects[i].getTask(modal.getAttribute('uniqueID'));
            break;
        }
    }

    // Update the task with the new params
    task.setName(document.querySelector('#modal #modalTitle').value);
    task.setDate(document.querySelector('#modal #modalDate').value);

    DOM_Update();
    resetModal();
}

// Updates DOM display (Optional: with a specified project)
// Needs to know which DOM is 'selected'
function DOM_Update(){
    // Clearing can only happen here! If we clear in the DOM_ListTasks method, we lose ability to append
    document.querySelector('#taskList').innerHTML = '';
    //console.log("cleared the DOM");

    if (document.querySelector('#allTasks').classList.contains('selected')){
        // We must print ALL tasks from ALL projects
        for (let i=0; i<projects.length; i++){
            DOM_ListTasks(projects[i].getTasks());
        }
        
    } else if (document.querySelector('#today').classList.contains('selected')) {
        // We must print ALL tasks from ALL projects that fit the criteria
        for (let i=0; i<projects.length; i++){
            DOM_ListRangeTasks(projects[i].getTasks(),1);
        }
        
    } else if (document.querySelector('#thisWeek').classList.contains('selected')) {
        // We must print ALL tasks from ALL projects that fit the criteria
        for (let i=0; i<projects.length; i++){
            DOM_ListRangeTasks(projects[i].getTasks(),7);
        }
    } else { //DOM updated for a project
        DOM_ListTasks(getActiveProject().getTasks());
    }
    
}

function createProject(){
    // Fetch data from modal
    const title = document.querySelector('#modalProject #modalTitle').value;

    // Create new project object and add it to the projects array
    const newProject = projectFactory(title);
    newProject.addSelf();

    // Make the freshly created project the center of attention!
    workingProject = newProject;

    DOM_ListProjects();
    DOM_Update();
    resetModalProject();
}

// Updates a task using info from modal
function editProject(){
    // Get the project we want to edit
    const project = projects.find(item => item.uuid == modalProject.getAttribute('uniqueID'));;

    // Update the project with the new params
    project.setName(document.querySelector('#modalProject #modalTitle').value);

    DOM_ListProjects();
    resetModalProject();
}

// Update sidebar DOM based on projects[]
function DOM_ListProjects(){
    const DOM_ProjectList = document.querySelector('#projectList');
    DOM_ProjectList.innerHTML = '';

    // Go through projects array and list each project. Skip 0 as it is inbox
    for (let i=1; i<projects.length; i++){
        const project = document.createElement('li');
        project.innerText = projects[i].getName();
        project.setAttribute('uuid', projects[i].uuid);

        if (workingProject == projects[i]) {
            resetSelection();
            project.classList.add('selected');
        }
        
        // Create listener for project
        project.addEventListener('click', () => {
            // CSS Styling
            resetSelection();
            project.classList.add('selected');
            workingProject = projects[i];
            //console.log("working project set to: "+workingProject.getName());
            DOM_Update();
        });
        

        //EDIT
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        project.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            modalProject.setAttribute('modalType', 'edit');
            
            // STORE html data attribute with unique ID
            modalProject.setAttribute('uniqueID', projects[i].uuid);

            // Set heading accordingly and pre-load fields with our projects content
            document.querySelector('#modalProject #heading').textContent = 'Edit project';
            document.querySelector('#modalProject #modalTitle').value = projects[i].getName();


            modalProject.showModal();
        });


        DOM_ProjectList.appendChild(project);
    }
}

// Note: we leave clearing of the page to the individual display function
allTasksBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    allTasksBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

todayBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    todayBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

thisWeekBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    thisWeekBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

// Resets all fields in the modal
function resetModal(){
    document.querySelector('#modal #modalTitle').value = '';
    document.querySelector('#modal #modalDate').value = '';
}

// Resets all fields in the modal
function resetModalProject(){
    document.querySelector('#modalProject #modalTitle').value = '';
}


// Clears "selected" tag on all elements
function resetSelection(){
    // Clear top 3
    document.querySelector('#allTasks').classList.remove('selected');
    document.querySelector('#today').classList.remove('selected');
    document.querySelector('#thisWeek').classList.remove('selected');

    // Clear projects
    const allProjects = document.querySelectorAll('li');

    allProjects.forEach((item) => {
        item.classList.remove('selected');
    });
}

// Queries the DOM on what the currently selected project is and returns project
function getActiveProject(){
    if (document.querySelector('#allTasks').classList.contains('selected')){
        return projects[0];
    }

    // Active project is a user created project! Find it and return it
    for (let item of document.querySelectorAll('li')){
        if (item.classList.contains('selected')){
            // Go through projects array, find matching project UUID and return it
            for (let i=0; i<projects.length; i++){
                if (item.getAttribute('uuid') == projects[i].uuid){
                    return projects[i];
                }
            }
        }
    }
}
