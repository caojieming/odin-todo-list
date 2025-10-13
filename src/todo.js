export const Todo = class Todo {
    
    constructor(name, dueDate, priority, description) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
    }

};
