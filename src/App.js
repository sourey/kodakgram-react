import React, { Component, Suspense } from "react";
import Signup from "./components/Auth/Signup";
import { Route, Switch } from "react-router-dom";
import { axiosPost } from "./utils/AxiosApi";
import { URL } from "./utils/Constants";
import Feed from "./components/Feed/Feed";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
//import Profile from "./components/Profile/Profile";
import NotFound from "./components/Notfound/Notfound";
import Navbar from "./components/Navbar/Navbar";
import { message, Row, Col } from "antd";

const Profile = React.lazy(() => import("./components/Profile/Profile"));

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
        following: [],
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
        following: [],
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
    axiosPost(
      URL.login,
      param,
      (response) => {
        if (response.status === 200) {
          debugger;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.message);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem(
            "profilePictureUrl",
            response.data.profilePictureUrl
          );
          localStorage.setItem(
            "following",
            JSON.stringify(response.data.following)
          );
          this.setState(
            {
              user: response.data.message,
            },
            () => {
              this.setState({
                isLogging: false,
                isLoggedIn: true,
              });
            }
          );
        }
      },
      (error) => {
        this.setState({ isLogging: false }, () => {
          message.error("Password incorrect.");
        });
      }
    );
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
      <Row>
        {this.state.isLoggedIn ? (
          <Col md={24}>
            <Navbar />
          </Col>
        ) : null}
        <Col
          md={24}
          style={{ marginTop: this.state.isLoggedIn ? "50px" : "0px" }}
        >
          <Switch>
            <PrivateRoute
              authed={this.state.isLoggedIn}
              user={this.state.user}
              path="/feed"
              component={Feed}
            />
            <Route
              exact
              path="/"
              render={(props) =>
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
            <Suspense fallback={<div>loading...</div>}>
              <PrivateRoute
                authed={this.state.isLoggedIn}
                user={this.state.user}
                following={this.state.following}
                path="/profile/:username"
                component={Profile}
              />
            </Suspense>

            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </Col>
      </Row>
    );
  }
}

export default App;
