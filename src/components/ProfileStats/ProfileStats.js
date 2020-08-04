import React, { Component } from "react";
import { Row, Col } from "antd";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL } from "../../utils/Constants";
import { withRouter } from "react-router-dom";

class ProfileStats extends Component {
  state = {
    stats: {},
  };

  componentDidMount() {
    let param;
    if (this.props?.location?.state?.userId) {
      param = {
        userId: this.props.location.state.userId,
      };
    } else if (this.props?.match?.params?.username) {
      param = {
        userId: this.props.userId,
      };
    } else {
      param = {
        userId: localStorage.getItem("userId"),
      };
    }
    axiosPost(URL.getProfileStats, param, (response) => {
      if (response.status === 200) {
        this.setState({ stats: response.data.stat });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      axiosPost(
        URL.getProfileStats,
        {
          userId: this.props.userId,
        },
        (response) => {
          if (response.status === 200) {
            this.setState({ stats: response.data.stat });
          }
        }
      );
    }
  }

  render() {
    return (
      <Row style={{ marginLeft: "20px", marginTop: "25px" }}>
        <Col md={8}>{this.state.stats?.numberOfPosts} posts</Col>
        <Col md={8}>{this.state.stats?.numberOfFollowing} following</Col>
        <Col md={8}>{this.state.stats?.numberOfFollowers} followers</Col>
      </Row>
    );
  }
}

export default withRouter(ProfileStats);
