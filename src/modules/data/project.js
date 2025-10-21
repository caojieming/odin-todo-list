import { Todo } from "./todo.js";

export const Project = class Project {
    
    constructor(title, description) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.description = description;
        this.todoList = [];
    }

    addTodo(todoItem) {
        this.todoList.push(todoItem);
    }

};
