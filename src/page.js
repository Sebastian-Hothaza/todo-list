import { taskItemFactory } from "./task";
import { projectFactory, projects, inbox } from "./project";
import { format } from 'date-fns';

export {DOM_ListTasks, DOM_ListRangeTasks}



const modalConfirmBtn = document.querySelector('#modal #Confirm');

modalConfirmBtn.addEventListener('click', () => {
    (modal.getAttribute('modalType') == 'create') ? createTask() : editTask();
});



// Given an array of tasks, lists them all on the page. Listeners added here too!
function DOM_ListTasks(tasks){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    // Loop thru array and list each task adding the edit listener
    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('div');
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


// Given an array of tasks, lists the ones due within the range. 
function DOM_ListRangeTasks(tasks, range){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

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

// Creates a task using info from modal 
function createTask(){
    // Fetch data from modal
    const title = document.querySelector('#modal #modalTitle').value;
    const date = document.querySelector('#modal #modalDate').value;

    // Create task object
    const newTask = taskItemFactory(title, date);

    // Append the newly created object to the inbox
    inbox.appendTask(newTask);

    DOM_Update();
    resetModal();
}

// Updates a task using info from modal
function editTask(){
    // Get the task we want to edit
    const task = inbox.getTask(modal.getAttribute('uniqueID'));

    // Update the task with the new params
    task.setName(document.querySelector('#modal #modalTitle').value);
    task.setDate(document.querySelector('#modal #modalDate').value);

    DOM_Update();
    resetModal();
}

// Resets all fields in the modal
function resetModal(){
    document.querySelector('#modal #modalTitle').value = '';
    document.querySelector('#modal #modalDate').value = '';
}

// Updates DOM display
function DOM_Update(){
    if (document.querySelector('#allTasks').classList.contains('selected')){
        DOM_ListTasks(inbox.getTasks());
    } else if (document.querySelector('#today').classList.contains('selected')) {
        DOM_ListTodayTasks(inbox.getTasks());
    }
}