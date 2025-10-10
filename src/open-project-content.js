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
            todoTitle.textContent = todoList[i].name;
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
