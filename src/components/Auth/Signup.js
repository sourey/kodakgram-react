import React, { Component } from "react";
import "./Signup.css";
import Button from "./../Button/Button";

class Signup extends Component {
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
            {this.props.loginForm ? "Login" : "Signup"}
          </div>
          <hr
            style={{
              borderColor: "rgb(65, 4, 65)",
              marginBottom: "18px",
            }}
          />
          <form onSubmit={this.props.handleSignUp}>
            {this.props.loginForm ? null : (
              <div className="form-element">
                <input
                  type="text"
                  name="name"
                  value={this.props.name}
                  placeholder="name"
                  onChange={this.props.handleChange}
                />
              </div>
            )}
            <div className="form-element">
              <input
                type="text"
                name="username"
                value={this.props.username}
                placeholder="username"
                onChange={this.props.handleChange}
              />
            </div>
            {this.props.loginForm ? null : (
              <div className="form-element">
                <input
                  type="email"
                  name="email"
                  value={this.props.email}
                  placeholder="email"
                  onChange={this.props.handleChange}
                />
              </div>
            )}
            <div className="form-element">
              <input
                type="password"
                name="password"
                value={this.props.password}
                placeholder="password"
                onChange={this.props.handleChange}
              />
            </div>
            {this.props.loginForm ? null : (
              <div className="signup">
                <Button text="SignUp" type="submit" />
              </div>
            )}
            <div className="signup">
              {this.props.loginForm ? null : (
                <div style={{ marginTop: "20px" }}>Already SignedUp?</div>
              )}
              <div style={{ marginTop: "10px" }}>
                <Button
                  text={
                    this.props.isLogging ? (
                      <div className="loader"></div>
                    ) : (
                      "Login"
                    )
                  }
                  onClick={
                    !this.props.loginForm
                      ? this.props.handleLoginClick
                      : (e) => this.props.handleLogin(e)
                  }
                />
              </div>
              {this.props.loginForm ? (
                <div
                  style={{
                    marginTop: "45px",
                    marginRight: "5px",
                    float: "right",
                  }}
                >
                  <Button
                    text="Go Back"
                    onClick={this.props.handleGoBack}
                    disabled={this.props.isLogging}
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
