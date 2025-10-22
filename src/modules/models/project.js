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


// list of all projects, cannot be directly accessed, can only be accessed through functions
const projectList = [];


export function getProjectIndexFromID(inputID) {
    for(let i = 0; i < projectList.length; i++) {
        if(projectList[i].id === inputID) {
            return i;
        }
    }
    return -1;
}

export function getTodoIndexFromID(project, todoID) {
    for(let i = 0; i < project.todoList.length; i++) {
        if(project.todoList[i].id === todoID) {
            return i;
        }
    }
    return -1;
}

export function getProjectFromList(projectIdx) {
    return projectList[projectIdx];
}

export function addProjectToListModel(project) {
    projectList.push(project);
}

export function removeProjectFromListModel(projectIdx) {
    projectList.splice(projectIdx, 1);
}

export function addTodoToProject(projectIdx, todo) {
    projectList[projectIdx].addTodo(todo);
}

export function removeTodoFromProject(projectIdx, todoIdx) {
    const projectTodoList = projectList[projectIdx].todoList;
    projectTodoList.splice(todoIdx, 1);
}

export function getSampleProjects() {
    const sampleList = [];
    
    const firstProject = new Project("First project", "This is the first project.");
    const p1task1 = new Todo("task 1", "2014-01-12T00:00", "3", "look at enemy");
    const p1task2 = new Todo("task 2", "2016-02-19T00:00", "1", "panic roll");
    const p1task3 = new Todo("task 3", "2019-12-31T00:00", "2", "get hit anyways");
    firstProject.addTodo(p1task1);
    firstProject.addTodo(p1task2);
    firstProject.addTodo(p1task3);

    sampleList.push(firstProject);

    const secondProject = new Project("Second project", "This is the second project. Yippee!");
    const p2task1 = new Todo("task 1", "2014-01-12T00:00", "2", "curl into a ball");
    const p2task2 = new Todo("task 2", "2016-02-19T00:00", "1", "try not to cry");
    const p2task3 = new Todo("task 3", "2019-12-31T00:00", "3", "cry");
    secondProject.addTodo(p2task1);
    secondProject.addTodo(p2task2);
    secondProject.addTodo(p2task3);
    
    sampleList.push(secondProject);

    return sampleList;
}
