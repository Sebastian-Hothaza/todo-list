/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n\n\n\nconst createTaskBtn = document.querySelector('#createTask');\nconst createProjectBtn = document.querySelector('#createProject');\nconst modal = document.querySelector('#modal');\nconst modalProject = document.querySelector('#modalProject');\n\n// Check local storage\nif (localStorage.length){ \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.LS_load)();\n    (0,_page__WEBPACK_IMPORTED_MODULE_0__.DOM_ListProjects)();\n    (0,_page__WEBPACK_IMPORTED_MODULE_0__.DOM_Update)();\n}\n\n// Create task\ncreateTaskBtn.addEventListener('click', () => {\n    modal.setAttribute('modalType', 'create');\n    document.querySelector('#modal #heading').textContent = 'Create new task';\n    modal.showModal();\n});\n\n// Create project\ncreateProjectBtn.addEventListener('click', () => {\n    modalProject.setAttribute('modalType', 'create');\n    document.querySelector('#modalProject #heading').textContent = 'Create new Project';\n    modalProject.showModal();    \n});\n\n// TODO: FIX BUG WHERE Clear completed task not working correctly on multiple items!\n\n// TODO: Bug fix where editing a project name will then set the active project to the last project in the list (?)\n\n// TODO: Feature idea: when killing some project, lets not go back to working project = the inbox\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LS_addProject\": () => (/* binding */ LS_addProject),\n/* harmony export */   \"LS_addTask\": () => (/* binding */ LS_addTask),\n/* harmony export */   \"LS_editProject\": () => (/* binding */ LS_editProject),\n/* harmony export */   \"LS_editTask\": () => (/* binding */ LS_editTask),\n/* harmony export */   \"LS_load\": () => (/* binding */ LS_load),\n/* harmony export */   \"LS_removeProject\": () => (/* binding */ LS_removeProject),\n/* harmony export */   \"LS_removeTask\": () => (/* binding */ LS_removeTask)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n;\n\n\n\n// Adds task object to existing project \nfunction LS_addTask(project, task){\n    // We differentiate between inbox and custom project tasks\n    if (project == _project__WEBPACK_IMPORTED_MODULE_0__.inbox){\n        let fetchedArray = JSON.parse(localStorage.getItem(project.getName()) || \"[]\");\n        fetchedArray.push(task);\n        localStorage.setItem(project.getName(), JSON.stringify(fetchedArray));\n    }else{\n        // TODO: This should be able to be simplified\n        let fetchedArray = JSON.parse(localStorage.getItem(project.uuid) || \"[]\");\n        fetchedArray.push(task);\n        localStorage.setItem(project.uuid, JSON.stringify(fetchedArray));\n    }\n}\n\n// Updates the LS in a project with given task containing updated info\nfunction LS_editTask(project, task){\n  \n    let startingIdx;\n    let projectKey;\n    \n    if (project == _project__WEBPACK_IMPORTED_MODULE_0__.inbox){\n        startingIdx = 0;\n        projectKey = \"inbox\";\n    }else{\n        startingIdx = 1;\n        projectKey = project.uuid;\n    }\n    \n    let fetchedArray = JSON.parse(localStorage.getItem(projectKey));\n    \n    // go through array of tasks in the project until find matching ID, then update that task\n    for ( ; startingIdx<fetchedArray.length; startingIdx++){\n        if (fetchedArray[startingIdx].uuid == task.uuid){\n\n            // Update the task here!\n            fetchedArray[startingIdx].title = task.getName();\n            fetchedArray[startingIdx].desc = task.getDesc();\n            fetchedArray[startingIdx].date = task.getDate();\n            fetchedArray[startingIdx].priority = task.isPriority();\n            fetchedArray[startingIdx].complete = task.isComplete();\n            \n            \n            // Finally, set the item in LS\n            localStorage.setItem(projectKey, JSON.stringify(fetchedArray));\n        }\n    }\n}\n\n// Updates the LS by removing the task\nfunction LS_removeTask(project, task){\n    let projectKey;\n    (project == _project__WEBPACK_IMPORTED_MODULE_0__.inbox)? projectKey=\"inbox\" : projectKey=project.uuid\n    \n    let fetchedArray = JSON.parse(localStorage.getItem(projectKey));\n    localStorage.setItem(projectKey, JSON.stringify(fetchedArray.filter(item => item.uuid != task.uuid)));\n}\n\n// Adds new project to LS\nfunction LS_addProject(project){\n    let arr = [project];\n    localStorage.setItem(project.uuid, JSON.stringify(arr));\n    // Append the newly created project UUID to tracker to preserve order when restore from LS\n    LS_addProjectUUID(project.uuid);\n}\n\n// Updates the LS for a project with updated info\nfunction LS_editProject(project){\n    let fetchedArray = JSON.parse(localStorage.getItem(project.uuid));\n    fetchedArray[0].title = project.getName();\n    localStorage.setItem(project.uuid, JSON.stringify(fetchedArray));\n}\n\nfunction LS_removeProject(project){\n    localStorage.removeItem(project.uuid);\n    // We also need to update projectsOrder!\n    let fetchedOrderArray = JSON.parse(localStorage.getItem(\"projectsOrder\")); //This is an array of UUID's\n    localStorage.setItem(\"projectsOrder\", JSON.stringify(fetchedOrderArray.filter(item => item != project.uuid)));\n}\n\n// Used to track order of projects by UUID so we can restore them in order\nfunction LS_addProjectUUID(uuid){\n    let fetchedArray = JSON.parse(localStorage.getItem(\"projectsOrder\") || \"[]\");\n    fetchedArray.push(uuid);\n    localStorage.setItem(\"projectsOrder\", JSON.stringify(fetchedArray));\n}\n\n// Load from LS\nfunction LS_load(){\n    // Load inbox if it exists. The inbox MUST be the first item loaded? Maybe not...just that the inbox tasks must be appened to inbox. check later\n    if (localStorage.getItem(\"inbox\")){\n        // console.log(\"Inbox exists. Loading it now\");\n        let tasks = JSON.parse(localStorage.getItem(\"inbox\"));\n        for (let i=0; i<tasks.length; i++){\n            let loadedTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.taskItemFactory)(tasks[i].title, tasks[i].desc, tasks[i].date, tasks[i].priority, tasks[i].complete);\n            loadedTask.uuid = tasks[i].uuid; \n            _project__WEBPACK_IMPORTED_MODULE_0__.inbox.appendTask(loadedTask);\n        }\n    }\n    \n\n    // Check if user projects exist\n    if (JSON.parse(localStorage.getItem(\"projectsOrder\"))){\n        // Load UUID array and iterate thought it\n        const objectsOrder = JSON.parse(localStorage.getItem(\"projectsOrder\"));\n        for (let i=0; i<objectsOrder.length; i++){\n            // console.log(\"Building object with UUID \"+objectsOrder[i]);\n\n            // for each UUID, load in the project\n            let loadedProject = (0,_project__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(JSON.parse(localStorage.getItem(objectsOrder[i]))[0].title);\n            loadedProject.uuid = objectsOrder[i]; //TODO: THIS IS BROKEN AND DOES NOTHING ?\n            loadedProject.addSelf();\n\n            // Task loading\n            let tasks = JSON.parse(localStorage.getItem(objectsOrder[i]));\n            // console.log(\"start loading tasks for project \"+loadedProject.getName());\n            for (let j=1; j<tasks.length; j++){\n                // console.log(\"--building new task: \"+tasks[j].title);\n                let loadedTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.taskItemFactory)(tasks[j].title, tasks[j].desc, tasks[j].date, tasks[j].priority, tasks[j].complete);\n                loadedTask.uuid = tasks[j].uuid;\n                \n                // Append the newly loaded object to the project\n                loadedProject.appendTask(loadedTask);\n            }\n            \n        }\n    }\n    \n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/localStorage.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOM_ListProjects\": () => (/* binding */ DOM_ListProjects),\n/* harmony export */   \"DOM_Update\": () => (/* binding */ DOM_Update)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n;\n\n\n\nlet workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0]; \n\n// -----------------------------   MODAL BUTTONS   -----------------------------\nconst modalConfirmBtn = document.querySelector('#modal #Confirm');\nconst modalProjectConfirmBtn = document.querySelector('#modalProject #Confirm');\n\nmodalConfirmBtn.addEventListener('click', () => {\n    (modal.getAttribute('modalType') == 'create') ? (0,_task__WEBPACK_IMPORTED_MODULE_0__.createTask)(workingProject) : (0,_task__WEBPACK_IMPORTED_MODULE_0__.editTask)();\n    DOM_Update();\n    resetModal();\n});\n\nmodalProjectConfirmBtn.addEventListener('click', () => {\n    (modalProject.getAttribute('modalType') == 'create') ? (0,_project__WEBPACK_IMPORTED_MODULE_1__.createProject)() : (0,_project__WEBPACK_IMPORTED_MODULE_1__.editProject)();\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[_project__WEBPACK_IMPORTED_MODULE_1__.projects.length - 1];\n    DOM_ListProjects();\n    DOM_Update();\n    resetModalProject();\n});\n// -----------------------------------------------------------------------------\n\n\n// -----------------------------   MENU BUTTONS   -----------------------------\nconst allTasksBtn = document.querySelector('#allTasks');\nconst todayBtn = document.querySelector('#today');\nconst thisWeekBtn = document.querySelector('#thisWeek');\nconst clearCompleteBtn = document.querySelector('#clearComplete');\nconst resetStorageBtn = document.querySelector('#resetStorage');\n\nallTasksBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    allTasksBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\ntodayBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    todayBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\nthisWeekBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    thisWeekBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\nclearCompleteBtn.addEventListener('click', () => {\n    // Go through all projects and only keep tasks who are not marked complete\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        // Go through each task in the project\n        for (let j=0; j<_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks().length; j++){\n            if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks()[j].isComplete()){\n                (0,_task__WEBPACK_IMPORTED_MODULE_0__.removeTask)(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks()[j]);\n                DOM_Update();\n            }\n        }\n    }\n    \n});\n\nresetStorageBtn.addEventListener('click', () => {\n    localStorage.clear();\n    location.reload();\n});\n// -----------------------------------------------------------------------------\n\n// Indirectly updates DOM by calling DOM_ListTasks dependent on currently selected sidebar heading\nfunction DOM_Update(){\n    document.querySelector('#taskList').innerHTML = ''; // Clearing can only happen here! If we clear in the DOM_ListTasks method, we lose ability to append\n\n    if (document.querySelector('#allTasks').classList.contains('selected')){\n        _project__WEBPACK_IMPORTED_MODULE_1__.projects.forEach(proj => DOM_ListTasks(proj.getTasks(),-1)); // Print ALL tasks from ALL projects\n    } else if (document.querySelector('#today').classList.contains('selected')) {\n        _project__WEBPACK_IMPORTED_MODULE_1__.projects.forEach(proj => DOM_ListTasks(proj.getTasks(),1)); // Print ALL tasks from ALL projects due today\n    } else if (document.querySelector('#thisWeek').classList.contains('selected')) {\n        _project__WEBPACK_IMPORTED_MODULE_1__.projects.forEach(proj => DOM_ListTasks(proj.getTasks(),7)); // Print ALL tasks from ALL projects due over next 7 days\n    } else { \n        DOM_ListTasks(workingProject.getTasks(),-1); //Print ALL tasks from currently selected project\n    }\n}\n\n// Given an array of tasks, updates DOM with the valid tasks\n// range:-1 -> list all tasks\n// range: 1 -> list all tasks due today\n// range: n -> list all tasks occuring over the next n days \nfunction DOM_ListTasks(tasks, range){\n    const taskList = document.querySelector('#taskList');\n    \n    // Loop thru task array and list each valid task\n    for (let i=0; i<tasks.length; i++){\n        \n        // Convert due date into a date object so we can work with it\n        var parts = tasks[i].getDate().split('-');\n        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); \n        const time_diff = dueDate.getTime()-new Date().getTime();\n        const days_diff = time_diff / (1000 * 3600 * 24);\n\n        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)\n        if (range == 1 && (dueDate.getDate() != new Date().getDate())) continue;\n        \n        // Exclude tasks which fail criteria\n        if (!(range == -1 || (days_diff <= range && days_diff>-1))) continue; \n\n       \n        // Create the task container\n        const taskContainer = document.createElement('div');\n        taskContainer.classList.add('taskContainer');\n       \n        taskContainer.setAttribute('uuid', tasks[i].uuid); //We can likely remove this\n        tasks[i].isComplete()? taskContainer.classList.add('taskComplete') : taskContainer.classList.remove('taskComplete')\n        tasks[i].isPriority()? taskContainer.classList.add('taskPriority') : taskContainer.classList.remove('taskPriority')\n\n        // COMPLETE\n        const toggleCompleteBtn = document.createElement('button');\n        toggleCompleteBtn.classList.add('taskCompleteBtn');\n        \n        const completeIcon = document.createElement('span');\n        completeIcon.classList.add(\"material-icons-outlined\");\n        tasks[i].isComplete()? completeIcon.textContent = 'check_circle' : completeIcon.textContent = 'circle'\n        toggleCompleteBtn.appendChild(completeIcon);\n\n        taskContainer.appendChild(toggleCompleteBtn);\n        toggleCompleteBtn.addEventListener('click', () => {\n            (0,_task__WEBPACK_IMPORTED_MODULE_0__.toggleCompleteTask)(tasks[i]);\n            DOM_Update();\n        });\n        \n        // CARD\n        const taskCard = document.createElement('div');\n        taskCard.classList.add('taskCard');\n\n        // LEFT: title and description\n        const cardLeft = document.createElement('div');\n        cardLeft.classList.add('cardLeft');\n\n        const taskTitle = document.createElement('div');\n        taskTitle.classList.add('taskTitle');\n        taskTitle.textContent = tasks[i].getName();\n        cardLeft.appendChild(taskTitle);\n\n        // Only add Desc to DOM if it exists\n        if (tasks[i].getDesc()){\n            const taskDesc = document.createElement('div');\n            taskDesc.classList.add('taskDesc');\n            taskDesc.textContent = tasks[i].getDesc();\n            cardLeft.appendChild(taskDesc);\n        }\n\n        taskCard.appendChild(cardLeft);\n\n\n        // RIGHT: date, edit and delete buttons\n        const cardRight = document.createElement('div');\n        cardRight.classList.add('cardRight');\n    \n        const taskDate = document.createElement('div');\n        taskDate.classList.add('taskDate');\n        taskDate.textContent = tasks[i].getDate();\n        cardRight.appendChild(taskDate);\n\n        //EDIT\n        const editBtn = document.createElement('button');\n        const editBtnIcon = document.createElement('span');\n        editBtnIcon.classList.add(\"material-icons-outlined\");\n        editBtnIcon.textContent = 'edit';\n        editBtn.appendChild(editBtnIcon);\n        cardRight.appendChild(editBtn);\n        editBtn.addEventListener('click', () => {\n            modal.setAttribute('modalType', 'edit');\n            \n            // STORE html data attribute with unique ID\n            modal.setAttribute('uuid', tasks[i].uuid);\n\n            // Set heading accordingly and pre-load fields with our tasks content\n            document.querySelector('#modal #heading').textContent = 'Edit task';\n            document.querySelector('#modal #modalTitle').value = tasks[i].getName();\n            document.querySelector('#modal #modalDate').value = tasks[i].getDate();\n            document.querySelector('#modal #modalDesc').value = tasks[i].getDesc();\n            document.querySelector('#modal #modalPriority').checked = tasks[i].isPriority();\n\n\n            modal.showModal();\n        });  \n\n\n        //DELETE\n        const deleteBtn = document.createElement('button');\n        const deleteBtnIcon = document.createElement('span');\n        deleteBtnIcon.classList.add(\"material-icons-outlined\");\n        deleteBtnIcon.textContent = 'delete';\n        deleteBtn.appendChild(deleteBtnIcon);\n        cardRight.appendChild(deleteBtn);\n        deleteBtn.addEventListener('click', () => {\n            (0,_task__WEBPACK_IMPORTED_MODULE_0__.removeTask)(tasks[i]);\n            DOM_Update();\n        });\n        taskCard.appendChild(cardRight);\n\n        \n        \n        \n        // Done building taskCard, append it to the taskContainer\n        taskContainer.appendChild(taskCard);\n\n\n        // DONE building task container, now append it\n        taskList.appendChild(taskContainer);\n\n    }\n}\n\n// Update sidebar DOM based on projects[]\nfunction DOM_ListProjects(){\n    const DOM_ProjectList = document.querySelector('#projectList');\n    DOM_ProjectList.innerHTML = '';\n\n    // Go through projects array and list each project. Skip 0 as it is inbox\n    for (let i=1; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n\n        const projectContainer = document.createElement('div');\n        //projectContainer.setAttribute('uuid', projects[i].uuid); ADD THIS BACK IN!     <---------\n        projectContainer.classList.add('projectContainer');\n        \n\n        // CSS Styling\n        if (workingProject == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i]) {\n            resetSelection();\n            projectContainer.classList.add('selected');\n        }\n        \n        // Create listener for project. This may be an issue due to event bubbling\n        projectContainer.addEventListener('click', () => {\n            // CSS Styling\n            resetSelection();\n            projectContainer.classList.add('selected');\n            workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n            DOM_Update();\n        });\n\n        // Title\n        const projectTitle = document.createElement('div');\n        projectTitle.innerText=_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getName();\n        projectTitle.classList.add('projectTitle');\n        projectContainer.append(projectTitle);\n\n        // Button groups\n        const projectBtns = document.createElement('div');\n        projectBtns.classList.add('projectBtns');\n        \n\n        //EDIT\n        const editBtn = document.createElement('button');\n\n        const editBtnIcon = document.createElement('span');\n        editBtnIcon.classList.add(\"material-icons-outlined\");\n        editBtnIcon.textContent = 'edit';\n        editBtn.appendChild(editBtnIcon);\n\n        projectBtns.appendChild(editBtn);\n\n        editBtn.addEventListener('click', () => {\n            modalProject.setAttribute('modalType', 'edit');\n            \n            // STORE html data attribute with unique ID\n            modalProject.setAttribute('uuid', _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].uuid);\n\n            // Set heading accordingly and pre-load fields with our projects content\n            document.querySelector('#modalProject #heading').textContent = 'Edit project';\n            document.querySelector('#modalProject #modalTitle').value = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getName();\n\n\n            modalProject.showModal();\n        });\n\n        //DELETE\n        const deleteBtn = document.createElement('button');\n        const deleteBtnIcon = document.createElement('span');\n        deleteBtnIcon.classList.add(\"material-icons-outlined\");\n        deleteBtnIcon.textContent = 'delete';\n        deleteBtn.appendChild(deleteBtnIcon);\n        projectBtns.appendChild(deleteBtn);\n\n        deleteBtn.addEventListener('click', (e) => {\n            e.stopPropagation(); // We need to stop propagation here!\n\n            (0,_project__WEBPACK_IMPORTED_MODULE_1__.removeProject)(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i]);\n\n            resetSelection();\n            allTasksBtn.classList.add('selected');\n            workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n            \n            DOM_ListProjects();\n            DOM_Update();\n        });\n\n        // Done building buttons panel\n        projectContainer.appendChild(projectBtns);\n\n        // DONE building elements in the project container, now append it\n        DOM_ProjectList.appendChild(projectContainer);\n    }\n}\n\n// Resets all fields in the modal\nfunction resetModal(){\n    document.querySelector('#modal #modalTitle').value = '';\n    document.querySelector('#modal #modalDate').value = '';\n    document.querySelector('#modal #modalDesc').value = '';\n    document.querySelector('#modal #modalPriority').checked = false;\n}\n\n// Resets all fields in the modal\nfunction resetModalProject(){\n    document.querySelector('#modalProject #modalTitle').value = '';\n}\n\n// Clears \"selected\" tag on all elements\nfunction resetSelection(){\n    // Clear top 3\n    document.querySelector('#allTasks').classList.remove('selected');\n    document.querySelector('#today').classList.remove('selected');\n    document.querySelector('#thisWeek').classList.remove('selected');\n\n    // Clear custom projects\n    document.querySelectorAll('div').forEach((item) => {\n        item.classList.remove('selected');\n    });\n}\n\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createProject\": () => (/* binding */ createProject),\n/* harmony export */   \"editProject\": () => (/* binding */ editProject),\n/* harmony export */   \"inbox\": () => (/* binding */ inbox),\n/* harmony export */   \"projectFactory\": () => (/* binding */ projectFactory),\n/* harmony export */   \"projects\": () => (/* binding */ projects),\n/* harmony export */   \"removeProject\": () => (/* binding */ removeProject)\n/* harmony export */ });\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n\n\n\nlet projects = [];\n\n// Todo: Why arent we exporting delete Project?\n\nconst projectFactory = (title) => {\n    let uuid = self.crypto.randomUUID();\n    let tasks = [];\n\n    \n\n    function appendTask(task){\n        tasks.push(task);\n    }\n\n\n    // Returns all tasks associated with that project\n    function getTasks(){ return tasks; }\n\n    // Returns single task object matching id \n    function getTask(id){\n        return tasks.find(item => item.uuid == id);\n    }\n\n    function removeTask(id){\n        tasks = tasks.filter(task => task.uuid != id); \n    }\n\n    function getName(){\n        return title;\n    }\n\n    function setName(newTitle){\n        title = newTitle;\n    }\n\n    function addSelf(){\n        projects.push(this);\n    }\n\n    \n    return { uuid, title, appendTask, getTasks, getTask, getName, setName, addSelf, removeTask};\n};\n\nconst inbox = projectFactory('inbox');\ninbox.addSelf();\n\n// Creates a project using info from modal\nfunction createProject(){\n    // Fetch data from modal\n    const title = document.querySelector('#modalProject #modalTitle').value;\n\n    // Create new project object and add it to the projects array\n    const newProject = projectFactory(title);\n    newProject.addSelf();\n\n    // Append the newly created project to localStorage. \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_addProject)(newProject);\n\n    \n\n    // Make the freshly created project the center of attention!\n    // workingProject = newProject; TODO; move out to page?\n\n    \n}\n\n// Updates a project using info from modal\nfunction editProject(){\n    // Get the project we want to edit\n    const project = projects.find(item => item.uuid == modalProject.getAttribute('uuid'));;\n\n    // Update the project with the new params\n    project.setName(document.querySelector('#modalProject #modalTitle').value);\n\n    // Update edited project to localStorage. \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_editProject)(project);\n}\n\nfunction removeProject(project){\n    projects = projects.filter(proj => proj.uuid != project.uuid);\n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_removeProject)(project);\n}\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTask\": () => (/* binding */ createTask),\n/* harmony export */   \"editTask\": () => (/* binding */ editTask),\n/* harmony export */   \"removeTask\": () => (/* binding */ removeTask),\n/* harmony export */   \"taskItemFactory\": () => (/* binding */ taskItemFactory),\n/* harmony export */   \"toggleCompleteTask\": () => (/* binding */ toggleCompleteTask),\n/* harmony export */   \"togglePriorityTask\": () => (/* binding */ togglePriorityTask)\n/* harmony export */ });\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n;\n\n\n\nconst taskItemFactory = (title, desc, date, priority, complete) => {\n    let uuid = self.crypto.randomUUID();\n    \n    function getName(){\n        return title;\n    }\n    function setName(newName){\n        title = newName;\n    }\n    function getDate(){\n        return date;\n    }\n    function setDate(newDate){\n        date = newDate;\n    }\n\n    function getDesc(){\n        return desc;\n    }\n    function setDesc(newDesc){\n        desc = newDesc;\n    }\n\n    function isPriority(){\n        return priority;\n    }\n    function setPriority(newPriority){\n        priority = newPriority;\n    }\n\n    function isComplete(){\n        return complete;\n    }\n\n    function toggleComplete(){\n        if (complete){\n            complete = false;\n        }else{\n            complete = true;\n        }\n    }\n    function togglePriority(){\n        if (priority){\n            priority = false;\n        }else{\n            priority = true;\n        }\n    }\n\n    function markComplete(){\n        complete = true;\n    }\n\n    function markIncomplete(){\n        complete = false;\n    }\n\n    return { uuid, title, desc, date, priority, complete, getName, setName, getDate, setDate, getDesc, setDesc,isPriority, setPriority, togglePriority, isComplete, toggleComplete, markComplete, markIncomplete };\n};\n\n// Creates a task using info from modal for a project\nfunction createTask(project){\n    // Fetch data from modal\n    const title = document.querySelector('#modal #modalTitle').value;\n    const desc = document.querySelector('#modal #modalDesc').value;\n    const date = document.querySelector('#modal #modalDate').value;\n    const priority = document.querySelector('#modal #modalPriority').checked;\n    \n    // Create task object\n    const newTask = taskItemFactory(title, desc, date, priority, false);\n\n    // Append the newly created task to localStorage. \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_addTask)(project, newTask);\n\n    // Append the newly created object to the project\n    project.appendTask(newTask);    \n}\n\n// Updates a task using info from modal for a project\nfunction editTask(){\n    let task;\n    let project;\n     // Check each project to search for the task we want to edit\n     // The edit modal is marked with the uuid of the task we want to edit\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(modal.getAttribute('uuid'))){ // Returns a task object, else undefined\n            task = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(modal.getAttribute('uuid'));\n            project = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n            break;\n        }\n    }\n\n    // Update the task with the new params\n    task.setName(document.querySelector('#modal #modalTitle').value);\n    task.setDate(document.querySelector('#modal #modalDate').value);\n    task.setDesc(document.querySelector('#modal #modalDesc').value);\n    task.setPriority(document.querySelector('#modal #modalPriority').checked);\n\n\n    // Update edited task to localStorage. \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_editTask)(project, task);\n \n}\n\n// Removes a task by uuid from project\nfunction removeTask(task){\n    let project;\n    // Check each project to see where the task is located\n   for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n       if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid) && task.uuid == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match\n           // Remove the task in the corresponding project\n           _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].removeTask(task.uuid);\n           project = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n           break;\n       }\n   }\n    // Remove task from localStorage. \n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_removeTask)(project, task);\n}\n\n// Toggles a task as complete\nfunction toggleCompleteTask(task){\n    task.toggleComplete();\n    let project;\n    // We've updated the task object, now we need to update the LS\n\n     // Check each project to see where the task is located\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid) && task.uuid == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match\n            project = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n            break;\n        }\n    }\n    // Update the LS\n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_editTask)(project,task);\n}\n\n// Toggles a task as priority\nfunction togglePriorityTask(task){\n    task.togglePriority();\n    let project;\n    // We've updated the task object, now we need to update the LS\n\n     // Check each project to see where the task is located\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid) && task.uuid == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(task.uuid).uuid){ // We check that the task exists AND then if the uuid match\n            project = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n            break;\n        }\n    }\n    // Update the LS\n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.LS_editTask)(project,task);\n}\n\n\n// TODO: Privatize elements as follows:\n\n/*\n\ncheck: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get\n\nconst objectFactory = (value) =>{\n    function getValue(){ return value; }\n    function setValue(newValue){ value=newValue; }\n    const toJSON = () => {\n        return JSON.stringify({value})\n    }\n    return { getValue, setValue, toJSON }\n};\n\nconst myObject = objectFactory(\"John\");\n\n*/\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;