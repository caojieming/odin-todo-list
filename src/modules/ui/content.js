const contentDiv = document.querySelector("#content");


export function openProjectContentUI(project) {
    // reset content section
    contentDiv.textContent = "";

    // project title
    const title = document.createElement("p");
    title.setAttribute("id", "project-title");
    title.classList.add(project.id);
    title.textContent = project.title;
    contentDiv.appendChild(title);

    // project description
    const description = document.createElement("p");
    description.setAttribute("id", "project-description");
    description.textContent = project.description;
    contentDiv.appendChild(description);

    // button to add todo item, container div first (so todo creation menu can be attached later), add button second
    const addTodoDiv = document.createElement("div");
    addTodoDiv.setAttribute("id", "add-todo-div");
    contentDiv.appendChild(addTodoDiv);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.setAttribute("id", "add-todo-btn");
    addTodoBtn.textContent = "Add a Todo item";
    addTodoDiv.appendChild(addTodoBtn);

    // add all todos, creating a container div that CreateTodoItem can put them in
    const todoList = project.todoList
    const todoListDiv = document.createElement("div");
    todoListDiv.setAttribute("id", "todo-list-div");
    contentDiv.appendChild(todoListDiv);
    for(let i = 0; i < todoList.length; i++) {
        createTodoItemUI(todoList[i]);
    }
}


export function createTodoItemUI(todo) {
    const todoListDiv = document.querySelector("#todo-list-div");

    // todo container div
    const todoDiv = document.createElement("p");
    todoDiv.classList.add("todo-div");
    todoDiv.setAttribute("id", todo.id);
    todoListDiv.appendChild(todoDiv);

    // todo title
    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoDiv.appendChild(todoTitle);
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
    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.textContent = "Priority: " + priorityValMap.get(todo.priority);
    todoPriority.setAttribute("style", "color: " + priorityColorMap.get(todo.priority));
    todoDiv.appendChild(todoPriority);

    // set todoTitleStar color to priority color
    todoTitleStar.setAttribute("style", "color: " + priorityColorMap.get(todo.priority));

    // todo description
    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description");
    todoDescription.textContent = todo.description;
    todoDiv.appendChild(todoDescription);

    // todo edit button
    const todoEditBtn = document.createElement("button");
    todoEditBtn.classList.add("todo-edit-btn");
    todoEditBtn.textContent = "Edit";
    todoDiv.appendChild(todoEditBtn);

    // todo delete button
    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo-delete-btn");
    todoDeleteBtn.textContent = "Delete";
    todoDiv.appendChild(todoDeleteBtn);


    // make everything under duedate hidden (start out collapsed)
    todoPriority.style.display = "none";
    todoDescription.style.display = "none";
    todoEditBtn.style.display = "none";
    todoDeleteBtn.style.display = "none";
    

    // click title of todo item -> expand to reveal more details
    todoTitle.addEventListener("click", expandCollapseTodo);
    // PROBLEM: clicking on todoTitle(p > span) triggers this event listener sinces spans are part of todoTitle(p), but the event is set to todoTitle(p > span) instead of todoTitle(p), which causes issues when finding parentNode in expandCollapseTodo


    // eventListener function
    function expandCollapseTodo() {
        // const element = event.currentTarget;
        // const todoDiv = element.parentNode;
        /*
        DEPRECATED, but still good to know information:
        If you clicked on a child of the element with an eventListener:
            .target would give the child element, the actual "target" of the click
            .currentTarget would give the the parent element (the element with an eventListener), the "current target" of the eventListener
        */

        // get expandable/collapsable elements
        const priority = todoDiv.querySelector(".todo-priority");
        const description = todoDiv.querySelector(".todo-description");
        const editBtn = todoDiv.querySelector(".todo-edit-btn");
        const deleteBtn = todoDiv.querySelector(".todo-delete-btn");

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

    return todoDiv;
}


export function createTodoMenuUI() {
    const addTodoDiv = document.querySelector("#add-todo-div");

    // turn the add todo item button into a cancel button
    const addTodoBtn = document.querySelector("#add-todo-btn");
    addTodoBtn.textContent = "Cancel creating new Todo";

    // name header
    const nameHeader = document.createElement("p");
    nameHeader.setAttribute("id", "todo-name-header");
    nameHeader.textContent = "Task Name: ";
    addTodoDiv.appendChild(nameHeader);
    // name input
    const nameInput = document.createElement("input");
    nameInput.setAttribute("id", "todo-name-input");
    nameInput.setAttribute("placeholder", "todo name");
    addTodoDiv.appendChild(nameInput);

    // due date header
    const dueDateHeader = document.createElement("p");
    dueDateHeader.setAttribute("id", "todo-duedate-header");
    dueDateHeader.textContent = "Due Date (both Date and Time required): ";
    addTodoDiv.appendChild(dueDateHeader);
    // due date input
    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("id", "todo-duedate-input");
    dueDateInput.setAttribute("type", "datetime-local");
    dueDateInput.value = defaultDueDate();
    addTodoDiv.appendChild(dueDateInput);

    // priority header
    const priorityHeader = document.createElement("p");
    priorityHeader.setAttribute("id", "todo-priority-header");
    priorityHeader.textContent = "Priority: ";
    addTodoDiv.appendChild(priorityHeader);
    // priority select
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "todo-priority-select");
    prioritySelect.setAttribute("name", "priority-level");
    addTodoDiv.appendChild(prioritySelect);
    // (priority dropdown options)
    const priorityLow = document.createElement("option");
    priorityLow.setAttribute("id", "priority-low");
    priorityLow.setAttribute("value", "1");
    priorityLow.textContent = "Low";
    prioritySelect.appendChild(priorityLow);
    const priorityMiddle = document.createElement("option");
    priorityMiddle.setAttribute("id", "priority-middle");
    priorityMiddle.setAttribute("value", "2");
    priorityMiddle.textContent = "Middle";
    prioritySelect.appendChild(priorityMiddle);
    const priorityHigh = document.createElement("option");
    priorityHigh.setAttribute("id", "priority-high");
    priorityHigh.setAttribute("value", "3");
    priorityHigh.textContent = "High";
    prioritySelect.appendChild(priorityHigh);

    // description header
    const descriptionHeader = document.createElement("p");
    descriptionHeader.setAttribute("id", "todo-description-header");
    descriptionHeader.textContent = "Description: ";
    addTodoDiv.appendChild(descriptionHeader);
    // description input
    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("id", "todo-description-input");
    descriptionInput.setAttribute("placeholder", "description");
    addTodoDiv.appendChild(descriptionInput);

    // button to confirm and create todo item
    const createTodoBtn = document.createElement("button");
    createTodoBtn.setAttribute("id", "create-todo-btn");
    createTodoBtn.textContent = "Create Todo Item";
    addTodoDiv.appendChild(createTodoBtn);
        

    // default duedate value
    function defaultDueDate() {
        const localDate = new Date();
        // remove second/millisecond since it's not needed
        localDate.setSeconds(null);
        localDate.setMilliseconds(null);
        return localDate.toISOString().slice(0, -1);
    }

}


export function deleteTodoItemUI(todoIdx) {
    const todoListDiv = document.querySelector("#todo-list-div");

    // remove from UI
    removeChildAtIndex(todoListDiv, todoIdx);
    

    function removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }

}


export function editTodoMenuUI() {

}
