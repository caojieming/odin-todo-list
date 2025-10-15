export const DeleteTodoItem = class DeleteTodoItem {
    
    todoListDiv = document.querySelector("#todo-list-div");

    constructor(todoIdx) {
        // remove from UI
        this.removeChildAtIndex(this.todoListDiv, todoIdx);
    }

    removeChildAtIndex(parentElement, index) {
        const children = parentElement.children;
        if(children.length > 0) {
            parentElement.removeChild(children[index]);
        }
    }

};
