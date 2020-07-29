import React, { Component } from "react";
import "./Navbar.css";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};

  renderMenu = () => {
    return (
      <Menu
        style={{
          backgroundColor: "#376e6f",
          marginTop: "13px",
          borderRadius: "2px",
        }}
      >
        <Menu.Item className="menu-item">
          <Link
            to={{
              pathname: `/profile/${localStorage.getItem("username")}`,
              state: {
                userId: localStorage.getItem("userId"),
              },
            }}
            className="menu-item"
          >
            Profile
            <UserOutlined style={{ marginLeft: "10px", fontSize: "14px" }} />
          </Link>
        </Menu.Item>
        <Menu.Item className="menu-item">
          <span
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
            <LogoutOutlined style={{ marginLeft: "10px", fontSize: "14px" }} />
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <div className="navbar">
        <Row>
          <Col md={8}>
            <img
              src="https://img.icons8.com/plasticine/50/000000/camera.png"
              alt="logo"
              style={{ marginLeft: "100px" }}
            />
            <span className="logo-text">KodakGram</span>
          </Col>
          <Col md={8}></Col>
          <Col md={8}>
            <span className="nav-profile">
              <Row>
                <Col md={8} style={{ marginRight: "15px" }}>
                  <Link to="/feed" className="menu-item">
                    <HomeOutlined
                      style={{
                        fontSize: "24px",
                        marginRight: "20px",
                        marginTop: "6px",
                        color: "white",
                      }}
                      className="hover-icon"
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Dropdown overlay={this.renderMenu()}>
                    <UserOutlined
                      style={{
                        fontSize: "24px",
                        marginRight: "20px",
                        marginTop: "6px",
                        color: "white",
                      }}
                      className="hover-icon"
                    />
                    {/* </a> */}
                  </Dropdown>
                </Col>
                <Col md={8}></Col>
              </Row>
            </span>
          </Col>
        </Row>
        {/* <div className="navbar-logo"></div> */}
      </div>
    );
  }
}

export default Navbar;
