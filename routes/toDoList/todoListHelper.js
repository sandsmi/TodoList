export class TodoListHelper {
    constructor() {
        this.initialTodos = [
            { Task: "Write code", Done: true },
            { Task: "Write tests", Done: false },
            { Task: "Run unit testing", Done: true },
            { Task: "Deploy to production", Done: false }
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