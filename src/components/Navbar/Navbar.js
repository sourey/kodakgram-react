import React, { Component } from "react";
import "./Navbar.css";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Notification from "./Notification";

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
        <Menu.Item
          className="menu-item"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <span>
            Logout
            <LogoutOutlined style={{ marginLeft: "10px", fontSize: "14px" }} />
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <Row className="navbar">
        <Col md={8}>
          <Link to="/">
            <img
              src="https://img.icons8.com/plasticine/50/000000/camera.png"
              alt="logo"
              style={{ marginLeft: "100px" }}
            />
            <span className="logo-text">KodakGram</span>
          </Link>
        </Col>
        <Col md={4}></Col>
        <Col md={12}>
          <span className="nav-profile">
            <Row>
              <Col md={8} style={{ marginRight: "12px" }}>
                <Notification />
              </Col>
              <Col md={8} style={{ marginRight: "10px" }}>
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
              <Col md={4}>
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
                </Dropdown>
              </Col>
            </Row>
          </span>
        </Col>
      </Row>
    );
  }
}

export default Navbar;
