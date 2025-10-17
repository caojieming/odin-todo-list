export const CreateTodoMenu = class CreateTodoMenu {

    addTodoDiv = document.querySelector("#add-todo-div");

    constructor() {
        // turn the add todo item button into a cancel button
        const addTodoBtn = document.querySelector("#add-todo-btn");
        addTodoBtn.textContent = "Cancel creating new Todo";


        // name header
        const nameHeader = document.createElement("p");
        nameHeader.setAttribute("id", "todo-name-header");
        nameHeader.textContent = "Task Name: ";
        this.addTodoDiv.appendChild(nameHeader);
        // name input
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "todo-name-input");
        nameInput.setAttribute("placeholder", "todo name");
        this.addTodoDiv.appendChild(nameInput);

        // due date header
        const dueDateHeader = document.createElement("p");
        dueDateHeader.setAttribute("id", "todo-duedate-header");
        dueDateHeader.textContent = "Due Date (both Date and Time required): ";
        this.addTodoDiv.appendChild(dueDateHeader);
        // due date input
        const dueDateInput = document.createElement("input");
        dueDateInput.setAttribute("id", "todo-duedate-input");
        dueDateInput.setAttribute("type", "datetime-local");
        dueDateInput.value = this.defaultDueDate();
        this.addTodoDiv.appendChild(dueDateInput);

        // priority header
        const priorityHeader = document.createElement("p");
        priorityHeader.setAttribute("id", "todo-priority-header");
        priorityHeader.textContent = "Priority: ";
        this.addTodoDiv.appendChild(priorityHeader);
        // priority select
        const prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("id", "todo-priority-select");
        prioritySelect.setAttribute("name", "priority-level");
        this.addTodoDiv.appendChild(prioritySelect);
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

    // default duedate value
    defaultDueDate() {
        const localDate = new Date();
        // remove second/millisecond since it's not needed
        localDate.setSeconds(null);
        localDate.setMilliseconds(null);
        return localDate.toISOString().slice(0, -1);
    }

}
