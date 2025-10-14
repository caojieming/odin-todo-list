import { CreateTodoItem } from "./create-todo-item.js";
import { Project } from "./project.js";

export const OpenProjectContent = class OpenProjectContent {
    
    contentDiv = document.querySelector("#content");

    constructor(project) {
        // reset content section
        this.contentDiv.textContent = "";

        // project title
        const title = document.createElement("div");
        title.setAttribute("id", "project-title");
        title.classList.add(project.id);
        title.textContent = project.title;
        this.contentDiv.appendChild(title);

        // project description
        const description = document.createElement("div");
        description.setAttribute("id", "project-description");
        description.textContent = project.description;
        this.contentDiv.appendChild(description);

        // button to add todo item, container div first (so todo creation menu can be attached later), add button second, menu div third
        const addTodoDiv = document.createElement("div");
        addTodoDiv.setAttribute("id", "add-todo-div");
        this.contentDiv.appendChild(addTodoDiv);

        const addTodoBtn = document.createElement("button");
        addTodoBtn.setAttribute("id", "add-todo-btn");
        addTodoBtn.textContent = "Add a Todo item";
        addTodoDiv.appendChild(addTodoBtn);


        // add all todos, creating a container div that CreateTodoItem can put them in
        const todoList = project.todoList
        const todoListDiv = document.createElement("div");
        todoListDiv.setAttribute("id", "todo-list-div");
        this.contentDiv.appendChild(todoListDiv);
        for(let i = 0; i < todoList.length; i++) {
            new CreateTodoItem(todoList[i]);
        }
        
    }

};
