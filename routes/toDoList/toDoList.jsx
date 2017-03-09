import React from 'react';
import { TodoListHelper } from './todoListHelper';
var update = require('react-addons-update');

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = { todos: [], visible: [], showDone: true };
    this.handleChange = this.handleChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByStatus = this.sortByStatus.bind(this);
    this.todoListHelper = new TodoListHelper();
  }

  componentDidMount() {
    let initialTodos = this.todoListHelper.getInitialTodos();
    this.setState({ todos: initialTodos, visible: initialTodos, showDone: true });
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
    let sortedTodos = this.todoListHelper.sortByName(this.state.todos);
    this.setState({ visible: sortedTodos });
  }

  sortByStatus() {
    let sortedTodos = this.todoListHelper.sortByStatus(this.state.todos);
    this.setState({ visible: sortedTodos });
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <p>ADD TODO</p>
          <p onClick={this.toggleVisible}>HIDE DONE</p>
          <p onClick={this.sortByName}>SORT BY NAME</p>
          <p onClick={this.sortByStatus}>SORT BY STATUS</p>
        </div>
        <div className="todo-list">
          <ul>
            {
              this.state.visible.map((item, index) =>
                <li key={index}>
                  <span>{item.Task}</span>
                  <input id={index} name="Done" type="checkbox" className="checkbox-round" checked={item.Done} onChange={this.handleChange}></input>
                  <button className="delete-btn" onClick={this.deleteElement.bind(this, index)}>delete</button>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;