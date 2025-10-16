import { format } from "date-fns";

export const CreateTodoItem = class CreateTodoItem {

    todoListDiv = document.querySelector("#todo-list-div");

    constructor(todo) {
        // todo container div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("project-todo");
        todoDiv.setAttribute("id", todo.id);
        this.todoListDiv.appendChild(todoDiv);

        // todo title
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = todo.title;
        todoDiv.appendChild(todoTitle);

        // todo due date
        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("todo-duedate");
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
        const priorityValMap = new Map([
            ['1', "Low"],
            ['2', "Middle"],
            ['3', "High"]
        ]);
        const priorityColorMap = new Map([
            ['1', "#39d400ff"],
            ['2', "#d1b800ff"],
            ['3', "#D40000FF"]
        ]);
        const todoPriority = document.createElement("div");
        todoPriority.classList.add("todo-priority");
        todoPriority.textContent = "Priority: " + priorityValMap.get(todo.priority);
        todoPriority.setAttribute("style", "color: " + priorityColorMap.get(todo.priority));
        todoDiv.appendChild(todoPriority);

        // todo description
        const todoDescription = document.createElement("div");
        todoDescription.classList.add("todo-description");
        todoDescription.textContent = todo.description;
        todoDiv.appendChild(todoDescription);

        // todo delete button
        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.classList.add("todo-delete-btn");
        todoDeleteBtn.textContent = "Delete?";
        todoDiv.appendChild(todoDeleteBtn);


        // make everything under duedate hidden (start out collapsed)
        todoPriority.style.display = "none";
        todoDescription.style.display = "none";
        todoDeleteBtn.style.display = "none";
        

        // click title of todo item -> expand to reveal more details
        todoTitle.addEventListener("click", this.expandCollapseTodo.bind(this));
    }

    expandCollapseTodo(event) {
        const element = event.target;

        // get expandable/collapsable elements
        const todoDiv = element.parentNode;
        const priorityDiv = todoDiv.querySelector(".todo-priority");
        const descriptionDiv = todoDiv.querySelector(".todo-description");
        const deleteBtn = todoDiv.querySelector(".todo-delete-btn");

        // if visible -> hide
        if(priorityDiv.checkVisibility() == true) {
            priorityDiv.style.display = "none";
            descriptionDiv.style.display = "none";
            deleteBtn.style.display = "none";
        }
        // if hidden -> make visible
        else { 
            priorityDiv.style.display = "block";
            descriptionDiv.style.display = "block";
            deleteBtn.style.display = "block";
        }
    }

};
