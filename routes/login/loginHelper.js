import { browserHistory } from 'react-router'

export class LoginHelper {

    constructor() {
        this.user = { login: "sample", password: "1234" };
    }

    login(userData) {
        if (userData.login != this.user.login || userData.password != this.user.password) {
            alert("Wrong credentials");
            return;
        }
        browserHistory.push('/list');
    }
}