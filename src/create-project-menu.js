export const CreateProjectMenu = class CreateProjectMenu {

    contentDiv = document.querySelector("#content");

    constructor() {
        // this module is purely for setting up the UI, functions/interactions will all still be in index.js

        // reset content section
        this.contentDiv.textContent = "";

        // title header
        const titleHeader = document.createElement("p");
        titleHeader.setAttribute("id", "project-title-header");
        titleHeader.textContent = "Name of project:";
        this.contentDiv.appendChild(titleHeader);
        // title input
        const titleInput = document.createElement("input");
        titleInput.setAttribute("id", "project-title-input");
        titleInput.setAttribute("placeholder", "project title");
        this.contentDiv.appendChild(titleInput);

        // description header
        const descriptionHeader = document.createElement("p");
        descriptionHeader.setAttribute("id", "project-description-header");
        descriptionHeader.textContent = "Description of project:";
        this.contentDiv.appendChild(descriptionHeader);
        // description input
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("id", "project-description-input");
        descriptionInput.setAttribute("placeholder", "project description");
        this.contentDiv.appendChild(descriptionInput);

        // finish button
        const finishBtn = document.createElement("button");
        finishBtn.setAttribute("id", "finish-project-btn");
        finishBtn.textContent = "Create Project!";
        this.contentDiv.appendChild(finishBtn);
    }

}
