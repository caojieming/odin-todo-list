export const Todo = class Todo {
    
    constructor(name, priority, dueDate, description) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

};
