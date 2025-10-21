const sidebarDiv = document.querySelector("#sidebar");
const projectsDiv = document.querySelector("#projects");
const contentDiv = document.querySelector("#content");

export function createProjectMenuUI() {
    // this module is purely for setting up the UI, functions/interactions will be in either project.js or initialize

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
    contentDiv.appendChild(finishBtn);
}


export function createProjectTabUI(project) {
    // create project tab div
    const projectTab = document.createElement("div");
    projectTab.classList.add("project-tab");
    projectTab.setAttribute("id", project.id);
    projectsDiv.appendChild(projectTab);
    
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

    return projectTab;
}


export function deleteProjectTabUI(projectID, projectIdx) {
    // remove from UI
    removeChildAtIndex(projectsDiv, projectIdx);

    // also reset content if project was just deleted
    const currContentTitle = document.querySelector("#project-title");
    if(currContentTitle.classList.contains(projectID)) {
        contentDiv.textContent = '';
    }

    // helper function
    function removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }
}
