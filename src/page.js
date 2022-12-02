export { DOM_Update, DOM_ListProjects, HOTKEY_selectAllTasks, HOTKEY_selectTdyTasks, HOTKEY_selectWeekTasks }
import { createTask, editTask, removeTask, toggleCompleteTask } from "./task";
import { createProject, editProject, removeProject, projects } from "./project";

let workingProject = projects[0]; 

// -----------------------------   MODAL BUTTONS   -----------------------------
const modalForm = document.querySelector('#taskForm');
const modalProjectForm = document.querySelector('#projectForm');

modalForm.addEventListener('submit', () => {
    (modal.getAttribute('modalType') == 'create') ? createTask(workingProject) : editTask();
    DOM_Update();
    resetModal();
});

modalProjectForm.addEventListener('submit', () => {
    if ((modalProject.getAttribute('modalType') == 'create')){
        createProject();
        workingProject = projects[projects.length - 1];
    }else{
        editProject();
    }
    DOM_ListProjects();
    DOM_Update();
    resetModalProject();
});
// -----------------------------------------------------------------------------


// -----------------------------   MENU BUTTONS   -----------------------------
const allTasksBtn = document.querySelector('#allTasks');
const todayBtn = document.querySelector('#today');
const thisWeekBtn = document.querySelector('#thisWeek');
const clearCompleteBtn = document.querySelector('#clearComplete');
const resetStorageBtn = document.querySelector('#resetStorage');

allTasksBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    allTasksBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

function HOTKEY_selectAllTasks(){
     // CSS styling
     resetSelection();
     allTasksBtn.classList.add('selected');
     workingProject = projects[0];
     DOM_Update();
}

todayBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    todayBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

function HOTKEY_selectTdyTasks(){
    // CSS styling
    resetSelection();
    todayBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
}

thisWeekBtn.addEventListener('click', () => {
    // CSS styling
    resetSelection();
    thisWeekBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
});

function HOTKEY_selectWeekTasks(){
    // CSS styling
    resetSelection();
    thisWeekBtn.classList.add('selected');
    workingProject = projects[0];
    DOM_Update();
}

clearCompleteBtn.addEventListener('click', () => {
    projects.forEach((project) => {
        // Go through each task in the project
        for (let i=0; i<project.tasks.length; ){
            if (project.tasks[i].complete){
                removeTask(project.tasks[i]); 
                continue;
            }
            i++; // We increment i only if item not found
        }
    });
    DOM_Update();
});

resetStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
// -----------------------------------------------------------------------------

// Indirectly updates DOM by calling DOM_ListTasks dependent on currently selected sidebar heading
function DOM_Update(){
    document.querySelector('#taskList').innerHTML = ''; // Clearing can only happen here! If we clear in the DOM_ListTasks method, we lose ability to append

    if (document.querySelector('#allTasks').classList.contains('selected')){
        projects.forEach(proj => DOM_ListTasks(proj,-1));
    } else if (document.querySelector('#today').classList.contains('selected')) {
        projects.forEach(proj => DOM_ListTasks(proj,1));
    } else if (document.querySelector('#thisWeek').classList.contains('selected')) {
        projects.forEach(proj => DOM_ListTasks(proj,7));
    } else { 
        DOM_ListTasks(workingProject,-1); //Print ALL tasks from currently selected project
    }
}

// Appends the project header to the DOM 
function DOM_printProjectHeader(project){
    const taskList = document.querySelector('#taskList');
    const projSep = document.createElement('div');
    projSep.innerText = project.title;
    projSep.classList.add('projectSeparator');
    taskList.appendChild(projSep);
}

