import { Todo } from "./todo.js";

export const Project = class Project {
    
    constructor(title, description) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.description = description;
        this.todos = [];
    }

    addTodo(title, description, duedate, priority) {
        this.todos.push(new Todo(title, description, duedate, priority));
    }

};
