import { Project } from "./data/project.js";
import { Todo } from "./data/todo.js";
import { createProjectMenuUI, createProjectTabUI, deleteProjectTabUI } from "./ui/sidebar.js";
import { openProjectContentUI, createTodoMenuUI, createTodoItemUI, deleteTodoItemUI, editTodoMenuUI } from "./ui/content.js";

/*
Todo list, roughly in order:
- fix entire structure
- make todos editable
- make projects editable
- make todos sortable by priority
*/

const projectsDiv = document.querySelector("#projects");
const contentDiv = document.querySelector("#content");

export function init() {
    const projects = [];

    const firstProject = new Project("First project", "This is the first project.");
    const p1task1 = new Todo("task 1", "2014-01-12T00:00", "3", "look at enemy");
    const p1task2 = new Todo("task 2", "2016-02-19T00:00", "1", "panic roll");
    const p1task3 = new Todo("task 3", "2019-12-31T00:00", "2", "get hit anyways");
    firstProject.addTodo(p1task1);
    firstProject.addTodo(p1task2);
    firstProject.addTodo(p1task3);

    addProject(firstProject);

    const secondProject = new Project("Second project", "This is the second project. Yippee!");
    const p2task1 = new Todo("task 1", "2014-01-12T00:00", "2", "curl into a ball");
    const p2task2 = new Todo("task 2", "2016-02-19T00:00", "1", "try not to cry");
    const p2task3 = new Todo("task 3", "2019-12-31T00:00", "3", "cry");
    secondProject.addTodo(p2task1);
    secondProject.addTodo(p2task2);
    secondProject.addTodo(p2task3);
    
    addProject(secondProject);


    // click "+" on sidebar (create project button) -> open create project content
    const createProjectBtn = document.querySelector("#create-project-btn");
    createProjectBtn.addEventListener("click", createProject);

    // click project tab on sidebar -> open project contents
    const openProjectBtns = document.querySelectorAll(".project-btn");
    openProjectBtns.forEach(el =>
        el.addEventListener('click', openProjectContent)
    );

    // click Delete on sidebar -> delete project from sidbar and projects[]
    const deleteProjectBtns = document.querySelectorAll(".delete-project-btn");
    deleteProjectBtns.forEach(el =>
        el.addEventListener('click', deleteProject)
    );




    // opening the project creation UI onto content
    function createProject() {
        createProjectMenuUI();

        // click finish button on create project content -> add project to sidebar and projects[]
        const finishProjectBtn = document.querySelector("#finish-project-btn");
        finishProjectBtn.addEventListener("click", finishProject);
    }
    function finishProject() {
        const projTitle = contentDiv.querySelector("#project-title-input").value;
        const projDescription = contentDiv.querySelector("#project-description-input").value;

        const newProject = new Project(projTitle, projDescription);
        addProject(newProject);
    }


    // adding project tab to projects list on sidebar
    function addProject(proj) {
        // add to projects[]
        projects.push(proj);

        // add to UI (createProjectTabUI() both creates UI and returns the project tab div)
        const newProjectTab = createProjectTabUI(proj);

        // add eventListeners to newly created tab
        const newProjectBtn = newProjectTab.querySelector(".project-btn");
        newProjectBtn.addEventListener('click', openProjectContent)

        const newDeleteBtn = newProjectTab.querySelector(".delete-project-btn");
        newDeleteBtn.addEventListener('click', deleteProject)
    }


    // removing project from both projects[] and UI
    function deleteProject(event) {
        const element = event.target;

        const projectID = element.id;
        const projectIdx = getProjectIndexFromID(projectID);

        // delete project from projects[]
        projects.splice(projectIdx, 1);

        // delete UI content
        deleteProjectTabUI(projectID, projectIdx);
    }


    // opening a project onto content from the sidebar
    function openProjectContent(event) {
        const element = event.currentTarget;

        const projectID = element.id;
        const projectIdx = getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            openProjectContentUI(projects[projectIdx]);
        }

        // click Add a Todo item on content -> open a todo creation menu underneath button
        const addTodoBtn = document.querySelector("#add-todo-btn");
        addTodoBtn.addEventListener("click", addTodoBtnClick);

        // click todo edit button -> edit todo in project's todoList and update UI
        const editTodoBtns = document.querySelectorAll(".todo-edit-btn");
        editTodoBtns.forEach(el =>
            el.addEventListener('click', editTodoBtnClick)
        );

        // click todo delete button -> delete todo from project's todoList and remove from UI
        const deleteTodoBtns = document.querySelectorAll(".todo-delete-btn");
        deleteTodoBtns.forEach(el =>
            el.addEventListener('click', deleteTodoBtnClick)
        );
    }
    function addTodoBtnClick() {
        const addTodoBtn = document.querySelector("#add-todo-btn");

        if(addTodoBtn.textContent === "Add a Todo item") {
            // generate the todo creation menu underneath the button
            createTodoMenuUI();

            // click Create Todo Item button -> add a todo object to project and add it to UI
            const createTodoBtn = document.querySelector("#create-todo-btn");
            createTodoBtn.addEventListener("click", createTodoBtnClick);
        }

        else if(addTodoBtn.textContent === "Cancel creating new Todo") {
            // remove all but the first child in #add-todo-div (which is #add-todo-btn)
            const addTodoDiv = document.querySelector("#add-todo-div");
            while(addTodoDiv.childNodes.length > 1) {
                addTodoDiv.removeChild(addTodoDiv.lastChild);
            }
            // set its text back to normal
            addTodoBtn.textContent = "Add a Todo item";
        }
    }
    function createTodoBtnClick() {
        const todoName = document.querySelector("#todo-name-input").value;
        const todoDueDate = document.querySelector("#todo-duedate-input").value;
        const todoPriority = document.querySelector("#todo-priority-select").value;
        const todoDescription = document.querySelector("#todo-description-input").value;
        const newTodo = new Todo(todoName, todoDueDate, todoPriority, todoDescription);

        // get current project
        const projID = document.querySelector("#project-title").classList[0];
        const projIdx = getProjectIndexFromID(projID);

        // add to project object list
        projects[projIdx].addTodo(newTodo);

        // add to UI
        const newTodoDiv = createTodoItemUI(newTodo);
        
        // add event listeners to newly created todo item
        const newEditBtn = newTodoDiv.querySelector(".todo-edit-btn");
        newEditBtn.addEventListener("click", editTodoBtnClick);

        const newDeleteBtn = newTodoDiv.querySelector(".todo-delete-btn");
        newDeleteBtn.addEventListener("click", deleteTodoBtnClick);
    }
    function editTodoBtnClick() {

    }
    function deleteTodoBtnClick(event) {
        const element = event.target;
        
        // get current project and todoList
        const projectTitle = document.querySelector("#project-title");
        const projectID = projectTitle.className;
        const projectIdx = getProjectIndexFromID(projectID);
        const projectTodoList = projects[projectIdx].todoList;

        // get which todo we are deleting
        const todoDiv = element.parentNode;
        const todoID = todoDiv.id;
        const todoIdx = getTodoIndexFromID(projects[projectIdx], todoID);

        // delete todo data
        projectTodoList.splice(todoIdx, 1);

        // delete todo from UI
        deleteTodoItemUI(todoIdx);
    }







    // useful little auxillary funcs
    function getProjectIndexFromID(inputID) {
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].id === inputID) {
                return i;
            }
        }
        return -1;
    }
    function getTodoIndexFromID(project, todoID) {
        for(let i = 0; i < project.todoList.length; i++) {
            if(project.todoList[i].id === todoID) {
                return i;
            }
        }
        return -1;
    }

}
