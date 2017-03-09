import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Login from './routes/login/login.jsx';
import TodoList from './routes/toDoList/toDoList.jsx';

export default (
    <Router history = {browserHistory}>
        <Route path='/' component={Login} />
        <Route path='/list' component={TodoList} />
    </Router>
);