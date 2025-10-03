import { Project } from "./project.js";

export const ProjectContent = class ProjectContent {
    
    contentDiv = document.querySelector("#content");

    constructor(project) {
        // reset content section
        this.contentDiv.textContent = "";

        // project title
        const title = document.createElement("div");
        title.classList.add("project-title");
        title.setAttribute("id", project.id);
        title.textContent = project.title;
        this.contentDiv.appendChild(title);

        // project description
        const description = document.createElement("div");
        description.classList.add("project-description");
        description.textContent = project.description;
        this.contentDiv.appendChild(description);

        // add all todos
        const todoList = project.todos
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

            // todo priority
            const todoPriority = document.createElement("div");
            todoPriority.classList.add("project-todo-description");
            todoPriority.textContent = "Priority: " + todoList[i].priority;
            todoDiv.appendChild(todoPriority);

            // todo due date
            const todoDueDate = document.createElement("div");
            todoDueDate.classList.add("project-todo-description");
            todoDueDate.textContent = "Due date: " + todoList[i].dueDate;
            todoDiv.appendChild(todoDueDate);

            // todo description
            const todoDescription = document.createElement("div");
            todoDescription.classList.add("project-todo-description");
            todoDescription.textContent = todoList[i].description;
            todoDiv.appendChild(todoDescription);
        }
        
    }

};
