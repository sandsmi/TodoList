import React from 'react';
import { TodoListHelper } from './todoListHelper';
var update = require('react-addons-update');

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = { todos: [], visible: [], showDone: true };
    this.handleChange = this.handleChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.todoListHelper = new TodoListHelper();
  }

  componentDidMount() {
    let initialTodos = this.todoListHelper.getInitialToDos();
    this.setState({ todos: initialTodos, visible: initialTodos, showDone: true });
  }

  handleChange(event) {
    const target = event.target;
    const property = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      todos: update(this.state.todos, { 1: { [property]: { $set: value } } })
    });
  }

  deleteElement(index) {
    const todos = this.state.toDos.filter(function (e, i) {
        return i !== index;
      });

    this.setState({
      toDos: todos, visible: todos
    });
  }

  toggleVisible() {
    const showDone = !this.state.showDone;
    let todos = this.todoListHelper.getVisibleTodos(this.state.toDos, showDone);
    this.setState({ showDone: showDone, visible: todos });
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <p>Add TODO</p>
          <p onClick={this.toggleVisible}>Hide Done</p>
          <p onClick={this.sortByName}>SORT BY NAME</p>
        </div>
        <div className="todo-list">
          <ul>
            {
              this.state.visible.map((item, index) =>
                <li key={index}>
                  <span>{item.Task}</span>
                  <input name="Done" type="checkbox" className="checkbox-round" checked={item.Done} onChange={this.handleChange}></input>
                  <button onClick={this.deleteElement.bind(this, index)}>delete</button>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;