import React, { Component } from "react";
import { Row, Col, Avatar, Button, message } from "antd";
import { URL, server } from "../../utils/Constants";
import { axiosPost } from "./../../utils/AxiosApi";
import { Link } from "react-router-dom";

class Followers extends Component {
  state = { users: [] };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axiosPost(URL.getAllUsers, {}, (response) => {
      this.setState({ users: response.data.users });
    });
  };

  handleFollow = (followingId) => {
    let param = {
      followingId,
    };
    axiosPost(URL.follow, param, (response) => {
      if (response.status === 200) {
        this.setState({
          users: this.state.users.filter((user) => user.userId !== followingId),
        });
        message.success("followed");
      }
    });
  };

  render() {
    return (
      <Row
        style={{
          marginTop: "65px",
        }}
      >
        <Col>
          <strong>Suggestions:</strong>
          {this.state.users.map((user) => (
            <Row style={{ padding: "2px 2px", marginTop: "5px" }}>
              <Col md={18}>
                <Link
                  to={{
                    pathname: `/profile/${user.username}`,
                  }}
                >
                  <Avatar
                    size={50}
                    style={{ color: "#f56a00", backgroundColor: "#376e6f" }}
                    src={`${server}/files/${user.profilePictureUrl}`}
                  />
                  <span style={{ marginTop: "13px", marginLeft: "5px" }}>
                    <strong>{user.username}</strong>
                  </span>
                </Link>
              </Col>

              <Col md={6}>
                <Button
                  className="follow-button"
                  shape="round"
                  type="primary"
                  style={{ marginLeft: "10px", marginTop: "7px" }}
                  onClick={() => this.handleFollow(user.userId)}
                >
                  Follow
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  }
}

export default Followers;
