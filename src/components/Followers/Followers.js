import React, { Component } from "react";
import { Row, Col, Avatar, Button, message } from "antd";
import { URL, server } from "../../utils/Constants";
import { axiosPost } from "./../../utils/AxiosApi";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

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
        let following = JSON.parse(localStorage.getItem("following"));
        following.push(followingId);
        localStorage.setItem("following", JSON.stringify(following));
        message.success("followed");
      }
    });
  };

  render() {
    return (
      <Row
        style={{
          marginTop: "65px",
          border: "1px solid #efe1e1",
          width: "270px",
          padding: "10px 10px",
          borderRadius: "5px",
        }}
      >
        <Col>
          <strong>Suggestions:</strong>
          <hr
            style={{
              marginTop: "15px",
              color: "#000",
              backgroundColor: "#efe1e1",
              border: "none",
              height: "1px",
            }}
          ></hr>
          {this.state.users.map((user) => (
            <Row style={{ padding: "2px 2px", marginTop: "5px" }}>
              <Col md={18}>
                <Link
                  to={{
                    pathname: `/profile/${user.username}`,
                  }}
                >
                  {user.profilePictureUrl ? (
                    <Avatar
                      size={50}
                      style={{ color: "#f56a00", backgroundColor: "#376e6f" }}
                      src={`${server}/files/${user.profilePictureUrl}`}
                    />
                  ) : (
                    <Avatar
                      size={50}
                      style={{ color: "white", backgroundColor: "#376e6f" }}
                      icon={<UserOutlined />}
                    />
                  )}

                  <span style={{ marginTop: "13px", marginLeft: "5px" }}>
                    <strong>{user.username}</strong>
                  </span>
                </Link>
              </Col>
              <Col md={6}>
                <Button
                  shape="round"
                  type="primary"
                  onClick={() => this.handleFollow(user.userId)}
                  style={{
                    backgroundColor: "#376e6f",
                    borderColor: "#376e6f",
                    marginLeft: "10px",
                    marginTop: "7px",
                  }}
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
