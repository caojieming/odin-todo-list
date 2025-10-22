import { Project, getSampleProjects, addProjectToListModel, removeProjectFromListModel, addTodoToProject, removeTodoFromProject, getProjectFromList, getProjectIndexFromID, getTodoIndexFromID } from "./models/project.js";
import { Todo } from "./models/todo.js";
import { createProjectMenuView, createProjectTabView, deleteProjectTabView } from "./views/sidebar.js";
import { openProjectContentView, createTodoItemView, deleteTodoItemView, editTodoMenuView } from "./views/content.js";

/*
OK, so most addEventListener functions should be declared here since they require access to both models and views

Todo list, roughly in order:
- try to make it so that projectList doesn't need to be imported at all (make all projectList edits inside project.js by calling project.js functions)

- fix entire structure
- make todos editable
- make projects editable
- make todos sortable by priority
*/

const projectsDiv = document.querySelector("#projects");
const contentDiv = document.querySelector("#content");

export function init() {
    // generate sample project models
    const sampleProjects = getSampleProjects();

    // update projects in view
    for(var i = 0; i < sampleProjects.length; i++) {
        addProject(sampleProjects[i]);
    }

    // click "+" on sidebar (create project button) -> open create project content
    const createProjectBtn = document.querySelector("#create-project-btn");
    createProjectBtn.addEventListener("click", createProjectMenuView);

}


// event function, creates a Project() based of details on content view and adds it to projectList[] model and view
export function finishProjectCreation() {
    const projTitle = contentDiv.querySelector("#project-title-input").value;
    const projDescription = contentDiv.querySelector("#project-description-input").value;

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
        openProjectContentView(getProjectFromList(projectIdx));
    }
}


// event function
export function finishTodoBtnClick() {
    const todoName = document.querySelector("#todo-name-input").value;
    const todoDueDate = document.querySelector("#todo-duedate-input").value;
    const todoPriority = document.querySelector("#todo-priority-select").value;
    const todoDescription = document.querySelector("#todo-description-input").value;
    const newTodo = new Todo(todoName, todoDueDate, todoPriority, todoDescription);

    // get current project
    const projectID = document.querySelector("#project-title").classList[0];
    const projectIdx = getProjectIndexFromID(projectID);

    // add to project projectList[]
    addTodoToProject(projectIdx, newTodo);

    // add to View
    createTodoItemView(newTodo);
}


// event function
export function editTodoBtnClick() {
    // TODO
}


// event function
export function deleteTodoBtnClick(event) {
    const element = event.currentTarget;
    
    // get current project and todoList
    const projectTitle = document.querySelector("#project-title");
    const projectID = projectTitle.className;
    const projectIdx = getProjectIndexFromID(projectID);

    // get which todo we are deleting
    const todoDiv = element.parentNode;
    const todoID = todoDiv.id;
    const todoIdx = getTodoIndexFromID(getProjectFromList(projectIdx), todoID);

    // delete todo data
    removeTodoFromProject(projectIdx, todoIdx);

    // delete todo from View
    deleteTodoItemView(todoIdx);
}
