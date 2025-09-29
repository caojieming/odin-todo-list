import { Todo } from "./todo.js";

export const Project = class Project {
    
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todos = [];
    }

};
