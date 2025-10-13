// import { format } from "date-fns";

import "./styles.css";
import { Project } from "./project.js";
import { OpenProjectContent } from "./open-project-content.js";
import { CreateProjectMenu } from "./create-project-menu.js";
import { CreateProjectTab } from "./create-project-tab.js";
import { CreateTodoMenu } from "./create-todo-menu.js";
import { DeleteProjectTab } from "./delete-project-tab.js";
import { CreateTodoItem } from "./create-todo-item.js";
import { Todo } from "./todo.js";

/*
Idea:
overall hierarchy will go: project -> section -> (todo) item
projects contain sections, sections contain items

projects will be displayed on the left side of the screen (using a grid or something)
sections + items will be displayed on the middle/right sides of the screen
*/

/*
Todo list, roughly in order:
- adding and removing todos
*/

class Controller {

    projectsDiv = document.querySelector("#projects");
    sidebarDiv = document.querySelector("#sidebar");
    contentDiv = document.querySelector("#content");

    constructor() {
        this.projects = [];

        const firstProject = new Project("First project", "This is the first project.");
        // const p1task1 = new Todo("task 1", format(new Date(2014, 1, 11), "MM/dd/yyyy"), "high", "look at enemy");
        // const p1task2 = new Todo("task 2", format(new Date(2016, 2, 19), "MM/dd/yyyy"), "low", "panic roll");
        // const p1task3 = new Todo("task 3", format(new Date(2019, 12, 31), "MM/dd/yyyy"), "medium", "get hit anyways");
        const p1task1 = new Todo("task 1", "2014-01-12T00:00", "high", "look at enemy");
        const p1task2 = new Todo("task 2", "2016-02-19T00:00", "low", "panic roll");
        const p1task3 = new Todo("task 3", "2019-12-31T00:00", "medium", "get hit anyways");
        firstProject.addTodo(p1task1);
        firstProject.addTodo(p1task2);
        firstProject.addTodo(p1task3);

        this.addProject(firstProject);

        const secondProject = new Project("Second project", "This is the second project. Yippee!");
        // const p2task1 = new Todo("task 1", format(new Date(2014, 1, 11), "MM/dd/yyyy"), "medium", "curl into a ball");
        // const p2task2 = new Todo("task 2", format(new Date(2016, 2, 19), "MM/dd/yyyy"), "low", "try not to cry");
        // const p2task3 = new Todo("task 3", format(new Date(2019, 12, 31), "MM/dd/yyyy"), "high", "cry");
        const p2task1 = new Todo("task 1", "2014-01-12T00:00", "medium", "curl into a ball");
        const p2task2 = new Todo("task 2", "2016-02-19T00:00", "low", "try not to cry");
        const p2task3 = new Todo("task 3", "2019-12-31T00:00", "high", "cry");
        secondProject.addTodo(p2task1);
        secondProject.addTodo(p2task2);
        secondProject.addTodo(p2task3);
        
        this.addProject(secondProject);



        // click project tab on sidebar -> open project contents 
        this.projectsDiv.addEventListener("click", this.openProjectContent.bind(this));

        // click "+" on sidebar (create project button) -> open create project content
        const createProjectBtn = document.querySelector("#create-project-btn");
        createProjectBtn.addEventListener("click", this.createProject.bind(this));

        // click Delete on sidebar -> delete project from sidbar and projects[]
        this.projectsDiv.addEventListener("click", this.deleteProject.bind(this));

        
    }



    
    
    deleteProject(event) {
        const element = event.target;
        // exits function if element is not a delete-project-btn
        if(element.className !== "delete-project-btn") { return; }

        const projectID = element.id;
        const projectIdx = this.getProjectIndexFromID(projectID);

        // delete project from projects[]
        this.projects.splice(projectIdx, 1);

        // delete UI content
        new DeleteProjectTab(projectID, projectIdx);
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


    // opening a project onto content from the sidebar
    openProjectContent(event) {
        const element = event.target;
        // exits function if element is not a project-btn
        if(element.className !== "project-btn") { return; }

        const projectID = element.id;
        const projectIdx = this.getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            new OpenProjectContent(this.projects[projectIdx]);
        }

        // click Add a Todo item on content -> open a todo creation menu underneath button
        const addTodoBtn = document.querySelector("#add-todo-btn");
        addTodoBtn.addEventListener("click", this.addTodoBtnClick.bind(this));

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
        const todoPriority = document.querySelector("#todo-priority-input").value;
        const todoDueDate = document.querySelector("#todo-duedate-input").value;
        const todoDescription = document.querySelector("#todo-description-input").value;
        const newTodo = new Todo(todoName, todoDueDate, todoPriority, todoDescription);

        // get current project
        const projID = document.querySelector("#project-title").classList[0];
        const projIdx = this.getProjectIndexFromID(projID);

        // add to project object list
        this.projects[projIdx].addTodo(newTodo);

        // add to UI
        new CreateTodoItem(newTodo);
    }


    // adding project tab to projects list on sidebar
    addProject(proj) {
        this.projects.push(proj);
        this.addProjectTab(proj);
    }
    addProjectTab(proj) {
        new CreateProjectTab(proj);
    }


    // useful little auxillary func
    getProjectIndexFromID(inputID) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id == inputID) {
                return i;
            }
        }
        return -1;
    }
    
}
new Controller();
