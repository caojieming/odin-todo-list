export const DeleteProjectTab = class DeleteProjectTab {
    
    projectsDiv = document.querySelector("#projects");
    contentDiv = document.querySelector("#content");

    constructor(projectID, projectIdx) {
        // remove from UI
        this.removeChildAtIndex(this.projectsDiv, projectIdx);

        // also reset content if project was just deleted
        const currContentTitle = document.querySelector("#project-title");
        if(currContentTitle.classList.contains(projectID)) {
            this.contentDiv.textContent = '';
        }
    }

    removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }

};
