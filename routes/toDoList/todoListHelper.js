export class TodoListHelper {
    constructor() {
        this.initialTodos = [
            { Id: 1, Task: "Write code", Done: true },
            { Id: 2, Task: "Write tests", Done: false },
            { Id: 3, Task: "Run unit testing", Done: true },
            { Id: 4, Task: "Deploy to production", Done: false }
        ]
    }

    getInitialTodos() {
        return this.initialTodos;
    }

    getVisibleTodos(todos, showDone) {
        switch (showDone) {
            case true:
                return todos
            case false:
                return todos.filter(t => !t.Done)
        }
    }

    sortByName(todos, asc) {
        todos.sort(function (a, b) {
            if (a.Task < b.Task) return asc == true ? -1 : 1;
            if (a.Task > b.Task) return asc == true ? 1 : -1;
            return 0;
        });
        return { visible: todos, asc: -asc };
    }

    sortByStatus(todos, asc) {
        todos.sort(function (a, b) {
            return asc == true ? (b.Done - a.Done) : (a.Done - b.Done);
        });
        return { visible: todos, asc: -asc };
    }
}