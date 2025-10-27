import { openProjectContent, deleteProject, confirmProjectCreation } from "../controller";


const projectsDiv = document.querySelector("#projects");
const contentDiv = document.querySelector("#content");


export function createProjectMenuView() {
    // reset content section
    contentDiv.textContent = "";

    // title header
    const titleHeader = document.createElement("p");
    titleHeader.setAttribute("id", "project-title-header");
    titleHeader.textContent = "Name of project:";
    contentDiv.appendChild(titleHeader);
    // title input
    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "project-title-input");
    titleInput.setAttribute("placeholder", "project title");
    contentDiv.appendChild(titleInput);

    // description header
    const descriptionHeader = document.createElement("p");
    descriptionHeader.setAttribute("id", "project-description-header");
    descriptionHeader.textContent = "Description of project:";
    contentDiv.appendChild(descriptionHeader);
    // description input
    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("id", "project-description-input");
    descriptionInput.setAttribute("placeholder", "project description");
    contentDiv.appendChild(descriptionInput);

    // finish button
    const finishBtn = document.createElement("button");
    finishBtn.setAttribute("id", "finish-project-btn");
    finishBtn.textContent = "Create Project!";
    finishBtn.addEventListener("click", confirmProjectCreation);
    contentDiv.appendChild(finishBtn);
}


export function createProjectTabView(project) {
    // create project tab div
    const projectTab = document.createElement("div");
    projectTab.classList.add("project-tab");
    projectTab.setAttribute("id", project.id);
    projectsDiv.appendChild(projectTab);
    
    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-btn");
    deleteBtn.textContent = "Delete";
    // click delete button -> removes project from projectList model and view
    deleteBtn.addEventListener('click', deleteProject);
    projectTab.appendChild(deleteBtn);

    // project button
    const projectBtn = document.createElement("button");
    projectBtn.classList.add("project-btn");
    projectBtn.textContent = project.title;
    // click project button -> open project details in content view
    projectBtn.addEventListener('click', openProjectContent);
    projectTab.appendChild(projectBtn);
}


export function editProjectSidebarView(projectIdx, newTitle) {
    // projectsDiv    -> project tab div        -> project button
    projectsDiv.children.item(projectIdx).children.item(1).textContent = newTitle;
}


export function deleteProjectTabView(projectID, projectIdx) {
    // remove from View
    removeChildAtIndex(projectsDiv, projectIdx);

    // also reset content if project was just deleted
    const curContentTitle = document.querySelector("#project-details-div");
    if(curContentTitle != null && curContentTitle.classList.contains(projectID)) {
        contentDiv.textContent = '';
    }
}
// helper function
function removeChildAtIndex(parentElement, index) {
    const children = parentElement.children;
    if(children.length > 0) {
        parentElement.removeChild(children[index]);
    }
}
