import "./page";

const createTaskBtn = document.querySelector('#createTask');
const createTaskModal = document.querySelector('#createTaskModal');

createTaskBtn.addEventListener('click', () => {
    // We need some logic to determine if task is to be added to inbox or some project. TODO Later
    // TEMP: Assume we are adding to inbox
    // Pop up modal and get info from user
    createTaskModal.showModal();
});
