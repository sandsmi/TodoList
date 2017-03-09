import React from 'react';
import { TodoListHelper } from './todoListHelper';
import InlineEdit from 'react-edit-inline';
var update = require('react-addons-update');

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = { todos: [], visible: [], showDone: true, asc: true };
    this.handleChange = this.handleChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByStatus = this.sortByStatus.bind(this);
    this.todoListHelper = new TodoListHelper();
  }

  componentDidMount() {
    let initialTodos = this.todoListHelper.getInitialTodos();
    this.setState({ todos: initialTodos, visible: initialTodos });
  }

  handleChange(event) {
    const target = event.target;
    const property = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    var newState = update(this.state.todos, { [target.id]: { [property]: { $set: value } } });
    this.setState({ todos: newState, visible: newState });
  }

  deleteElement(index) {
    const todos = this.state.todos.filter(function (e, i) {
      return i !== index;
    });

    this.setState({
      todos: todos, visible: todos
    });
  }

  toggleVisible() {
    const showDone = !this.state.showDone;
    let todos = this.todoListHelper.getVisibleTodos(this.state.todos, showDone);
    this.setState({ showDone: showDone, visible: todos });
  }

  sortByName() {
    let newState = this.todoListHelper.sortByName(this.state.todos, this.state.asc);
    this.setState(newState);
  }

  sortByStatus() {
    let newState = this.todoListHelper.sortByStatus(this.state.todos, this.state.asc);
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="sidebar-item">
            <span className="sidebar-option">ADD TODO</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-option" onClick={this.toggleVisible}>HIDE DONE</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-option" onClick={this.sortByName}>SORT BY NAME</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-option" onClick={this.sortByStatus}>SORT BY STATUS</span>
          </div>
        </div>
        <div className="todo-list">
          <ul>
            {
              this.state.visible.map((item, index) =>
                <li key={index}>
                  <InlineEdit
                    text={item.Task}
                    paramName="Task"
                    change={this.handleChange}
                    />
                  <div className="pull-right">
                    <input id={index} name="Done" type="checkbox" className="checkbox-round" checked={item.Done} onChange={this.handleChange}></input>
                    <button className="delete-btn" onClick={this.deleteElement.bind(this, index)}>delete</button>
                  </div>
                </li>
              )
            }
          </ul>
          <p>Click a TODO to edit it</p>
        </div>
      </div>
    );
  }
}

export default TodoList;