// Given a project, updates DOM with the valid tasks
// range:-1 -> list all tasks
// range: 1 -> list all tasks due today
// range: n -> list all tasks occuring over the next n days 
function DOM_ListTasks(project, range){
    const taskList = document.querySelector('#taskList');
    let headerPrinted = false;
    let tasks = project.tasks; //TODO: Simplify in here, maybe use forEach

    // Check if project is a user project (thus we need to print the heading)
    let isUserProject = !(document.querySelector('#allTasks').classList.contains('selected') || 
                        document.querySelector('#today').classList.contains('selected') || 
                        document.querySelector('#thisWeek').classList.contains('selected'));


    // Loop thru task array and list each valid task
    project.tasks.forEach(task => {

        // Convert due date into a date object so we can work with it
        var parts = task.date.split('-');
        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); 
        const time_diff = dueDate.getTime()-new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);

        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)
        if (range == 1 && (dueDate.getDate() != new Date().getDate())) return;
        
        // Exclude tasks which fail criteria
        if (!(range == -1 || (days_diff <= range && days_diff>-1))) return; 

        // Print project header
        if (!headerPrinted && project != projects[0] && !isUserProject) {
            DOM_printProjectHeader(project);
            headerPrinted = true;
        }

        // Create the task container
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
       
        task.complete? taskContainer.classList.add('taskComplete') : taskContainer.classList.remove('taskComplete')
        task.priority? taskContainer.classList.add('taskPriority') : taskContainer.classList.remove('taskPriority')

        // COMPLETE
        const toggleCompleteBtn = document.createElement('button');
        toggleCompleteBtn.classList.add('taskCompleteBtn');
        
        const completeIcon = document.createElement('span');
        completeIcon.classList.add("material-icons-outlined");
        task.complete? completeIcon.textContent = 'check_circle' : completeIcon.textContent = 'circle'
        toggleCompleteBtn.appendChild(completeIcon);

        taskContainer.appendChild(toggleCompleteBtn);
        toggleCompleteBtn.addEventListener('click', () => {
            toggleCompleteTask(task);
            DOM_Update();
        });
        
        // CARD
        const taskCard = document.createElement('div');
        taskCard.classList.add('taskCard');

        // LEFT: title and description
        const cardLeft = document.createElement('div');
        cardLeft.classList.add('cardLeft');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('taskTitle');
        taskTitle.textContent = task.title;
        cardLeft.appendChild(taskTitle);

        // Only add Desc to DOM if it exists
        if (task.desc){
            const taskDesc = document.createElement('div');
            taskDesc.classList.add('taskDesc');
            taskDesc.textContent = task.desc;
            cardLeft.appendChild(taskDesc);
        }

        taskCard.appendChild(cardLeft);


        // RIGHT: date, edit and delete buttons
        const cardRight = document.createElement('div');
        cardRight.classList.add('cardRight');
    
        const taskDate = document.createElement('div');
        taskDate.classList.add('taskDate');
        taskDate.textContent = task.date;
        cardRight.appendChild(taskDate);

        //EDIT
        const editBtn = document.createElement('button');
        const editBtnIcon = document.createElement('span');
        editBtnIcon.classList.add("material-icons-outlined");
        editBtnIcon.textContent = 'edit';
        editBtn.appendChild(editBtnIcon);
        cardRight.appendChild(editBtn);
        editBtn.addEventListener('click', () => {
            modal.setAttribute('modalType', 'edit');
            
            // STORE html data attribute with unique ID
            modal.setAttribute('uuid', task.uuid);

            // Set heading accordingly and pre-load fields with our tasks content
            document.querySelector('#modal #heading').textContent = 'Edit task';
            document.querySelector('#modal #modalTitle').value = task.title;
            document.querySelector('#modal #modalDate').value = task.date;
            document.querySelector('#modal #modalDesc').value = task.desc;
            document.querySelector('#modal #modalPriority').checked = task.priority;


            modal.showModal();
        });  


        //DELETE
        const deleteBtn = document.createElement('button');
        const deleteBtnIcon = document.createElement('span');
        deleteBtnIcon.classList.add("material-icons-outlined");
        deleteBtnIcon.textContent = 'delete';
        deleteBtn.appendChild(deleteBtnIcon);
        cardRight.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            removeTask(task);
            DOM_Update();
        });
        taskCard.appendChild(cardRight);

        
        
        
        // Done building taskCard, append it to the taskContainer
        taskContainer.appendChild(taskCard);


        // DONE building task container, now append it
        taskList.appendChild(taskContainer);

    });
}

// Update sidebar DOM based on projects[]
function DOM_ListProjects(){
    const DOM_ProjectList = document.querySelector('#projectList');
    DOM_ProjectList.innerHTML = '';

    projects.forEach((project,idx) => {
        if (idx==0) return; // Go through projects array and list each project. Skip 0 as it is inbox

        // ProjectContainer
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('projectContainer');
        if (workingProject == project) {
            resetSelection();
            projectContainer.classList.add('selected');
        }
        // Create listener for project. This may be an issue due to event bubbling
        projectContainer.addEventListener('click', () => {
            workingProject = project;
            resetSelection();
            projectContainer.classList.add('selected');
            DOM_Update();
        });

        // Title
        const projectTitle = document.createElement('div');
        projectTitle.innerText = project.title;
        projectTitle.classList.add('projectTitle');
        projectContainer.append(projectTitle);

        // Button groups
        const projectBtns = document.createElement('div');
        projectBtns.classList.add('projectBtns');
        

        // Button groups -- EDIT
        const editBtn = document.createElement('button');
        const editBtnIcon = document.createElement('span');
        editBtnIcon.classList.add("material-icons-outlined");
        editBtnIcon.textContent = 'edit';
        editBtn.appendChild(editBtnIcon);
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // We need to stop propagation here!
            modalProject.setAttribute('modalType', 'edit');
            modalProject.setAttribute('uuid', project.uuid); // Mark the modal with the uuid of the project
            // Set heading accordingly and pre-load fields with our projects content
            document.querySelector('#modalProject #heading').textContent = 'Edit project';
            document.querySelector('#modalProject #modalTitle').value = project.title;
            modalProject.showModal();
        });
        projectBtns.appendChild(editBtn); // Done with editBtn, now append it

        // Button groups -- DELETE
        const deleteBtn = document.createElement('button');
        const deleteBtnIcon = document.createElement('span');
        deleteBtnIcon.classList.add("material-icons-outlined");
        deleteBtnIcon.textContent = 'delete';
        deleteBtn.appendChild(deleteBtnIcon);
        

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // We need to stop propagation here!
            // If we are the workingProject and we are deleting ourselves, set it to the inbox
            if (project == workingProject) workingProject = projects[0];

            removeProject(project);

            resetSelection();
            allTasksBtn.classList.add('selected');
            
            DOM_ListProjects();
            DOM_Update();
        });
        projectBtns.appendChild(deleteBtn); // Done with deleteBtn, now append it

        // Done building buttons panel
        projectContainer.appendChild(projectBtns);

        // DONE building elements in the project container, now append it
        DOM_ProjectList.appendChild(projectContainer);
    });
}

// Resets all fields in the modal
function resetModal(){
    document.querySelector('#modal #modalTitle').value = '';
    document.querySelector('#modal #modalDate').value = '';
    document.querySelector('#modal #modalDesc').value = '';
    document.querySelector('#modal #modalPriority').checked = false;
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

    // Clear custom projects
    document.querySelectorAll('div').forEach((item) => {
        item.classList.remove('selected');
    });
}
