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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n\n\n\nconst createTaskBtn = document.querySelector('#createTask');\nconst modal = document.querySelector('#modal');\n\nconst allTasksBtn = document.querySelector('#allTasks');\nconst todayBtn = document.querySelector('#today');\nconst thisWeekBtn = document.querySelector('#thisWeek');\n\ncreateTaskBtn.addEventListener('click', () => {\n    // We need some logic to determine if task is to be added to inbox or some project. TODO Later\n    // TEMP: Assume we are adding to inbox\n    \n    modal.setAttribute('modalType', 'create');\n\n    // Set heading accordingly\n    document.querySelector('#modal #heading').textContent = 'Create new task';\n\n    // Pop up modal and get info from user\n    modal.showModal();\n});\n\n\n// Note: we leave clearing of the page to the individual display function\n\nallTasksBtn.addEventListener('click', () => {\n    // CSS styling\n    allTasksBtn.classList.add('selected');\n    todayBtn.classList.remove('selected');\n    thisWeekBtn.classList.remove('selected');\n\n    (0,_page__WEBPACK_IMPORTED_MODULE_0__.DOM_ListTasks)(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks());\n});\n\ntodayBtn.addEventListener('click', () => {\n    // CSS styling\n    allTasksBtn.classList.remove('selected');\n    todayBtn.classList.add('selected');\n    thisWeekBtn.classList.remove('selected');\n\n    (0,_page__WEBPACK_IMPORTED_MODULE_0__.DOM_ListRangeTasks)(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks(),1);\n});\n\nthisWeekBtn.addEventListener('click', () => {\n    // CSS styling\n    allTasksBtn.classList.remove('selected');\n    todayBtn.classList.remove('selected');\n    thisWeekBtn.classList.add('selected');\n\n    (0,_page__WEBPACK_IMPORTED_MODULE_0__.DOM_ListRangeTasks)(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks(),7);\n});\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOM_ListRangeTasks\": () => (/* binding */ DOM_ListRangeTasks),\n/* harmony export */   \"DOM_ListTasks\": () => (/* binding */ DOM_ListTasks)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n\n\n\n\n\n\n\nconst modalConfirmBtn = document.querySelector('#modal #Confirm');\n\nmodalConfirmBtn.addEventListener('click', () => {\n    (modal.getAttribute('modalType') == 'create') ? createTask() : editTask();\n});\n\n\n\n// Given an array of tasks, lists them all on the page. Listeners added here too!\nfunction DOM_ListTasks(tasks){\n    const taskList = document.querySelector('#taskList');\n    taskList.innerHTML = '';\n\n    // Loop thru array and list each task adding the edit listener\n    for (let i=0; i<tasks.length; i++){\n        const task = document.createElement('div');\n        task.classList.add('task');\n        task.textContent = tasks[i].getName();\n\n        const taskDate = document.createElement('div');\n        taskDate.classList.add('daaate');\n        taskDate.textContent = tasks[i].getDate();\n        task.appendChild(taskDate);\n\n        //EDIT\n        const editBtn = document.createElement('button');\n        editBtn.textContent = 'edit';\n        task.appendChild(editBtn);\n\n        editBtn.addEventListener('click', () => {\n            modal.setAttribute('modalType', 'edit');\n            \n            // STORE html data attribute with unique ID\n            modal.setAttribute('uniqueID', tasks[i].uuid);\n\n            // Set heading accordingly and pre-load fields with our tasks content\n            document.querySelector('#modal #heading').textContent = 'Edit task';\n            document.querySelector('#modal #modalTitle').value = tasks[i].getName();\n            document.querySelector('#modal #modalDate').value = tasks[i].getDate();\n\n\n            modal.showModal();\n        });\n\n\n        taskList.appendChild(task);\n    }\n\n}\n\n\n// Given an array of tasks, lists the ones due within the range. \nfunction DOM_ListRangeTasks(tasks, range){\n    const taskList = document.querySelector('#taskList');\n    taskList.innerHTML = '';\n\n    // Loop thru array and list each task adding the edit listener\n    for (let i=0; i<tasks.length; i++){\n        \n        // Convert due date into a date object so we can work with it\n        var parts = tasks[i].getDate().split('-');\n        var dueDate = new Date(parts[0], parts[1] - 1, parts[2]); \n        // Duedate is now in valid date obj form\n\n\n        const time_diff = dueDate.getTime()-new Date().getTime();\n        const days_diff = time_diff / (1000 * 3600 * 24);\n\n        if (days_diff <= range){\n            const task = document.createElement('div');\n            task.classList.add('task');\n            task.textContent = tasks[i].getName();\n    \n            const taskDate = document.createElement('div');\n            taskDate.classList.add('daaate');\n            taskDate.textContent = tasks[i].getDate();\n            task.appendChild(taskDate);\n    \n            //EDIT\n            const editBtn = document.createElement('button');\n            editBtn.textContent = 'edit';\n            task.appendChild(editBtn);\n    \n            editBtn.addEventListener('click', () => {\n                modal.setAttribute('modalType', 'edit');\n                \n                // STORE html data attribute with unique ID\n                modal.setAttribute('uniqueID', tasks[i].uuid);\n    \n                // Set heading accordingly and pre-load fields with our tasks content\n                document.querySelector('#modal #heading').textContent = 'Edit task';\n                document.querySelector('#modal #modalTitle').value = tasks[i].getName();\n                document.querySelector('#modal #modalDate').value = tasks[i].getDate();\n    \n    \n                modal.showModal();\n            });    \n            taskList.appendChild(task);\n        }\n\n\n    }\n}\n\n// Creates a task using info from modal \nfunction createTask(){\n    // Fetch data from modal\n    const title = document.querySelector('#modal #modalTitle').value;\n    const date = document.querySelector('#modal #modalDate').value;\n\n    // Create task object\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__.taskItemFactory)(title, date);\n\n    // Append the newly created object to the inbox\n    _project__WEBPACK_IMPORTED_MODULE_1__.inbox.appendTask(newTask);\n\n    DOM_Update();\n    resetModal();\n}\n\n// Updates a task using info from modal\nfunction editTask(){\n    // Get the task we want to edit\n    const task = _project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTask(modal.getAttribute('uniqueID'));\n\n    // Update the task with the new params\n    task.setName(document.querySelector('#modal #modalTitle').value);\n    task.setDate(document.querySelector('#modal #modalDate').value);\n\n    DOM_Update();\n    resetModal();\n}\n\n// Resets all fields in the modal\nfunction resetModal(){\n    document.querySelector('#modal #modalTitle').value = '';\n    document.querySelector('#modal #modalDate').value = '';\n}\n\n// Updates DOM display\nfunction DOM_Update(){\n    if (document.querySelector('#allTasks').classList.contains('selected')){\n        DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks());\n    } else if (document.querySelector('#today').classList.contains('selected')) {\n        DOM_ListTodayTasks(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks());\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inbox\": () => (/* binding */ inbox),\n/* harmony export */   \"projectFactory\": () => (/* binding */ projectFactory),\n/* harmony export */   \"projects\": () => (/* binding */ projects)\n/* harmony export */ });\n\n\n\nconst projects = [];\n\n// TODO: Some logic to ensure project name is unique\nconst projectFactory = (title) => {\n    let tasks = [];\n    projects.push(title);\n\n    function appendTask(task){ tasks.push(task); }\n\n    function printTasks(){\n        console.log(title + \" has the following tasks: \");\n        for (let i=0; i<tasks.length; i++){\n            console.log(\"--\"+tasks[i].getname());\n        }\n    }\n\n    // Returns all tasks associated with that project\n    function getTasks(){ return tasks; }\n\n    // Returns single task object matching id \n    function getTask(id){\n        return tasks.find(item => item.uuid == id);\n    }\n\n    \n    return { title, appendTask, printTasks, getTasks, getTask};\n};\n\nconst inbox = projectFactory('inbox');\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskItemFactory\": () => (/* binding */ taskItemFactory)\n/* harmony export */ });\n\n\nconst taskItemFactory = (title, date) => {\n    let uuid = self.crypto.randomUUID();\n    function getName(){\n        return title;\n    }\n    function setName(newName){\n        title = newName;\n    }\n    function getDate(){\n        return date;\n    }\n    function setDate(newDate){\n        date = newDate;\n    }\n\n    return { uuid, getName, setName, getDate, setDate};\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

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