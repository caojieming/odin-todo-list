import { Project } from "./project";

export const ProjectSidebar = class ProjectSidebar {

    projectsDiv = document.querySelector("#projects");

    constructor(project) {
        const projectTab = document.createElement("div");
        projectTab.classList.add("project-tab");
        projectTab.setAttribute("id", project.id);
        this.projectsDiv.appendChild(projectTab);
        
        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project-btn");
        deleteBtn.setAttribute("id", project.id);
        deleteBtn.textContent = "Delete";
        projectTab.appendChild(deleteBtn);

        // project tab
        const projectBtn = document.createElement("button");
        projectBtn.classList.add("project-btn");
        projectBtn.setAttribute("id", project.id);
        projectBtn.textContent = project.title;
        projectTab.appendChild(projectBtn);
    }

}
