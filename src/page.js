export { DOM_Update, DOM_ListProjects }
import { createTask, editTask, removeTask, toggleCompleteTask } from "./task";
import { createProject, editProject, removeProject, projects } from "./project";
import { format } from 'date-fns';

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

clearCompleteBtn.addEventListener('click', () => {
    projects.forEach((project) => {
        // Go through each task in the project
        for (let i=0; i<project.tasks.length; ){
            if (project.tasks[i].priority){
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

// Given an array of tasks, updates DOM with the valid tasks
// range:-1 -> list all tasks
// range: 1 -> list all tasks due today
// range: n -> list all tasks occuring over the next n days 
function DOM_ListTasks(project, range){
    const taskList = document.querySelector('#taskList');
    let headerPrinted = false;
    let tasks = project.tasks; //TODO: Simplify in here, maybe use forEach

    let isUserProject = !(document.querySelector('#allTasks').classList.contains('selected') || 
                        document.querySelector('#today').classList.contains('selected') || 
                        document.querySelector('#thisWeek').classList.contains('selected'));
    
    // Loop thru task array and list each valid task
    for (let i=0; i<tasks.length; i++){
        
        // Convert due date into a date object so we can work with it
        var parts = tasks[i].date.split('-');
        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); 
        const time_diff = dueDate.getTime()-new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);

        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)
        if (range == 1 && (dueDate.getDate() != new Date().getDate())) continue;
        
        // Exclude tasks which fail criteria
        if (!(range == -1 || (days_diff <= range && days_diff>-1))) continue; 

        // Print project header
        if (!headerPrinted && project != projects[0] && !isUserProject) {
            DOM_printProjectHeader(project);
            headerPrinted = true;
        }

       
        // Create the task container
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
       
        taskContainer.setAttribute('uuid', tasks[i].uuid); //We can likely remove this
        tasks[i].complete? taskContainer.classList.add('taskComplete') : taskContainer.classList.remove('taskComplete')
        tasks[i].priority? taskContainer.classList.add('taskPriority') : taskContainer.classList.remove('taskPriority')

        // COMPLETE
        const toggleCompleteBtn = document.createElement('button');
        toggleCompleteBtn.classList.add('taskCompleteBtn');
        
        const completeIcon = document.createElement('span');
        completeIcon.classList.add("material-icons-outlined");
        tasks[i].complete? completeIcon.textContent = 'check_circle' : completeIcon.textContent = 'circle'
        toggleCompleteBtn.appendChild(completeIcon);

        taskContainer.appendChild(toggleCompleteBtn);
        toggleCompleteBtn.addEventListener('click', () => {
            toggleCompleteTask(tasks[i]);
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
        taskTitle.textContent = tasks[i].title;
        cardLeft.appendChild(taskTitle);

        // Only add Desc to DOM if it exists
        if (tasks[i].desc){
            const taskDesc = document.createElement('div');
            taskDesc.classList.add('taskDesc');
            taskDesc.textContent = tasks[i].desc;
            cardLeft.appendChild(taskDesc);
        }

        taskCard.appendChild(cardLeft);


        // RIGHT: date, edit and delete buttons
        const cardRight = document.createElement('div');
        cardRight.classList.add('cardRight');
    
        const taskDate = document.createElement('div');
        taskDate.classList.add('taskDate');
        taskDate.textContent = tasks[i].date;
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
            modal.setAttribute('uuid', tasks[i].uuid);

            // Set heading accordingly and pre-load fields with our tasks content
            document.querySelector('#modal #heading').textContent = 'Edit task';
            document.querySelector('#modal #modalTitle').value = tasks[i].title;
            document.querySelector('#modal #modalDate').value = tasks[i].date;
            document.querySelector('#modal #modalDesc').value = tasks[i].desc;
            document.querySelector('#modal #modalPriority').checked = tasks[i].priority;


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
            removeTask(tasks[i]);
            DOM_Update();
        });
        taskCard.appendChild(cardRight);

        
        
        
        // Done building taskCard, append it to the taskContainer
        taskContainer.appendChild(taskCard);


        // DONE building task container, now append it
        taskList.appendChild(taskContainer);

    }
}

// Update sidebar DOM based on projects[]
function DOM_ListProjects(){
    const DOM_ProjectList = document.querySelector('#projectList');
    DOM_ProjectList.innerHTML = '';

    // Go through projects array and list each project. Skip 0 as it is inbox
    for (let i=1; i<projects.length; i++){

        const projectContainer = document.createElement('div');
        //projectContainer.setAttribute('uuid', projects[i].uuid); ADD THIS BACK IN!     <---------
        projectContainer.classList.add('projectContainer');
        

        // CSS Styling
        if (workingProject == projects[i]) {
            resetSelection();
            projectContainer.classList.add('selected');
        }
        
        // Create listener for project. This may be an issue due to event bubbling
        projectContainer.addEventListener('click', () => {
            // CSS Styling
            resetSelection();
            projectContainer.classList.add('selected');
            workingProject = projects[i];
            DOM_Update();
        });

        // Title
        const projectTitle = document.createElement('div');
        projectTitle.innerText=projects[i].title;
        projectTitle.classList.add('projectTitle');
        projectContainer.append(projectTitle);

        // Button groups
        const projectBtns = document.createElement('div');
        projectBtns.classList.add('projectBtns');
        

        //EDIT
        const editBtn = document.createElement('button');

        const editBtnIcon = document.createElement('span');
        editBtnIcon.classList.add("material-icons-outlined");
        editBtnIcon.textContent = 'edit';
        editBtn.appendChild(editBtnIcon);

        projectBtns.appendChild(editBtn);

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // We need to stop propagation here!
            modalProject.setAttribute('modalType', 'edit');
            
            // STORE html data attribute with unique ID
            modalProject.setAttribute('uuid', projects[i].uuid);

            // Set heading accordingly and pre-load fields with our projects content
            document.querySelector('#modalProject #heading').textContent = 'Edit project';
            document.querySelector('#modalProject #modalTitle').value = projects[i].title;


            modalProject.showModal();
        });

        //DELETE
        const deleteBtn = document.createElement('button');
        const deleteBtnIcon = document.createElement('span');
        deleteBtnIcon.classList.add("material-icons-outlined");
        deleteBtnIcon.textContent = 'delete';
        deleteBtn.appendChild(deleteBtnIcon);
        projectBtns.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // We need to stop propagation here!

            // If we are the workingProject, set it to the inbox
            if (workingProject == projects[i]) workingProject = projects[0];

            removeProject(projects[i]);
            resetSelection();
            allTasksBtn.classList.add('selected');
            
            DOM_ListProjects();
            DOM_Update();
        });

        // Done building buttons panel
        projectContainer.appendChild(projectBtns);

        // DONE building elements in the project container, now append it
        DOM_ProjectList.appendChild(projectContainer);
    }
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
