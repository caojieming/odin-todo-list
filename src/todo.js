export const Todo = class Todo {
    
    constructor(title, description, duedate, priority) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
    }

};
