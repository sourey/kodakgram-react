import React, { Component } from "react";
import Signup from "./components/Auth/Signup";
import { Route, Switch } from "react-router-dom";
import { axiosPost } from "./utils/AxiosApi";
import { URL } from "./utils/Constants";
import Feed from "./components/Feed/Feed";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/Notfound/Notfound";

class App extends Component {
  constructor() {
    super();
    let token = localStorage.getItem("token");
    if (token) {
      this.state = {
        user: localStorage.getItem("user") || null,
        name: "",
        username: "",
        email: "",
        password: "",
        isLogging: false,
        isLoggedIn: true,
      };
    } else {
      this.state = {
        user: localStorage.getItem("user") || null,
        name: "",
        username: "",
        email: "",
        password: "",
        isLogging: false,
        isLoggedIn: false,
      };
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ isLogging: true });
    const param = {
      username: this.state.username,
      password: this.state.password,
    };
    axiosPost(URL.login, param, (response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.message);
        this.setState({
          user: response.data.message,
          isLogging: false,
          isLoggedIn: true,
        });
      }
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Switch>
        <PrivateRoute
          authed={this.state.isLoggedIn}
          user={this.state.user}
          path="/profile"
          component={Profile}
        />
        <PrivateRoute
          authed={this.state.isLoggedIn}
          user={this.state.user}
          path="/feed"
          component={Feed}
        />
        <Route
          exact
          path="/"
          render={() =>
            this.state.isLoggedIn === false ? (
              <Signup
                handleLogin={this.handleLogin}
                handleChange={this.handleChange}
                isLogging={this.state.isLogging}
              />
            ) : (
              <Feed user={this.state.user} />
            )
          }
        />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    );
  }
}

export default App;
