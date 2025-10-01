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
        firstProject.addTodo("task 1", "panic roll", format(new Date(2014, 1, 11), "MM/dd/yyyy"), 10);
        
        this.projects.push(firstProject);
        this.addUIProject(firstProject);

        const projectBtns = document.querySelector(".project-tab");
        projectBtns.addEventListener("click", this.openProjectTab.bind(this));

        // next step: create 1 full project (firstProject) and display it
    }

    openProjectTab(event) {
        const element = event.target;
        const projectID = element.id;

        const projectIdx = this.getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            const curProject = this.projects[projectIdx];

            // reset content section
            this.contentDiv.textContent = "";

            // add title
            const projectTitle = document.createElement("div");
            projectTitle.classList.add("project-tab");
            projectTitle.setAttribute("id", curProject.id);
            projectTitle.textContent = curProject.title;
            this.contentDiv.appendChild(projectTitle);
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

    getTodoIndexFromID(inputProject, inputID) {
        const todoList = inputProject.todos;
        for(let i = 0; i < todoList.length; i++) {
            if(todoList.id == inputID) {
                return i;
            }
        }
        return -1;
    }

    /* 
    const toDelete = document.querySelectorAll("#table tr:not(:first-child)");
    const table = document.querySelector("#table");
    const entry = document.createElement("tr");
    entry.classList.add("entry");
    id.textContent = idStr;
    status.appendChild(statusText);
    myPara.setAttribute("id", "id_you_like");
    */

    addUIProject(project) {
        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");
        projectTab.setAttribute("id", project.id);
        projectTab.textContent = project.title;
        this.sidebarDiv.appendChild(projectTab);
    }
    
}
new Controller();
