import React, { Component } from "react";
import { Modal, Skeleton, Row, Col, Avatar, Button } from "antd";
import { axiosPost } from "../../utils/AxiosApi";
import { URL, server } from "../../utils/Constants";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  CheckOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

class LikesModal extends Component {
  state = {
    likers: [],
    likersDataLoading: true,
  };

  componentDidMount() {
    this.getPostLikers();
  }

  getPostLikers = () => {
    const param = {
      postId: this.props.openPostId,
      userId: this.props.openPostUserId,
    };
    axiosPost(URL.getPostLikers, param, (response) => {
      this.setState({ likers: response.data.likers, likersDataLoading: false });
    });
  };

  render() {
    return (
      <Row>
        <Col md={24}>
          <Modal
            title={"Likes"}
            centered
            visible={this.props.modalVisible}
            footer={null}
            onCancel={this.props.handleOnCancel}
            width={400}
          >
            <Row>
              <Col
                md={24}
                style={{
                  overflowY: "scroll",
                  height: "450px",
                }}
              >
                {this.state.likers.map((liker) => (
                  <Row
                    style={{
                      padding: "5px 5px",
                      marginBottom: "5px",
                    }}
                  >
                    <Col md={3}>
                      <Link
                        to={{
                          pathname: `/profile/${liker.username}`,
                        }}
                        onClick={this.props.handleModalVisible}
                      >
                        {liker.profilePictureUrl !== "" ? (
                          <Avatar
                            src={`${server}/files/${liker?.profilePictureUrl}`}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <Avatar
                            icon={<UserOutlined />}
                            size={37}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#376e6f",
                            }}
                          />
                        )}
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Link
                        to={{
                          pathname: `/profile/${liker.username}`,
                        }}
                        onClick={this.props.handleModalVisible}
                      >
                        <span
                          style={{
                            marginLeft: "15px",
                            fontSize: "16px",
                            display: "flex",
                            marginTop: "3px",
                          }}
                        >
                          <strong>{liker.username}</strong>
                        </span>
                      </Link>
                    </Col>
                    {liker.userId === localStorage.getItem("userId") ? null : (
                      <Col md={8}>
                        {localStorage
                          .getItem("following")
                          .indexOf(liker.userId) !== -1 ? (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#376e6f",
                              borderColor: "#376e6f",
                            }}
                            icon={<CheckOutlined />}
                            shape="round"
                            disabled={this.props.buttonDisabled}
                            onClick={() =>
                              this.props.handleUnFollow(liker.userId)
                            }
                          >
                            Following
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#376e6f",
                              borderColor: "#376e6f",
                            }}
                            icon={<UserAddOutlined />}
                            shape="round"
                            disabled={this.props.buttonDisabled}
                            onClick={() =>
                              this.props.handleFollow(liker.userId)
                            }
                          >
                            Follow
                          </Button>
                        )}
                      </Col>
                    )}
                    <Col md={1}></Col>
                  </Row>
                ))}
                <Skeleton
                  avatar
                  paragraph={{ rows: 0 }}
                  active={true}
                  title={{ width: "250px" }}
                  loading={this.state.likersDataLoading}
                />
              </Col>
            </Row>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default LikesModal;
