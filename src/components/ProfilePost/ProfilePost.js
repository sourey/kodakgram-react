import React, { Component } from "react";
import { Row, Col, Empty } from "antd";
import { server } from "../../utils/Constants";

class ProfilePost extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col md={4}></Col>
        <Col md={16} style={{ marginTop: "5px", padding: "5px 5px" }}>
          {this.props.posts.length > 0 ? (
            <Row>
              {this.props.posts.map((post) => (
                <Col md={8} style={{ marginBottom: "15px" }} key={post.postId}>
                  <img
                    src={`${server}/files/${post.image}`}
                    height="300"
                    width="280"
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              description={"No Posts"}
              style={{ justifyContent: "center" }}
            />
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    );
  }
}

export default ProfilePost;
