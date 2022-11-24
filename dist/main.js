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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n\n\n\n\nconst createTaskBtn = document.querySelector('#createTask');\nconst myModal = document.querySelector('#modal');\n\nconst inbox = (0,_project__WEBPACK_IMPORTED_MODULE_1__.projectFactory)('inbox');\n\ncreateTaskBtn.addEventListener('click', () => {\n    // We need some logic to determine if task is to be added to inbox or some project.\n\n    // TEMP: Assume we are adding to inbox\n\n    // Pop up modal and get info from user\n    myModal.showModal();\n\n\n\n    // Use this info to build a task object, append the task in the appropriate project\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__.taskItemFactory)('Feed the Dog');\n\n    inbox.appendTask(newTask);\n\n    (0,_page__WEBPACK_IMPORTED_MODULE_2__.DOM_ListTasks)(inbox.getTasks());\n\n\n    console.log(\"projects:  \"+_project__WEBPACK_IMPORTED_MODULE_1__.projects);\n\n    \n\n});\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOM_ListTasks\": () => (/* binding */ DOM_ListTasks)\n/* harmony export */ });\n\n\n// Given an array of tasks, lists them all on the page\nfunction DOM_ListTasks(tasks){\n    const taskList = document.querySelector('#taskList');\n    taskList.innerHTML = '';\n\n    \n\n    // Loop thru array and list each task\n    for (let i=0; i<tasks.length; i++){\n        const task = document.createElement('div');\n        task.textContent = tasks[i].getname();\n        taskList.appendChild(task);\n    }\n\n    \n}\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectFactory\": () => (/* binding */ projectFactory),\n/* harmony export */   \"projects\": () => (/* binding */ projects)\n/* harmony export */ });\n\n\n\nconst projects = [];\n\n// TODO: Some logic to ensure project name is unique\n\nconst projectFactory = (title) => {\n    let tasks = [];\n\n    \n    function appendTask(task){\n        tasks.push(task);\n    }\n\n    function printTasks(){\n        console.log(title + \" has the following tasks: \");\n        for (let i=0; i<tasks.length; i++){\n            console.log(\"--\"+tasks[i].getname());\n        }\n    }\n\n    function getTasks(){\n        return tasks;\n    }\n\n\n\n    projects.push(title);\n    return { title, appendTask, printTasks, getTasks};\n};\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskItemFactory\": () => (/* binding */ taskItemFactory)\n/* harmony export */ });\n\n\nconst taskItemFactory = (title) => {\n    function sayname(){\n        console.log(title);\n    }\n    function getname(){\n        return title;\n    }\n    return { title, sayname, getname };\n};\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

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