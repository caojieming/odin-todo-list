import { Project } from "./project";

export const ProjectSidebar = class ProjectSidebar {

    projectsDiv = document.querySelector("#projects");

    constructor(project) {
        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");
        projectTab.setAttribute("id", project.id);
        projectTab.textContent = project.title;
        this.projectsDiv.appendChild(projectTab);
    }
    
}
