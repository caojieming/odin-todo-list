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

        // todo priority
        const todoPriority = document.createElement("div");
        todoPriority.classList.add("project-todo-description");
        todoPriority.textContent = "Priority: " + todo.priority;
        todoDiv.appendChild(todoPriority);

        // todo due date
        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("project-todo-description");
        todoDueDate.textContent = "Due date: " + todo.dueDate;
        todoDiv.appendChild(todoDueDate);

        // todo description
        const todoDescription = document.createElement("div");
        todoDescription.classList.add("project-todo-description");
        todoDescription.textContent = todo.description;
        todoDiv.appendChild(todoDescription);
    }

};
