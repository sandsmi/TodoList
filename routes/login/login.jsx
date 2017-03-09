import React from 'react';
import { LoginHelper } from './loginHelper';
var update = require('react-addons-update');

class Login extends React.Component {
  constructor() {
    super();
    this.state = { userData: { login: "", password: "" } };
    this.loginHelper = new LoginHelper();
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    var newState = update(this.state.userData, {
      [property]: { $set: event.target.value }
    });
    this.setState({ userData: newState });
  }

  login() {
    this.loginHelper.login(this.state.userData);
  }

  render() {
    return (
      <div className="login-container">
        <form>
          <input type="text" className="login-form" name="login" value={this.state.userData.login} onChange={this.handleChange} placeholder="My Login" />
          <input type="password" className="login-form" name="password" value={this.state.userData.password} onChange={this.handleChange} placeholder="Password" />
          <button type="button" className="login-button" onClick={this.login}>LOG IN</button>
        </form>
      </div>
    );
  }
}

export default Login;