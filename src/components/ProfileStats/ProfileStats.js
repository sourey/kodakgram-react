import React, { Component } from "react";
import { Row, Col, message, Skeleton } from "antd";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL } from "../../utils/Constants";
import { withRouter } from "react-router-dom";
import StatModal from "./StatModal";

class ProfileStats extends Component {
  state = {
    stats: {},
    followersModalVisible: false,
    followingModalVisible: false,
    modalVisible: false,
    modalData: [],
    title: "",
    buttonDisabled: false,
    modalDataLoading: true,
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

  handleOnCancel = () => {
    this.setState({
      modalVisible: false,
      modalData: [],
      modalDataLoading: true,
    });
  };

  getFollowing = () => {
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
    axiosPost(URL.getFollowing, param, (response) => {
      this.setState({ modalData: response.data, modalDataLoading: false });
    });
  };

  getFollowers = () => {
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
    axiosPost(URL.getFollowers, param, (response) => {
      this.setState({ modalData: response.data, modalDataLoading: false });
    });
  };

  handleModalVisible = () => {
    this.setState({ modalVisible: false });
  };

  handleFollow = (followingId) => {
    if (this.state.buttonDisabled === false) {
      this.setState({ buttonDisabled: true }, () => {
        axiosPost(URL.follow, { followingId }, (response) => {
          if (response.status === 200) {
            let following = JSON.parse(localStorage.getItem("following"));
            following.push(followingId);
            localStorage.setItem("following", JSON.stringify(following));
            let newStats = { ...this.state.stats };
            newStats.numberOfFollowing += 1;
            this.setState({ stats: newStats, buttonDisabled: false });
            message.success("followed");
          }
        });
      });
    }
  };

  handleUnFollow = (followingId) => {
    if (this.state.buttonDisabled === false) {
      this.setState({ buttonDisabled: true }, () => {
        axiosPost(URL.unfollow, { followingId }, (response) => {
          if (response.status === 200) {
            let following = JSON.parse(localStorage.getItem("following"));
            following = following.filter((id) => id !== followingId);
            localStorage.setItem("following", JSON.stringify(following));
            let newStats = { ...this.state.stats };
            newStats.numberOfFollowing -= 1;
            this.setState({ stats: newStats, buttonDisabled: false });
            message.success("unfollowed");
          }
        });
      });
    }
  };

  render() {
    return (
      <Row style={{ marginLeft: "20px", marginTop: "25px" }}>
        {Object.keys(this.state.stats).length === 0 ? (
          <Skeleton
            paragraph={{ rows: 0 }}
            active={true}
            title={{ width: "350px" }}
          />
        ) : (
          <>
            <Col md={8}>{this.state.stats?.numberOfPosts} posts</Col>
            <Col
              md={8}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.getFollowing();
                this.setState({ modalVisible: true, title: "Following" });
              }}
            >
              {this.state.stats?.numberOfFollowing} following
            </Col>
            <Col
              md={8}
              onClick={() => {
                this.getFollowers();
                this.setState({ modalVisible: true, title: "Followers" });
              }}
              style={{ cursor: "pointer" }}
            >
              {this.state.stats?.numberOfFollowers} followers
            </Col>
          </>
        )}
        <StatModal
          modalDataLoading={this.state.modalDataLoading}
          handleOnCancel={this.handleOnCancel}
          modalVisible={this.state.modalVisible}
          title={this.state.title}
          modalData={this.state.modalData}
          handleUnFollow={this.handleUnFollow}
          handleFollow={this.handleFollow}
          buttonDisabled={this.state.buttonDisabled}
          handleModalVisible={this.handleModalVisible}
        />
      </Row>
    );
  }
}

export default withRouter(ProfileStats);
