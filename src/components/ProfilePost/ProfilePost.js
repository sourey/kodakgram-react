import React, { Component } from "react";
import { Row, Col } from "antd";
import Man1 from "../../assets/images/man1.jpg";
import Woman2 from "../../assets/images/woman2.jpg";
import Woman3 from "../../assets/images/woman3.jpg";

class ProfilePost extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col md={4}></Col>
        <Col md={16} style={{ marginTop: "5px", padding: "5px 5px" }}>
          <Row style={{ marginBottom: "15px" }}>
            <Col md={8}>
              <img src={Man1} height="300" width="280" />
            </Col>
            <Col md={8}>
              <img src={Woman3} height="300" width="280" />
            </Col>
            <Col md={8}>
              <img src={Woman2} height="300" width="280" />
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col md={8}>
              <img src={Man1} height="300" width="280" />
            </Col>
            <Col md={8}>
              <img src={Woman3} height="300" width="280" />
            </Col>
            <Col md={8}>
              <img src={Woman2} height="300" width="280" />
            </Col>
          </Row>
        </Col>
        <Col md={4}></Col>
      </Row>
    );
  }
}

export default ProfilePost;
