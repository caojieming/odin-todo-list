import "./styles.css";
import { Project } from "./project.js";
import { format } from "date-fns";

/*
Ideas:
overall hierarchy will go: project -> section -> (todo) item
projects contain sections, sections contain items

projects will be displayed on the left side of the screen (using a grid or something)
sections + items will be displayed on the middle/right sides of the screen
*/

class Controller {

    sidebarDiv = document.querySelector("#sidebar");
    contentDiv = document.querySelector("#content");

    constructor() {
        this.projects = [];
        const firstProject = new Project("First project", "This is the first project.");
        firstProject.addTodo("task 1", "look at enemy", format(new Date(2014, 1, 11), "MM/dd/yyyy"), 10);
        firstProject.addTodo("task 2", "panic roll", format(new Date(2016, 2, 19), "MM/dd/yyyy"), 3);
        firstProject.addTodo("task 3", "get hit anyways", format(new Date(2019, 12, 31), "MM/dd/yyyy"), 7);

        this.addProject(firstProject);

        const secondProject = new Project("Second project", "This is the second project. Yippee!");
        secondProject.addTodo("task 1", "curl into a ball", format(new Date(2014, 1, 11), "MM/dd/yyyy"), 10);
        secondProject.addTodo("task 2", "try not to cry", format(new Date(2016, 2, 19), "MM/dd/yyyy"), 3);
        secondProject.addTodo("task 3", "cry", format(new Date(2019, 12, 31), "MM/dd/yyyy"), 7);
        
        this.addProject(secondProject);

        this.sidebarDiv.addEventListener("click", this.openProjectTab.bind(this));

        
    }


    openProjectTab(event) {
        const element = event.target;
        const projectID = element.id;

        const projectIdx = this.getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            const curProject = this.projects[projectIdx];

            // reset content section
            this.contentDiv.textContent = "";

            // project title
            const title = document.createElement("div");
            title.classList.add("project-title");
            title.setAttribute("id", curProject.id);
            title.textContent = curProject.title;
            this.contentDiv.appendChild(title);

            // project description
            const description = document.createElement("div");
            description.classList.add("project-description");
            description.textContent = curProject.description;
            this.contentDiv.appendChild(description);

            // add all todos
            const todoList = curProject.todos
            for(let i = 0; i < todoList.length; i++) {
                // todo div
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("project-todo");
                todoDiv.setAttribute("id", todoList[i].id);
                this.contentDiv.appendChild(todoDiv);

                // todo title
                const todoTitle = document.createElement("div");
                todoTitle.classList.add("project-todo-title");
                todoTitle.textContent = todoList[i].title;
                todoDiv.appendChild(todoTitle);

                // todo description
                const todoDescription = document.createElement("div");
                todoDescription.classList.add("project-todo-description");
                todoDescription.textContent = todoList[i].description;
                todoDiv.appendChild(todoDescription);

                // todo due date
                const todoDueDate = document.createElement("div");
                todoDueDate.classList.add("project-todo-description");
                todoDueDate.textContent = todoList[i].dueDate;
                todoDiv.appendChild(todoDueDate);

                // todo priority
                const todoPriority = document.createElement("div");
                todoPriority.classList.add("project-todo-description");
                todoPriority.textContent = todoList[i].priority;
                todoDiv.appendChild(todoPriority);
            }
        }
    }

    getProjectIndexFromID(inputID) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id == inputID) {
                return i;
            }
        }
        return -1;
    }

    // getTodoIndexFromID(inputProject, inputID) {
    //     const todoList = inputProject.todos;
    //     for(let i = 0; i < todoList.length; i++) {
    //         if(todoList.id == inputID) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    /* 
    const toDelete = document.querySelectorAll("#table tr:not(:first-child)");
    const table = document.querySelector("#table");
    const entry = document.createElement("tr");
    entry.classList.add("entry");
    id.textContent = idStr;
    status.appendChild(statusText);
    myPara.setAttribute("id", "id_you_like");
    */

    addProject(proj) {
        this.projects.push(proj);
        this.addUIProject(proj);
    }

    addUIProject(project) {
        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");
        projectTab.setAttribute("id", project.id);
        projectTab.textContent = project.title;
        this.sidebarDiv.appendChild(projectTab);
    }
    
}
new Controller();
