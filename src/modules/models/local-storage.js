import { projectList } from "./project";


// loads storedProjects into projectList
export function loadStorage() {
    const storedProjects = JSON.parse(localStorage.getItem("storedProjects"));

    // empty out projectList
    while(projectList.length !== 0) {
        projectList.pop();
    }

    // push storedProjects values into projectList
    for(let i = 0; i < storedProjects.length; i++) {
        projectList.push(storedProjects[i]);
    }
}


// saves projectList to storage as storedProjects
export function saveToStorage() {
    localStorage.setItem("storedProjects", JSON.stringify(projectList));
}


// returns true if local storage is supported
export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}
