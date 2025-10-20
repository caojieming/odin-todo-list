import { format } from "date-fns";

export const CreateTodoItem = class CreateTodoItem {

    todoListDiv = document.querySelector("#todo-list-div");

    constructor(todo) {
        // todo container div
        this.todoDiv = document.createElement("p");
        this.todoDiv.classList.add("todo-div");
        this.todoDiv.setAttribute("id", todo.id);
        this.todoListDiv.appendChild(this.todoDiv);

        // todo title
        const todoTitle = document.createElement("p");
        todoTitle.classList.add("todo-title");
        this.todoDiv.appendChild(todoTitle);
        const todoTitleStar = document.createElement("span");
        todoTitleStar.textContent = '* ';
        todoTitle.appendChild(todoTitleStar);
        const todoTitleText = document.createElement("span");
        todoTitleText.textContent = todo.title;
        todoTitle.appendChild(todoTitleText);
        

        // todo due date
        const todoDueDate = document.createElement("p");
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
        this.todoDiv.appendChild(todoDueDate);

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
        const todoPriority = document.createElement("p");
        todoPriority.classList.add("todo-priority");
        todoPriority.textContent = "Priority: " + priorityValMap.get(todo.priority);
        todoPriority.setAttribute("style", "color: " + priorityColorMap.get(todo.priority));
        this.todoDiv.appendChild(todoPriority);

        // set todoTitleStar color to priority color
        todoTitleStar.setAttribute("style", "color: " + priorityColorMap.get(todo.priority));

        // todo description
        const todoDescription = document.createElement("p");
        todoDescription.classList.add("todo-description");
        todoDescription.textContent = todo.description;
        this.todoDiv.appendChild(todoDescription);

        // todo edit button
        const todoEditBtn = document.createElement("button");
        todoEditBtn.classList.add("todo-edit-btn");
        todoEditBtn.textContent = "Edit";
        this.todoDiv.appendChild(todoEditBtn);

        // todo delete button
        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.classList.add("todo-delete-btn");
        todoDeleteBtn.textContent = "Delete";
        this.todoDiv.appendChild(todoDeleteBtn);


        // make everything under duedate hidden (start out collapsed)
        todoPriority.style.display = "none";
        todoDescription.style.display = "none";
        todoEditBtn.style.display = "none";
        todoDeleteBtn.style.display = "none";
        

        // click title of todo item -> expand to reveal more details
        todoTitle.addEventListener("click", this.expandCollapseTodo.bind(this));
        // PROBLEM: clicking on todoTitle(p > span) triggers this event listener sinces spans are part of todoTitle(p), but the event is set to todoTitle(p > span) instead of todoTitle(p), which causes issues when finding parentNode in expandCollapseTodo
    }

    expandCollapseTodo() {
        // const element = event.currentTarget;
        // const todoDiv = element.parentNode;
        /*
        DEPRECATED, but still good to know information:
        If you clicked on a child of the element with an eventListener:
            .target would give the child element, the actual "target" of the click
            .currentTarget would give the the parent element (the element with an eventListener), the "current target" of the eventListener
        */

        // get expandable/collapsable elements
        const priority = this.todoDiv.querySelector(".todo-priority");
        const description = this.todoDiv.querySelector(".todo-description");
        const editBtn = this.todoDiv.querySelector(".todo-edit-btn");
        const deleteBtn = this.todoDiv.querySelector(".todo-delete-btn");

        // if visible -> hide
        if(priority.checkVisibility() == true) {
            priority.style.display = "none";
            description.style.display = "none";
            editBtn.style.display = "none";
            deleteBtn.style.display = "none";
        }
        // if hidden -> make visible
        else { 
            priority.style.display = "block";
            description.style.display = "block";
            editBtn.style.display = "block";
            deleteBtn.style.display = "block";
        }
    }

};
