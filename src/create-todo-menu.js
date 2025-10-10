export const CreateTodoMenu = class CreateTodoMenu {

    addTodoDiv = document.querySelector("#add-todo-div");

    constructor() {
        // turn the add todo item button into a cancel button
        const addTodoBtn = document.querySelector("#add-todo-btn");
        addTodoBtn.textContent = "Cancel creating new Todo";



        // name header
        const nameHeader = document.createElement("div");
        nameHeader.setAttribute("id", "todo-name-header");
        nameHeader.textContent = "Task Name: ";
        this.addTodoDiv.appendChild(nameHeader);
        // name input
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "todo-name-input");
        nameInput.setAttribute("placeholder", "todo name");
        this.addTodoDiv.appendChild(nameInput);

        // priority header
        const priorityHeader = document.createElement("div");
        priorityHeader.setAttribute("id", "todo-priority-header");
        priorityHeader.textContent = "Priority: ";
        this.addTodoDiv.appendChild(priorityHeader);
        // priority input
        const priorityInput = document.createElement("input");
        priorityInput.setAttribute("id", "todo-priority-input");
        priorityInput.setAttribute("placeholder", "priority");
        this.addTodoDiv.appendChild(priorityInput);

        // due date header
        const dueDateHeader = document.createElement("div");
        dueDateHeader.setAttribute("id", "todo-duedate-header");
        dueDateHeader.textContent = "Due Date: ";
        this.addTodoDiv.appendChild(dueDateHeader);
        // due date input
        const dueDateInput = document.createElement("input");
        dueDateInput.setAttribute("id", "todo-duedate-input");
        dueDateInput.setAttribute("placeholder", "MM/dd/yyyy");
        this.addTodoDiv.appendChild(dueDateInput);

        // description header
        const descriptionHeader = document.createElement("div");
        descriptionHeader.setAttribute("id", "todo-description-header");
        descriptionHeader.textContent = "Description: ";
        this.addTodoDiv.appendChild(descriptionHeader);
        // description input
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("id", "todo-description-input");
        descriptionInput.setAttribute("placeholder", "description");
        this.addTodoDiv.appendChild(descriptionInput);

        // button to confirm and create todo item
        const createTodoBtn = document.createElement("button");
        createTodoBtn.setAttribute("id", "create-todo-btn");
        createTodoBtn.textContent = "Create Todo Item";
        this.addTodoDiv.appendChild(createTodoBtn);
        
    }

}
