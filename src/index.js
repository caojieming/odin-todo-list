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

    projectsDiv = document.querySelector("#projects");
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

        // remove from UI
        this.removeChildAtIndex(this.projectsDiv, projectIdx);
        
        // also reset content if project was just deleted
        const currContentTitle = document.querySelector(".project-title");
        if(currContentTitle.id === projectID) {
            this.contentDiv.textContent = '';
        }
    }
    removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }



    // opening the project creation UI onto content
    createProject() {
        new CreateProject();

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
