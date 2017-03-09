import React from 'react';
import { TodoListHelper } from './todoListHelper';
import { AddTodoModal } from './addTodoModal';
import InlineEdit from 'react-edit-inline';
import FaTrash from 'react-icons/lib/fa/trash';
var update = require('react-addons-update');

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = { todos: [], visible: [], showDone: true, asc: true, modalIsOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByStatus = this.sortByStatus.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addElement = this.addElement.bind(this);
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
    let newState = update(this.state.todos, { [target.id]: { [property]: { $set: value } } });
    this.setState({ todos: newState, visible: newState });
  }

  addElement() {
    let taskName = document.getElementById('newTask').value;
    let newTask = {
      Task: taskName,
      Done: false
    }
    let newList = this.state.todos.concat([newTask]);
    this.setState({ modalIsOpen: false, todos: newList, visible: newList });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
      <div className="list-container">
        <div className="sidebar">
          <div className="sidebar-item">
            <span className="sidebar-option" onClick={this.openModal}>ADD TODO</span>
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
                    className={item.Done ? "faded" : ""}
                    />
                  <div className="pull-right">
                    <input id={index} name="Done" type="checkbox" className="checkbox-round" checked={item.Done} onChange={this.handleChange}></input>
                    <button className="delete-btn" onClick={this.deleteElement.bind(this, index)}><FaTrash /></button>
                  </div>
                </li>
              )
            }
          </ul>
          <p className="faded">Click a TODO to edit it</p>
          <AddTodoModal onClose={this.closeModal} onAdd={this.addElement} showModal={this.state.modalIsOpen} />
        </div>
      </div>
    );
  }
}

export default TodoList;