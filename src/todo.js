export const Todo = class Todo {
    
    constructor(title, dueDate, priority, description) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
    }

};
