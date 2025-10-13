import { format } from "date-fns";

export const CreateTodoItem = class CreateTodoItem {

    contentDiv = document.querySelector("#content");

    constructor(todo) {
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("project-todo");
        todoDiv.setAttribute("id", todo.id);
        this.contentDiv.appendChild(todoDiv);

        // todo title
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("project-todo-title");
        todoTitle.textContent = todo.name;
        todoDiv.appendChild(todoTitle);

        // todo due date
        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("project-todo-description");
        const date = new Date(todo.dueDate);
        const dateFormat = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        todoDueDate.textContent = "Due date: " + date.toLocaleTimeString("en-US", dateFormat);
        todoDiv.appendChild(todoDueDate);

        // todo priority
        const todoPriority = document.createElement("div");
        todoPriority.classList.add("project-todo-description");
        todoPriority.textContent = "Priority: " + todo.priority;
        todoDiv.appendChild(todoPriority);

        // todo description
        const todoDescription = document.createElement("div");
        todoDescription.classList.add("project-todo-description");
        todoDescription.textContent = todo.description;
        todoDiv.appendChild(todoDescription);
    }

};
