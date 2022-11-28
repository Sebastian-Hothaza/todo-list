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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n\n\nconst createTaskBtn = document.querySelector('#createTask');\nconst createProjectBtn = document.querySelector('#createProject');\nconst modal = document.querySelector('#modal');\nconst modalProject = document.querySelector('#modalProject');\n\n\ncreateTaskBtn.addEventListener('click', () => {\n    modal.setAttribute('modalType', 'create');\n    document.querySelector('#modal #heading').textContent = 'Create new task';\n    modal.showModal();\n});\n\ncreateProjectBtn.addEventListener('click', () => {\n    modalProject.setAttribute('modalType', 'create');\n    document.querySelector('#modalProject #heading').textContent = 'Create new Project';\n    modalProject.showModal();    \n});\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n\n\n\n\n\nconst modalConfirmBtn = document.querySelector('#modal #Confirm');\nconst modalProjectConfirmBtn = document.querySelector('#modalProject #Confirm');\n\nconst allTasksBtn = document.querySelector('#allTasks');\nconst todayBtn = document.querySelector('#today');\nconst thisWeekBtn = document.querySelector('#thisWeek');\nconst clearCompleteBtn = document.querySelector('#clearComplete');\n\n// This tracks where new tasks should be placed. Starts off with being \"inbox\"\nlet workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0]; \n\nmodalConfirmBtn.addEventListener('click', () => {\n    (modal.getAttribute('modalType') == 'create') ? createTask(workingProject) : editTask();\n});\n\nmodalProjectConfirmBtn.addEventListener('click', () => {\n    (modalProject.getAttribute('modalType') == 'create') ? createProject() : editProject();\n});\n\nallTasksBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    allTasksBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\ntodayBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    todayBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\nthisWeekBtn.addEventListener('click', () => {\n    // CSS styling\n    resetSelection();\n    thisWeekBtn.classList.add('selected');\n    workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n    DOM_Update();\n});\n\nclearCompleteBtn.addEventListener('click', () => {\n    // Go through all projects and only keep those who are not marked complete\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        // Go through each task in the project\n        for (let j=0; j<_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks().length; j++){\n            if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks()[j].isComplete()){\n                _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].removeTask(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks()[j].uuid);\n                DOM_Update();\n            }\n        }\n    }\n});\n\n// Given an array of tasks, lists the valid tasks\n// range: -1 -> list all tasks\n// range:  1 -> list all tasks due the same day as today\n// range:  n -> list all tasks occuring over the next n days \nfunction DOM_ListTasks(tasks, range){\n    const taskList = document.querySelector('#taskList');\n    \n\n    // Loop thru array and list each valid task adding the edit listener\n    for (let i=0; i<tasks.length; i++){\n        \n        // Convert due date into a date object so we can work with it\n        var parts = tasks[i].getDate().split('-');\n        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); \n\n        // If we want items due today, we have to cut any that would extend to tmw (24H bug fix)\n        if (range == 1 && (dueDate.getDate() != new Date().getDate())) continue;\n\n\n        const time_diff = dueDate.getTime()-new Date().getTime();\n        const days_diff = time_diff / (1000 * 3600 * 24);\n        \n        \n\n        // Criteria to display the task\n        if (range == -1 || days_diff <= range){\n            const task = document.createElement('div');\n            task.setAttribute('uuid', tasks[i].uuid);\n            task.classList.add('task');\n            task.textContent = tasks[i].getName();\n\n            // Add or remove the isComplete CSS tag\n            if (tasks[i].isComplete()){\n                task.classList.add('taskComplete');\n            }else{\n                task.classList.remove('taskComplete');\n            }\n    \n            const taskDate = document.createElement('div');\n            taskDate.classList.add('daaate');\n            taskDate.textContent = tasks[i].getDate();\n            task.appendChild(taskDate);\n    \n            //EDIT\n            const editBtn = document.createElement('button');\n            editBtn.textContent = 'edit';\n            task.appendChild(editBtn);\n            editBtn.addEventListener('click', () => {\n                modal.setAttribute('modalType', 'edit');\n                \n                // STORE html data attribute with unique ID\n                modal.setAttribute('uuid', tasks[i].uuid);\n    \n                // Set heading accordingly and pre-load fields with our tasks content\n                document.querySelector('#modal #heading').textContent = 'Edit task';\n                document.querySelector('#modal #modalTitle').value = tasks[i].getName();\n                document.querySelector('#modal #modalDate').value = tasks[i].getDate();\n    \n    \n                modal.showModal();\n            });  \n            \n            \n            //DELETE\n            const deleteBtn = document.createElement('button');\n            deleteBtn.textContent = 'delete';\n            task.appendChild(deleteBtn);\n            deleteBtn.addEventListener('click', () => {\n                removeTask(tasks[i].uuid);\n            });\n\n            //COMPLETE\n            const toggleCompleteBtn = document.createElement('button');\n            toggleCompleteBtn.textContent = 'Completed';\n            task.appendChild(toggleCompleteBtn);\n            toggleCompleteBtn.addEventListener('click', () => {\n                tasks[i].toggleComplete();\n                DOM_Update();\n            });\n\n\n\n            // DONE building elements in the task container, now append it\n            taskList.appendChild(task);\n        }\n    }\n}\n\n// Creates a task using info from modal for a project\nfunction createTask(project){\n    // Fetch data from modal\n    const title = document.querySelector('#modal #modalTitle').value;\n    const date = document.querySelector('#modal #modalDate').value;\n\n    // Create task object\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__.taskItemFactory)(title, date);\n\n    // Append the newly created object to the project\n    project.appendTask(newTask);\n\n    DOM_Update();\n    resetModal();\n}\n\n// Updates a task using info from modal for a project\nfunction editTask(){\n    let task;\n     // Check each project to search for the task we want to edit\n     // The edit modal is marked with the uuid of the task we want to edit\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(modal.getAttribute('uuid'))){ // Returns a task object, else undefined\n            task = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(modal.getAttribute('uuid'));\n            break;\n        }\n    }\n\n    // Update the task with the new params\n    task.setName(document.querySelector('#modal #modalTitle').value);\n    task.setDate(document.querySelector('#modal #modalDate').value);\n\n    DOM_Update();\n    resetModal();\n}\n\n// Removes a task by uuid\nfunction removeTask(id){\n     // Check each project to see where the task is located\n    for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        if (_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(id) && id == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTask(id).uuid){ // We check that the task exists AND then if the uuid match\n            // Remove the task in the corresponding project\n            _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].removeTask(id);\n            break;\n        }\n    }\n    DOM_Update();\n}\n\n// Updates DOM display\nfunction DOM_Update(){\n    // Clearing can only happen here! If we clear in the DOM_ListTasks method, we lose ability to append\n    document.querySelector('#taskList').innerHTML = '';\n    //console.log(\"cleared the DOM\");\n\n    if (document.querySelector('#allTasks').classList.contains('selected')){\n        // We must print ALL tasks from ALL projects\n        for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n            DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks(),-1);\n        }\n        \n    } else if (document.querySelector('#today').classList.contains('selected')) {\n        // We must print ALL tasks from ALL projects that fit the criteria\n        for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n            DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks(),1);\n        }\n        \n    } else if (document.querySelector('#thisWeek').classList.contains('selected')) {\n        // We must print ALL tasks from ALL projects that fit the criteria\n        for (let i=0; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n            DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getTasks(),7);\n        }\n    } else { //DOM updated for a project\n        DOM_ListTasks(workingProject.getTasks(),-1);\n    }\n    \n}\n\nfunction createProject(){\n    // Fetch data from modal\n    const title = document.querySelector('#modalProject #modalTitle').value;\n\n    // Create new project object and add it to the projects array\n    const newProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__.projectFactory)(title);\n    newProject.addSelf();\n\n    // Make the freshly created project the center of attention!\n    workingProject = newProject;\n\n    DOM_ListProjects();\n    DOM_Update();\n    resetModalProject();\n}\n\n// Updates a task using info from modal\nfunction editProject(){\n    // Get the project we want to edit\n    const project = _project__WEBPACK_IMPORTED_MODULE_1__.projects.find(item => item.uuid == modalProject.getAttribute('uuid'));;\n\n    // Update the project with the new params\n    project.setName(document.querySelector('#modalProject #modalTitle').value);\n\n    DOM_ListProjects();\n    resetModalProject();\n}\n\n// Update sidebar DOM based on projects[]\nfunction DOM_ListProjects(){\n    const DOM_ProjectList = document.querySelector('#projectList');\n    DOM_ProjectList.innerHTML = '';\n\n    // Go through projects array and list each project. Skip 0 as it is inbox\n    for (let i=1; i<_project__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++){\n        const project = document.createElement('li');\n        project.innerText = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getName();\n        project.setAttribute('uuid', _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].uuid);\n\n        if (workingProject == _project__WEBPACK_IMPORTED_MODULE_1__.projects[i]) {\n            resetSelection();\n            project.classList.add('selected');\n        }\n        \n        // Create listener for project\n        project.addEventListener('click', () => {\n            // CSS Styling\n            resetSelection();\n            project.classList.add('selected');\n            workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i];\n            //console.log(\"working project set to: \"+workingProject.getName());\n            DOM_Update();\n        });\n        \n\n        //EDIT\n        const editBtn = document.createElement('button');\n        editBtn.textContent = 'edit';\n        project.appendChild(editBtn);\n\n        editBtn.addEventListener('click', () => {\n            modalProject.setAttribute('modalType', 'edit');\n            \n            // STORE html data attribute with unique ID\n            modalProject.setAttribute('uuid', _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].uuid);\n\n            // Set heading accordingly and pre-load fields with our projects content\n            document.querySelector('#modalProject #heading').textContent = 'Edit project';\n            document.querySelector('#modalProject #modalTitle').value = _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].getName();\n\n\n            modalProject.showModal();\n        });\n\n        //DELETE\n        const deleteBtn = document.createElement('button');\n        deleteBtn.textContent = 'delete';\n        project.appendChild(deleteBtn);\n\n        deleteBtn.addEventListener('click', (e) => {\n            e.stopPropagation(); // We need to stop propagation here!\n\n            //Projects cannot be modified here! It is read only since imported\n            _project__WEBPACK_IMPORTED_MODULE_1__.projects[i].removeProject(_project__WEBPACK_IMPORTED_MODULE_1__.projects[i].uuid);\n\n            resetSelection();\n            allTasksBtn.classList.add('selected');\n            workingProject = _project__WEBPACK_IMPORTED_MODULE_1__.projects[0];\n            \n            DOM_ListProjects();\n            DOM_Update();\n        });\n\n        // DONE building elements in the project container, now append it\n        DOM_ProjectList.appendChild(project);\n    }\n}\n\n\n\n// Resets all fields in the modal\nfunction resetModal(){\n    document.querySelector('#modal #modalTitle').value = '';\n    document.querySelector('#modal #modalDate').value = '';\n}\n\n// Resets all fields in the modal\nfunction resetModalProject(){\n    document.querySelector('#modalProject #modalTitle').value = '';\n}\n\n// Clears \"selected\" tag on all elements\nfunction resetSelection(){\n    // Clear top 3\n    document.querySelector('#allTasks').classList.remove('selected');\n    document.querySelector('#today').classList.remove('selected');\n    document.querySelector('#thisWeek').classList.remove('selected');\n\n    // Clear custom projects\n    document.querySelectorAll('li').forEach((item) => {\n        item.classList.remove('selected');\n    });\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inbox\": () => (/* binding */ inbox),\n/* harmony export */   \"projectFactory\": () => (/* binding */ projectFactory),\n/* harmony export */   \"projects\": () => (/* binding */ projects)\n/* harmony export */ });\n\n\n\nlet projects = [];\n\n// TODO: Some logic to ensure project name is unique. This logic possibly will not reside here\nconst projectFactory = (title) => {\n    let uuid = self.crypto.randomUUID();\n    let tasks = [];\n\n    \n\n    function appendTask(task){ tasks.push(task); }\n\n\n    // Returns all tasks associated with that project\n    function getTasks(){ return tasks; }\n\n    // Returns single task object matching id \n    function getTask(id){\n        return tasks.find(item => item.uuid == id);\n    }\n\n    function removeTask(id){\n        tasks = tasks.filter(task => task.uuid != id); \n    }\n\n    function removeProject(id){\n        projects = projects.filter(proj => proj.uuid != id); \n    }\n\n    function getName(){\n        return title;\n    }\n\n    function setName(newTitle){\n        title = newTitle;\n    }\n\n    function addSelf(){\n        projects.push(this);\n    }\n\n    \n    return { uuid, appendTask, getTasks, getTask, getName, setName, addSelf, removeTask, removeProject};\n};\n\nconst inbox = projectFactory('inbox');\ninbox.addSelf();\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskItemFactory\": () => (/* binding */ taskItemFactory)\n/* harmony export */ });\n\n\nconst taskItemFactory = (title, date) => {\n    let uuid = self.crypto.randomUUID();\n    let taskComplete = false;\n    function getName(){\n        return title;\n    }\n    function setName(newName){\n        title = newName;\n    }\n    function getDate(){\n        return date;\n    }\n    function setDate(newDate){\n        date = newDate;\n    }\n\n    function isComplete(){\n        return taskComplete;\n    }\n\n    function toggleComplete(){\n        if (taskComplete){\n            taskComplete = false;\n        }else{\n            taskComplete = true;\n        }\n    }\n\n    return { uuid, getName, setName, getDate, setDate, isComplete, toggleComplete};\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

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