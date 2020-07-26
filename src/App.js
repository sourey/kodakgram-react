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
import Navbar from "./components/Navbar/Navbar";
import { message } from "antd";

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
        hasSignedUp: false,
        loginForm: false,
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
        hasSignedUp: false,
        loginForm: false,
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
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("username", response.data.username);
        this.setState({
          user: response.data.message,
          isLogging: false,
          isLoggedIn: true,
        });
      }
    });
  };

  successMessage = () => {
    message.success("Signup complete. You can now login.");
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const { name, username, email, password } = this.state;
    let param = { name, username, email, password };
    axiosPost(URL.signup, param, (response) => {
      if (response.status === 200) {
        this.successMessage();
        this.setState({ loginForm: true });
      }
    });
  };

  handleLoginClick = (e) => {
    e.preventDefault();
    if (this.state.loginForm === false) {
      this.setState({ username: "", password: "", loginForm: true });
    } else {
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleGoBack = (e) => {
    this.setState({ loginForm: false, email: "", password: "", name: "" });
  };

  render() {
    return (
      <>
        {this.state.isLoggedIn ? <Navbar /> : null}
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.isLoggedIn === false ? (
                <Signup
                  handleLogin={this.handleLogin}
                  handleChange={this.handleChange}
                  handleSignUp={this.handleSignUp}
                  handleLoginClick={this.handleLoginClick}
                  handleGoBack={this.handleGoBack}
                  {...this.state}
                />
              ) : (
                <Feed user={this.state.user} />
              )
            }
          />
          <PrivateRoute
            authed={this.state.isLoggedIn}
            user={this.state.user}
            path="/profile:username?"
            component={Profile}
          />
          <PrivateRoute
            authed={this.state.isLoggedIn}
            user={this.state.user}
            path="/feed"
            component={Feed}
          />

          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </>
    );
  }
}

export default App;
