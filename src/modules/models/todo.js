export const Todo = class Todo {
    
    constructor(title, dueDate, priority, description) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }

};
