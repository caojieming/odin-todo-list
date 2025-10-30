import { Project, projectList, getSampleProjects, addProjectToListModel, removeProjectFromListModel, addTodoToProject, removeTodoFromProject, getProjectIndexFromID, getTodoIndexFromID, editTodoFromProject } from "./models/project.js";
import { Todo } from "./models/todo.js";
import { createProjectMenuView, createProjectTabView, editProjectSidebarView, deleteProjectTabView } from "./views/sidebar.js";
import { openProjectContentView, editProjectContentView, createTodoItemView, deleteTodoItemView, editTodoItemView } from "./views/content.js";
import { loadStorage, saveToStorage, storageAvailable } from "./models/local-storage.js";

/*
Todo list, roughly in order:
- clean up UI/make pretty
- make todos sortable by priority
*/


export function init() {
    // check if there is local storage support
    if(storageAvailable("localStorage")) {
        // if there is something stored locally, load it
        if(localStorage.getItem("storedProjects")) { 
            loadStorage();
        }
    }
    
    // generate sample project models if projectList is empty (nothing loaded from local storage)
    if(projectList.length === 0) {
        const sampleProjects = getSampleProjects();
        for(let i = 0; i < sampleProjects.length; i++) {
            projectList.push(sampleProjects[i]);
        }
    }

    // update projects in view (assuming model has projects)
    for(var i = 0; i < projectList.length; i++) {
        createProjectTabView(projectList[i]);
    }

    // click "+" on sidebar (create project button) -> open create project content
    const createProjectBtn = document.querySelector("#create-project-btn");
    createProjectBtn.addEventListener("click", createProjectMenuView);


    // run saveToStorage on webpage close/reload
    window.addEventListener("beforeunload", saveToStorage);
    // let targetProxy = new Proxy(projectList, {
    //     set: function (target, key, value) {
    //         saveToStorage();
    //         return true;
    //     }
    // });
}


// event function, creates a Project() based of details on content view and adds it to projectList[] model and view
export function confirmProjectCreation() {
    const projTitle = document.querySelector("#project-title-input").value;
    const projDescription = document.querySelector("#project-description-input").value;

    const newProject = new Project(projTitle, projDescription);
    addProject(newProject);

    // maybe do later: do something with content view after creating the new project
}


// adds project to both model and view
function addProject(project) {
    // add to projectList[] (model update)
    addProjectToListModel(project);
    // add to View
    createProjectTabView(project);
}


// event function, removing project from both projectList[] and View
export function deleteProject(event) {
    // target project ID is stored in the tab-div ID, so get it from there
    const element = event.currentTarget;
    const tabDiv = element.parentNode;
    const projectID = tabDiv.id;
    const projectIdx = getProjectIndexFromID(projectID);

    // delete project from projectList[] (model update)
    removeProjectFromListModel(projectIdx);

    // delete View content
    deleteProjectTabView(projectID, projectIdx);
}


// event function, opening a project onto content from the sidebar
export function openProjectContent(event) {
    // target project ID is stored in the tab-div ID, so get it from there
    const element = event.currentTarget;
    const tabDiv = element.parentNode;
    const projectID = tabDiv.id;
    const projectIdx = getProjectIndexFromID(projectID);

    // if statement is there just in case, getProjectIndexFromID() at this point in the code shouldn't return -1
    if(projectIdx != -1) {
        openProjectContentView(projectList[projectIdx]);
    }
}


// event function, updating project details in model and view
export function confirmEditProject(event) {
    // edit btn -> project details div
    const element = event.currentTarget;
    const projectDetailsDiv = element.parentNode;

    const title = projectDetailsDiv.querySelector("#edit-project-title-input").value;
    const description = projectDetailsDiv.querySelector("#edit-project-description-input").value;

    // get current project idx in projectList[]
    const projectID = document.querySelector("#project-details-div").classList[0];
    const projectIdx = getProjectIndexFromID(projectID);

    // update model
    projectList[projectIdx].title = title;
    projectList[projectIdx].description = description;

    // update view
    editProjectSidebarView(projectIdx, title);
    editProjectContentView(title, description);
}


// event function, creating todo in model and view
export function confirmCreateTodo() {
    const todoTitle = document.querySelector("#todo-title-input").value;
    const todoDueDate = document.querySelector("#todo-dueDate-input").value;
    const todoPriority = document.querySelector("#todo-priority-select").value;
    const todoDescription = document.querySelector("#todo-description-input").value;
    const newTodo = new Todo(todoTitle, todoDueDate, todoPriority, todoDescription);

    // get current project
    const projectID = document.querySelector("#project-details-div").classList[0];
    const projectIdx = getProjectIndexFromID(projectID);

    // add to project projectList[]
    addTodoToProject(projectIdx, newTodo);

    // add to View
    createTodoItemView(newTodo);
}


// event function, updating todo details in model and view
export function confirmEditTodo(event) {
    // edit btn -> todoDiv -> todoListDiv
    const element = event.currentTarget;
    const todoDiv = element.parentNode;

    const todoTitle = todoDiv.querySelector(".edit-todo-title-input").value;
    const todoDueDate = todoDiv.querySelector(".edit-todo-dueDate-input").value;
    const todoPriority = todoDiv.querySelector(".edit-todo-priority-select").value;
    const todoDescription = todoDiv.querySelector(".edit-todo-description-input").value;
    // this will generate a new todo with its own ID, however we will just be using this todo as a transferable data packet
    const updatedTodo = new Todo(todoTitle, todoDueDate, todoPriority, todoDescription);

    // get current project idx in projectList[]
    const projectID = document.querySelector("#project-details-div").classList[0];
    const projectIdx = getProjectIndexFromID(projectID);

    // get current todo idx in todoList[] (todo.id is stored in todoDiv as its id)
    const todoID = todoDiv.id;
    const todoIdx = getTodoIndexFromID(projectList[projectIdx], todoID);

    // replace todo in project
    editTodoFromProject(projectIdx, todoIdx, updatedTodo);

    // update view
    editTodoItemView(todoIdx, updatedTodo);
}


// event function, removing todo from model and view
export function deleteTodo(event) {
    const element = event.currentTarget;
    
    // get current project and todoList
    const projectTitle = document.querySelector("#project-details-div");
    const projectID = projectTitle.className;
    const projectIdx = getProjectIndexFromID(projectID);

    // get which todo we are deleting
    const todoDiv = element.parentNode;
    const todoID = todoDiv.id;
    const todoIdx = getTodoIndexFromID(projectList[projectIdx], todoID);

    // delete todo data
    removeTodoFromProject(projectIdx, todoIdx);

    // delete todo from View
    deleteTodoItemView(todoIdx);
}
