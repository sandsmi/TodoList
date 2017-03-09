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

    sortByName(todos) {
        todos.sort(function (a, b) {
            if (a.Task < b.Task) return -1;
            if (a.Task > b.Task) return 1;
            return 0;
        });
        return todos;
    }

    sortByStatus(todos) {
        todos.sort(function (a, b) {
            return b.Done - a.Done;
        });
        return todos;
    }
}