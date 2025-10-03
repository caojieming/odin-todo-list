import { format } from "date-fns";

import "./styles.css";
import { Project } from "./project.js";
import { ProjectContent } from "./project-content.js";
import { CreateProject } from "./create-project.js";
import { ProjectSidebar } from "./project-sidebar.js";

/*
Ideas:
overall hierarchy will go: project -> section -> (todo) item
projects contain sections, sections contain items

projects will be displayed on the left side of the screen (using a grid or something)
sections + items will be displayed on the middle/right sides of the screen
*/

/*
Todo list, roughly in order:
- coding adding projects in Controller()
- removing projects
- adding and removing todo
*/

class Controller {

    sidebarDiv = document.querySelector("#sidebar");

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

        this.sidebarDiv.addEventListener("click", this.openProjectContent.bind(this));

        const createProjectBtn = document.querySelector("#create-project-btn");
        createProjectBtn.addEventListener("click", this.createProject.bind(this));

        
    }


    // opening the project creation UI onto content
    createProject() {
        new CreateProject();
    }


    // opening a project onto content from the sidebar
    openProjectContent(event) {
        const element = event.target;
        const projectID = element.id;
        const projectIdx = this.getProjectIndexFromID(projectID);

        if(projectIdx != -1) {
            new ProjectContent(this.projects[projectIdx]);
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


    // adding project tab to projects list on sidebar
    addProject(proj) {
        this.projects.push(proj);
        this.addProjectTab(proj);
    }
    addProjectTab(proj) {
        new ProjectSidebar(proj);
    }


    /* For reference
    const toDelete = document.querySelectorAll("#table tr:not(:first-child)");
    const table = document.querySelector("#table");
    const entry = document.createElement("tr");
    entry.classList.add("entry");
    id.textContent = idStr;
    status.appendChild(statusText);
    myPara.setAttribute("id", "id_you_like");
    */
    
}
new Controller();
