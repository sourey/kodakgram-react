import React, { Component } from "react";
import { Row, Col } from "antd";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL } from "../../utils/Constants";

class ProfileStats extends Component {
  state = {
    stats: {},
  };

  componentDidMount() {
    axiosPost(URL.getProfileStats, {}, (response) => {
      if (response.status === 200) {
        this.setState({ stats: response.data.stat });
      }
    });
  }
  render() {
    return (
      <Row style={{ marginLeft: "20px", marginTop: "25px" }}>
        <Col md={8}>{this.state.stats?.numberOfPosts} posts</Col>
        <Col md={8}>{this.state.stats?.numberOfFollowing} following</Col>
        <Col md={8}>0 followers</Col>
      </Row>
    );
  }
}

export default ProfileStats;
