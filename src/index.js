// import { format } from "date-fns";
import "./styles/style.css";

import { Project } from "./project.js";
import { OpenProjectContent } from "./open-project-content.js";
import { CreateProjectMenu } from "./create-project-menu.js";
import { CreateProjectTab } from "./create-project-tab.js";
import { CreateTodoMenu } from "./create-todo-menu.js";
import { DeleteProjectTab } from "./delete-project-tab.js";
import { CreateTodoItem } from "./create-todo-item.js";
import { Todo } from "./todo.js";
import { DeleteTodoItem } from "./delete-todo-item.js";


/*
Todo list, roughly in order:
- make todos editable
- make projects editable
- make todos sortable by priority
*/

class Controller {

    projectsDiv = document.querySelector("#projects");
    sidebarDiv = document.querySelector("#sidebar");
    contentDiv = document.querySelector("#content");

    constructor() {
        this.projects = [];

        const firstProject = new Project("First project", "This is the first project.");
        const p1task1 = new Todo("task 1", "2014-01-12T00:00", "3", "look at enemy");
        const p1task2 = new Todo("task 2", "2016-02-19T00:00", "1", "panic roll");
        const p1task3 = new Todo("task 3", "2019-12-31T00:00", "2", "get hit anyways");
        firstProject.addTodo(p1task1);
        firstProject.addTodo(p1task2);
        firstProject.addTodo(p1task3);

        this.addProject(firstProject);

        const secondProject = new Project("Second project", "This is the second project. Yippee!");
        const p2task1 = new Todo("task 1", "2014-01-12T00:00", "2", "curl into a ball");
        const p2task2 = new Todo("task 2", "2016-02-19T00:00", "1", "try not to cry");
        const p2task3 = new Todo("task 3", "2019-12-31T00:00", "3", "cry");
        secondProject.addTodo(p2task1);
        secondProject.addTodo(p2task2);
        secondProject.addTodo(p2task3);
        
        this.addProject(secondProject);



        // click project tab on sidebar -> open project contents
        const openProjectBtns = document.querySelectorAll(".project-btn");
        openProjectBtns.forEach(el =>
            el.addEventListener('click', this.openProjectContent.bind(this))
        );

        // click "+" on sidebar (create project button) -> open create project content
        const createProjectBtn = document.querySelector("#create-project-btn");
        createProjectBtn.addEventListener("click", this.createProject.bind(this));

        // click Delete on sidebar -> delete project from sidbar and projects[]
        const deleteProjectBtns = document.querySelectorAll(".delete-project-btn");
        deleteProjectBtns.forEach(el =>
            el.addEventListener('click', this.deleteProject.bind(this))
        );
        
    }





    // opening the project creation UI onto content
    createProject() {
        new CreateProjectMenu();

        // click finish button on create project content -> add project to sidebar and projects[]
        const finishProjectBtn = document.querySelector("#finish-project-btn");
        finishProjectBtn.addEventListener("click", this.finishProject.bind(this));
    }
    finishProject() {
        const projTitle = this.contentDiv.querySelector("#project-title-input").value;
        const projDescription = this.contentDiv.querySelector("#project-description-input").value;

        const newProject = new Project(projTitle, projDescription);
        this.addProject(newProject);
    }


    // adding project tab to projects list on sidebar
    addProject(proj) {
        this.projects.push(proj);
        this.addProjectTab(proj);
    }
    addProjectTab(proj) {
        new CreateProjectTab(proj);
    }
    
    
    // removing project from both projects[] and UI
    deleteProject(event) {
        const element = event.target;

        const projectID = element.id;
        const projectIdx = this.getProjectIndexFromID(projectID);

        // delete project from projects[]
        this.projects.splice(projectIdx, 1);

        // delete UI content
        new DeleteProjectTab(projectID, projectIdx);
    }
    

    


    // opening a project onto content from the sidebar
    openProjectContent(event) {
        const element = event.target;

        const projectID = element.id;
        const projectIdx = this.getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            new OpenProjectContent(this.projects[projectIdx]);
        }

        // click Add a Todo item on content -> open a todo creation menu underneath button
        const addTodoBtn = document.querySelector("#add-todo-btn");
        addTodoBtn.addEventListener("click", this.addTodoBtnClick.bind(this));

        // click todo edit button -> edit todo in project's todoList and update UI
        const editTodoBtns = document.querySelectorAll(".todo-edit-btn");
        editTodoBtns.forEach(el =>
            el.addEventListener('click', this.editTodoBtnClick.bind(this))
        );

        // click todo delete button -> delete todo from project's todoList and remove from UI
        const deleteTodoBtns = document.querySelectorAll(".todo-delete-btn");
        deleteTodoBtns.forEach(el =>
            el.addEventListener('click', this.deleteTodoBtnClick.bind(this))
        );
    }
    addTodoBtnClick() {
        const addTodoBtn = document.querySelector("#add-todo-btn");

        if(addTodoBtn.textContent === "Add a Todo item") {
            // generate the todo creation menu underneath the button
            new CreateTodoMenu();

            // click Create Todo Item button -> add a todo object to project and add it to UI
            const createTodoBtn = document.querySelector("#create-todo-btn");
            createTodoBtn.addEventListener("click", this.createTodoBtnClick.bind(this));
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
    createTodoBtnClick() {
        const todoName = document.querySelector("#todo-name-input").value;
        const todoDueDate = document.querySelector("#todo-duedate-input").value;
        const todoPriority = document.querySelector("#todo-priority-select").value;
        const todoDescription = document.querySelector("#todo-description-input").value;
        const newTodo = new Todo(todoName, todoDueDate, todoPriority, todoDescription);

        // get current project
        const projID = document.querySelector("#project-title").classList[0];
        const projIdx = this.getProjectIndexFromID(projID);

        // add to project object list
        this.projects[projIdx].addTodo(newTodo);

        // add to UI
        const newTodoItem = new CreateTodoItem(newTodo);
        
        // add event listeners to newly created todo item
        const newTodoDiv = newTodoItem.todoDiv;
        const newEditBtn = newTodoDiv.querySelector(".todo-edit-btn");
        newEditBtn.addEventListener("click", this.editTodoBtnClick.bind(this));
    }
    editTodoBtnClick() {

    }
    deleteTodoBtnClick(event) {
        const element = event.target;
        
        // get current project and todoList
        const projectTitle = document.querySelector("#project-title");
        const projectID = projectTitle.className;
        const projectIdx = this.getProjectIndexFromID(projectID);
        const projectTodoList = this.projects[projectIdx].todoList;

        // get which todo we are deleting
        const todoDiv = element.parentNode;
        const todoID = todoDiv.id;
        const todoIdx = this.getTodoIndexFromID(this.projects[projectIdx], todoID);

        // delete todo data
        projectTodoList.splice(todoIdx, 1);

        // delete todo from UI
        new DeleteTodoItem(todoIdx);
    }
    
    


    


    // useful little auxillary funcs
    getProjectIndexFromID(inputID) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id === inputID) {
                return i;
            }
        }
        return -1;
    }
    getTodoIndexFromID(project, todoID) {
        for(let i = 0; i < project.todoList.length; i++) {
            if(project.todoList[i].id === todoID) {
                return i;
            }
        }
        return -1;
    }
    
}
new Controller();
