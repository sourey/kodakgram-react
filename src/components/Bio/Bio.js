import React, { Component } from "react";
import { Row, Col } from "antd";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Woman from "../../assets/images/woman.jpg";

class Bio extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <Row>
            <Col md={18} style={{ marginTop: "5px", padding: "5px 5px" }}>
              <Avatar
                size={128}
                className="profile-picture"
                src={Woman}
              ></Avatar>
              <Row>
                <Col md={24} className="name">
                  {this.props.name}
                </Col>
              </Row>
              <Row>
                <Col md={24} className="bio">
                  the world from my rose-tinted glasses 🌌
                </Col>
              </Row>
            </Col>
            <Col md={6} style={{ marginTop: "5px", padding: "5px 5px" }}>
              <Button
                type="primary"
                icon={<UserOutlined />}
                shape="round"
                className="follow-button"
              >
                Follow
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={6}></Col>
      </Row>
    );
  }
}

export default Bio;
