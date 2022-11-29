export { DOM_Update, DOM_ListProjects }
import { createTask, editTask, removeTask, toggleCompleteTask } from "./task";
import { createProject, editProject, removeProject, projects } from "./project";
import { format } from 'date-fns';

let workingProject = projects[0]; 

// -----------------------------   MODAL BUTTONS   -----------------------------
const modalConfirmBtn = document.querySelector('#modal #Confirm');
const modalProjectConfirmBtn = document.querySelector('#modalProject #Confirm');

modalConfirmBtn.addEventListener('click', () => {
    (modal.getAttribute('modalType') == 'create') ? createTask(workingProject) : editTask();
    DOM_Update();
    resetModal();
});

modalProjectConfirmBtn.addEventListener('click', () => {
    (modalProject.getAttribute('modalType') == 'create') ? createProject() : editProject();
    workingProject = projects[projects.length - 1];
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
    // Go through all projects and only keep those who are not marked complete
    for (let i=0; i<projects.length; i++){
        // Go through each task in the project
        for (let j=0; j<projects[i].getTasks().length; j++){
            if (projects[i].getTasks()[j].isComplete()){
                projects[i].removeTask(projects[i].getTasks()[j].uuid);
                DOM_Update();
            }
        }
    }
    
});

resetStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
// -----------------------------------------------------------------------------

// Updates DOM display, calls DOM_ListTasks 
function DOM_Update(){
    // Clearing can only happen here! If we clear in the DOM_ListTasks method, we lose ability to append
    document.querySelector('#taskList').innerHTML = '';
    //console.log("cleared the DOM");

    if (document.querySelector('#allTasks').classList.contains('selected')){
        // We must print ALL tasks from ALL projects
        for (let i=0; i<projects.length; i++){
            DOM_ListTasks(projects[i].getTasks(),-1);
        }
        
    } else if (document.querySelector('#today').classList.contains('selected')) {
        // We must print ALL tasks from ALL projects that fit the criteria
        for (let i=0; i<projects.length; i++){
            DOM_ListTasks(projects[i].getTasks(),1);
        }
        
    } else if (document.querySelector('#thisWeek').classList.contains('selected')) {
        // We must print ALL tasks from ALL projects that fit the criteria
        for (let i=0; i<projects.length; i++){
            DOM_ListTasks(projects[i].getTasks(),7);
        }
    } else { //DOM updated for a project
        DOM_ListTasks(workingProject.getTasks(),-1);
    }
    
}

// Given an array of tasks, lists the valid tasks
// range:-1 -> list all tasks
// range: 1 -> list all tasks due today
// range: n -> list all tasks occuring over the next n days 
function DOM_ListTasks(tasks, range){
    const taskList = document.querySelector('#taskList');
    

    // Loop thru array and list each valid task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        
        // Convert due date into a date object so we can work with it
        var parts = tasks[i].getDate().split('-');
        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); 

        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)
        if (range == 1 && (dueDate.getDate() != new Date().getDate())) continue;


        const time_diff = dueDate.getTime()-new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);
        
        

        // Criteria to display the task
        if (range == -1 || (days_diff <= range && days_diff>0)){
            const task = document.createElement('div');
            task.setAttribute('uuid', tasks[i].uuid);
            task.classList.add('task');
            task.textContent = tasks[i].getName();

            console.log("Checking if task is complete: "+tasks[i].isComplete());
            console.log("task uuid: "+ tasks[i].uuid);
            console.log("task name: "+ tasks[i].getName());
            
            // Add or remove the isComplete CSS tag
            if (tasks[i].isComplete()){
                task.classList.add('taskComplete');
            }else{
                task.classList.remove('taskComplete');
            }
    
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
                modal.setAttribute('uuid', tasks[i].uuid);
    
                // Set heading accordingly and pre-load fields with our tasks content
                document.querySelector('#modal #heading').textContent = 'Edit task';
                document.querySelector('#modal #modalTitle').value = tasks[i].getName();
                document.querySelector('#modal #modalDate').value = tasks[i].getDate();
    
    
                modal.showModal();
            });  
            
            
            //DELETE
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            task.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', () => {
                removeTask(tasks[i].uuid);
                DOM_Update();
            });
            

            //COMPLETE
            const toggleCompleteBtn = document.createElement('button');
            toggleCompleteBtn.textContent = 'Completed';
            task.appendChild(toggleCompleteBtn);
            toggleCompleteBtn.addEventListener('click', () => {
                toggleCompleteTask(tasks[i]);
                DOM_Update();
            });



            // DONE building elements in the task container, now append it
            taskList.appendChild(task);
        }
    }
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

        // CSS Styling
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
            DOM_Update();
        });
        

        //EDIT
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        project.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            modalProject.setAttribute('modalType', 'edit');
            
            // STORE html data attribute with unique ID
            modalProject.setAttribute('uuid', projects[i].uuid);

            // Set heading accordingly and pre-load fields with our projects content
            document.querySelector('#modalProject #heading').textContent = 'Edit project';
            document.querySelector('#modalProject #modalTitle').value = projects[i].getName();


            modalProject.showModal();
        });

        //DELETE
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete';
        project.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // We need to stop propagation here!

            removeProject(projects[i].uuid);

            resetSelection();
            allTasksBtn.classList.add('selected');
            workingProject = projects[0];
            
            DOM_ListProjects();
            DOM_Update();
        });

        // DONE building elements in the project container, now append it
        DOM_ProjectList.appendChild(project);
    }
}

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

    // Clear custom projects
    document.querySelectorAll('li').forEach((item) => {
        item.classList.remove('selected');
    });
}
