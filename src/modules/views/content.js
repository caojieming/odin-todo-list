import { deleteTodo, confirmCreateTodo, confirmEditTodo } from "../controller";


const contentDiv = document.querySelector("#content");


export function openProjectContentView(project) {
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
    // click Add a Todo item on content -> open a todo creation menu underneath button
    addTodoBtn.addEventListener("click", addTodoBtnClick);
    addTodoDiv.appendChild(addTodoBtn);

    // add all todos, creating a container div that CreateTodoItem can put them in
    const todoList = project.todoList
    const todoListDiv = document.createElement("div");
    todoListDiv.setAttribute("id", "todo-list-div");
    contentDiv.appendChild(todoListDiv);
    for(let i = 0; i < todoList.length; i++) {
        createTodoItemView(todoList[i]);
    }
}


export function createTodoItemView(todo) {
    const todoListDiv = document.querySelector("#todo-list-div");

    // todo container div
    const todoDiv = document.createElement("p");
    todoDiv.setAttribute("id", todo.id);
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
    todoDueDate.classList.add("todo-dueDate");
    const date = new Date(todo.dueDate);
    todoDueDate.classList.add(todo.dueDate); // store dueDate string as a class
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
    todoPriority.classList.add(todo.priority); // store priority val in classList
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
    // click todo edit button -> edit todo in project's todoList and update View
    todoEditBtn.addEventListener('click', editTodoMenuView);
    todoDiv.appendChild(todoEditBtn);

    // todo delete button
    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo-delete-btn");
    todoDeleteBtn.textContent = "Delete";
    // click todo delete button -> delete todo from project's todoList and remove from View
    todoDeleteBtn.addEventListener('click', deleteTodo);
    todoDiv.appendChild(todoDeleteBtn);


    // make everything under dueDate hidden (start out collapsed)
    todoPriority.style.display = "none";
    todoDescription.style.display = "none";
    todoEditBtn.style.display = "none";
    todoDeleteBtn.style.display = "none";
    

    // click title of todo item -> expand to reveal more details
    todoTitle.addEventListener("click", expandCollapseTodo);
}
// event function, doesn't need access to model, so it's declared here
function expandCollapseTodo(event) {
    const element = event.currentTarget;
    const todoDiv = element.parentNode;
    /*
    Good to know information:
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


// event function, doesn't need to access model, so declared here
export function addTodoBtnClick() {
    const addTodoBtn = document.querySelector("#add-todo-btn");

    if(addTodoBtn.textContent === "Add a Todo item") {
        // generate the todo creation menu underneath the button (a separate function because it's large, it's just below this function)
        createTodoMenuView();
    }
    else if(addTodoBtn.textContent === "Cancel creating new Todo") {
        // remove all but the first child in #add-todo-div (which is #add-todo-btn)
        const addTodoDiv = document.querySelector("#add-todo-div");
        while(addTodoDiv.childNodes.length > 1) {
            addTodoDiv.removeChild(addTodoDiv.lastChild);
        }
        // set its text back to normal
        addTodoBtn.textContent = "Add a Todo item";
    }
}
// part of above function
function createTodoMenuView() {
    const addTodoDiv = document.querySelector("#add-todo-div");

    // turn the add todo item button into a cancel button
    const addTodoBtn = document.querySelector("#add-todo-btn");
    addTodoBtn.textContent = "Cancel creating new Todo";

    // title header
    const titleHeader = document.createElement("p");
    titleHeader.setAttribute("id", "todo-title-header");
    titleHeader.textContent = "Task Name: ";
    addTodoDiv.appendChild(titleHeader);
    // title input
    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "todo-title-input");
    titleInput.setAttribute("placeholder", "todo title");
    addTodoDiv.appendChild(titleInput);

    // due date header
    const dueDateHeader = document.createElement("p");
    dueDateHeader.setAttribute("id", "todo-dueDate-header");
    dueDateHeader.textContent = "Due Date (both Date and Time required): ";
    addTodoDiv.appendChild(dueDateHeader);
    // due date input
    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("id", "todo-dueDate-input");
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
    // click Create Todo Item button -> add a todo object to current project and add it to View
    createTodoBtn.addEventListener("click", confirmCreateTodo);
    addTodoDiv.appendChild(createTodoBtn);

    // default dueDate value
    function defaultDueDate() {
        const localDate = new Date();
        // remove second/millisecond since it's not needed
        localDate.setSeconds(null);
        localDate.setMilliseconds(null);
        return localDate.toISOString().slice(0, -1);
    }
}


export function deleteTodoItemView(todoIdx) {
    const todoListDiv = document.querySelector("#todo-list-div");

    // remove from View
    removeChildAtIndex(todoListDiv, todoIdx);
    
    function removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }
}


export function editTodoMenuView(event) {
    // replace todoDiv elements with createTodoMenu elements, but they already have values (previous values)
    const element = event.currentTarget;
    const todoDiv = element.parentNode;

    // store all current todo values
    const todoTitle = todoDiv.querySelector(".todo-title").textContent.replace("* ", ''); // remove "* "
    const todoDueDate = todoDiv.querySelector(".todo-dueDate").classList[1]; // string date stored in classList
    const todoPriority = todoDiv.querySelector(".todo-priority").classList[1]; // priority val stored in classList
    const todoDescription = todoDiv.querySelector(".todo-description").textContent;

    // reset todoDiv contents for edit menu
    todoDiv.textContent = '';

    // title header
    const titleHeader = document.createElement("p");
    // titleHeader.setAttribute("id", "edit-todo-title-header");
    titleHeader.classList.add("edit-todo-title-header");
    titleHeader.textContent = "Task Name: ";
    todoDiv.appendChild(titleHeader);
    // title input
    const titleInput = document.createElement("input");
    // titleInput.setAttribute("id", "edit-todo-title-input");
    titleInput.classList.add("edit-todo-title-input");
    titleInput.value = todoTitle;
    todoDiv.appendChild(titleInput);

    // due date header
    const dueDateHeader = document.createElement("p");
    // dueDateHeader.setAttribute("id", "edit-todo-dueDate-header");
    dueDateHeader.classList.add("edit-todo-dueDate-header");
    dueDateHeader.textContent = "Due Date (both Date and Time required): ";
    todoDiv.appendChild(dueDateHeader);
    // due date input
    const dueDateInput = document.createElement("input");
    // dueDateInput.setAttribute("id", "edit-todo-dueDate-input");
    dueDateInput.classList.add("edit-todo-dueDate-input");
    dueDateInput.setAttribute("type", "datetime-local");
    dueDateInput.value = todoDueDate;
    todoDiv.appendChild(dueDateInput);

    // priority header
    const priorityHeader = document.createElement("p");
    // priorityHeader.setAttribute("id", "edit-todo-priority-header");
    priorityHeader.classList.add("edit-todo-priority-header");
    priorityHeader.textContent = "Priority: ";
    todoDiv.appendChild(priorityHeader);
    // priority select
    const prioritySelect = document.createElement("select");
    // prioritySelect.setAttribute("id", "edit-todo-priority-select");
    prioritySelect.classList.add("edit-todo-priority-select");
    prioritySelect.setAttribute("name", "priority-level");
    todoDiv.appendChild(prioritySelect);
    // (priority dropdown options)
    const priorityLow = document.createElement("option");
    // priorityLow.setAttribute("id", "edit-priority-low");
    priorityLow.classList.add("edit-priority-low");
    priorityLow.setAttribute("value", "1");
    priorityLow.textContent = "Low";
    prioritySelect.appendChild(priorityLow);
    const priorityMiddle = document.createElement("option");
    // priorityMiddle.setAttribute("id", "edit-priority-middle");
    priorityMiddle.classList.add("edit-priority-middle");
    priorityMiddle.setAttribute("value", "2");
    priorityMiddle.textContent = "Middle";
    prioritySelect.appendChild(priorityMiddle);
    const priorityHigh = document.createElement("option");
    // priorityHigh.setAttribute("id", "edit-priority-high");
    priorityHigh.classList.add("edit-priority-high");
    priorityHigh.setAttribute("value", "3");
    priorityHigh.textContent = "High";
    prioritySelect.appendChild(priorityHigh);
    // set initial value
    if(todoPriority === '1') {
        priorityLow.setAttribute("selected", '');
    }
    else if(todoPriority === '2') {
        priorityMiddle.setAttribute("selected", '');
    }
    else if(todoPriority === '3') {
        priorityHigh.setAttribute("selected", '');
    }

    // description header
    const descriptionHeader = document.createElement("p");
    // descriptionHeader.setAttribute("id", "edit-todo-description-header");
    descriptionHeader.classList.add("edit-todo-description-header");
    descriptionHeader.textContent = "Description: ";
    todoDiv.appendChild(descriptionHeader);
    // description input
    const descriptionInput = document.createElement("input");
    // descriptionInput.setAttribute("id", "edit-todo-description-input");
    descriptionInput.classList.add("edit-todo-description-input");
    descriptionInput.value = todoDescription;
    todoDiv.appendChild(descriptionInput);

    // button to confirm and create todo item
    const confirmEditTodoBtn = document.createElement("button");
    // confirmEditTodoBtn.setAttribute("id", "confirm-edit-todo-btn");
    confirmEditTodoBtn.classList.add("confirm-edit-todo-btn");
    confirmEditTodoBtn.textContent = "Confirm Changes";
    // click Create Todo Item button -> add a todo object to current project and add it to View
    confirmEditTodoBtn.addEventListener("click", confirmEditTodo);
    todoDiv.appendChild(confirmEditTodoBtn);
}


export function editTodoItemView(todoIdx, todo) {
    const todoListDiv = document.querySelector("#todo-list-div");
    const todoDivs = todoListDiv.children;
    const todoDiv = todoDivs[todoIdx];

    // reset todoDiv (remove editTodoMenu)
    todoDiv.textContent = '';

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
    todoDueDate.classList.add("todo-dueDate");
    const date = new Date(todo.dueDate);
    todoDueDate.classList.add(todo.dueDate); // store dueDate string as a class
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
    todoPriority.classList.add(todo.priority); // store priority val in classList
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
    // click todo edit button -> edit todo in project's todoList and update View
    todoEditBtn.addEventListener('click', editTodoMenuView);
    todoDiv.appendChild(todoEditBtn);

    // todo delete button
    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo-delete-btn");
    todoDeleteBtn.textContent = "Delete";
    // click todo delete button -> delete todo from project's todoList and remove from View
    todoDeleteBtn.addEventListener('click', deleteTodo);
    todoDiv.appendChild(todoDeleteBtn);


    // make everything under dueDate hidden (start out collapsed)
    todoPriority.style.display = "none";
    todoDescription.style.display = "none";
    todoEditBtn.style.display = "none";
    todoDeleteBtn.style.display = "none";
    

    // click title of todo item -> expand to reveal more details
    todoTitle.addEventListener("click", expandCollapseTodo);
}
