import "./page";
import { DOM_ListTasks, DOM_ListRangeTasks} from "./page"
import { inbox } from "./project";

const createTaskBtn = document.querySelector('#createTask');
const modal = document.querySelector('#modal');

const allTasksBtn = document.querySelector('#allTasks');
const todayBtn = document.querySelector('#today');
const thisWeekBtn = document.querySelector('#thisWeek');

createTaskBtn.addEventListener('click', () => {
    // We need some logic to determine if task is to be added to inbox or some project. TODO Later
    // TEMP: Assume we are adding to inbox
    
    modal.setAttribute('modalType', 'create');

    // Set heading accordingly
    document.querySelector('#modal #heading').textContent = 'Create new task';

    // Pop up modal and get info from user
    modal.showModal();
});


// Note: we leave clearing of the page to the individual display function

allTasksBtn.addEventListener('click', () => {
    // CSS styling
    allTasksBtn.classList.add('selected');
    todayBtn.classList.remove('selected');
    thisWeekBtn.classList.remove('selected');

    DOM_ListTasks(inbox.getTasks());
});

todayBtn.addEventListener('click', () => {
    // CSS styling
    allTasksBtn.classList.remove('selected');
    todayBtn.classList.add('selected');
    thisWeekBtn.classList.remove('selected');

    DOM_ListRangeTasks(inbox.getTasks(),1);
});

thisWeekBtn.addEventListener('click', () => {
    // CSS styling
    allTasksBtn.classList.remove('selected');
    todayBtn.classList.remove('selected');
    thisWeekBtn.classList.add('selected');

    DOM_ListRangeTasks(inbox.getTasks(),7);
});

