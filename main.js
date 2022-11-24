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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n\n\nconst createTaskBtn = document.querySelector('#createTask');\nconst createTaskModal = document.querySelector('#createTaskModal');\n\ncreateTaskBtn.addEventListener('click', () => {\n    // We need some logic to determine if task is to be added to inbox or some project. TODO Later\n    // TEMP: Assume we are adding to inbox\n    // Pop up modal and get info from user\n    createTaskModal.showModal();\n});\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n\n\nconst editTaskModal = document.querySelector('#editTaskModal');\n\nconst createTaskModalConfirmBtn = document.querySelector('#createTaskModal #Confirm');\nconst editTaskModalConfirmBtn = document.querySelector('#editTaskModal #Confirm');\n\ncreateTaskModalConfirmBtn.addEventListener('click', () => {\n    const taskTitle = document.querySelector('#createTaskModal #modalTitle').value;\n    document.querySelector('#createTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion\n    \n    // Use modal info to build a task object, append the task in the appropriate project\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__.taskItemFactory)(taskTitle);\n\n    _project__WEBPACK_IMPORTED_MODULE_1__.inbox.appendTask(newTask);\n\n    DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks());\n});\n\neditTaskModalConfirmBtn.addEventListener('click', () => {\n    _project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTask(editTaskModal.getAttribute('uniqueID')).setname(document.querySelector('#editTaskModal #modalTitle').value);\n    document.querySelector('#editTaskModal #modalTitle').value = ''; //TODO: wrap in a clear funtion\n    \n    DOM_ListTasks(_project__WEBPACK_IMPORTED_MODULE_1__.inbox.getTasks());\n});\n\n\n// Given an array of tasks, lists them all on the page. Listeners added here too!\nfunction DOM_ListTasks(tasks){\n    const taskList = document.querySelector('#taskList');\n    taskList.innerHTML = '';\n\n    // Loop thru array and list each task adding the edit listener\n    for (let i=0; i<tasks.length; i++){\n        const task = document.createElement('div');\n        task.classList.add('task');\n        task.textContent = tasks[i].getname();\n\n        const editBtn = document.createElement('button');\n        editBtn.textContent = 'edit';\n        task.appendChild(editBtn);\n\n        editBtn.addEventListener('click', () => {\n            editTaskModal.showModal();\n            // STORE html data attribute with unique ID\n            editTaskModal.setAttribute('uniqueID', tasks[i].getname());\n        });\n        taskList.appendChild(task);\n    }\n\n}\n\nfunction editTask(task){\n    task.setname('newName'); \n}\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inbox\": () => (/* binding */ inbox),\n/* harmony export */   \"projectFactory\": () => (/* binding */ projectFactory),\n/* harmony export */   \"projects\": () => (/* binding */ projects)\n/* harmony export */ });\n\n\n\nconst projects = [];\n\n// TODO: Some logic to ensure project name is unique\nconst projectFactory = (title) => {\n    let tasks = [];\n    projects.push(title);\n\n    function appendTask(task){ tasks.push(task); }\n\n    function printTasks(){\n        console.log(title + \" has the following tasks: \");\n        for (let i=0; i<tasks.length; i++){\n            console.log(\"--\"+tasks[i].getname());\n        }\n    }\n\n    // Returns all tasks associated with that project\n    function getTasks(){ return tasks; }\n\n    // Returns single task object matching id \n    function getTask(id){\n        return tasks.find(item => item.getname() == id);\n    }\n\n    \n    return { title, appendTask, printTasks, getTasks, getTask};\n};\n\nconst inbox = projectFactory('inbox');\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskItemFactory\": () => (/* binding */ taskItemFactory)\n/* harmony export */ });\n\n\nconst taskItemFactory = (title) => {\n    function getname(){\n        return title;\n    }\n    function setname(newName){\n        title = newName;\n    }\n    return { title, getname, setname };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

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