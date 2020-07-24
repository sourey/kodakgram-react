import React, { Component } from "react";
import "./Signup.css";
import Button from "./../Button/Button";

class Signup extends Component {
  state = { loginForm: false };

  handleLoginClick = (e) => {
    e.preventDefault();
    if (this.state.loginForm === false) {
      this.setState({ loginForm: true });
    } else {
    }
  };

  render() {
    return (
      <div className="login-page">
        <div className="logo">
          <img
            src="https://img.icons8.com/plasticine/200/000000/camera.png"
            alt="logo"
          />
          <div className="logo-title">KodakGram</div>
        </div>
        <div className="form-container">
          <div className="form-title">
            {this.state.loginForm ? "Login" : "Signup"}
          </div>
          <hr
            style={{
              borderColor: "rgb(65, 4, 65)",
              marginBottom: "18px",
            }}
          />
          <form>
            {this.state.loginForm ? null : (
              <div className="form-element">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={this.props.handleChange}
                />
              </div>
            )}
            <div className="form-element">
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={this.props.handleChange}
              />
            </div>
            {this.state.loginForm ? null : (
              <div className="form-element">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={this.props.handleChange}
                />
              </div>
            )}
            <div className="form-element">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.props.handleChange}
              />
            </div>
            {this.state.loginForm ? null : (
              <div className="signup">
                <Button text="SignUp" />
              </div>
            )}
            <div className="signup">
              {this.state.loginForm ? null : (
                <div style={{ marginTop: "20px" }}>Already SignedUp?</div>
              )}
              <div style={{ marginTop: "10px" }}>
                <Button
                  text={
                    this.props.isLogging ? <div class="loader"></div> : "Login"
                  }
                  onClick={
                    !this.state.loginForm
                      ? this.handleLoginClick
                      : (e) => this.props.handleLogin(e)
                  }
                />
              </div>
              {this.state.loginForm ? (
                <div
                  style={{
                    marginTop: "45px",
                    marginRight: "5px",
                    float: "right",
                  }}
                >
                  <Button
                    text="Go Back"
                    onClick={(e) => {
                      this.setState({ loginForm: false });
                    }}
                    disabled={this.state.isLogging}
                  />
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
