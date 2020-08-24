import React, { Component } from "react";
import { Modal, Row, Col, Avatar } from "antd";
import { server, dateDiffInDays } from "../../utils/Constants";
import {
  HeartFilled,
  HeartOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LikesModal from "../Feed/LikesModal";

class ProfilePostModal extends Component {
  state = { modalVisible: false, openPostId: null, openPostUserId: null };

  handleOnCancel = () => {
    this.setState({ modalVisible: false, openPostId: null });
  };

  render() {
    return (
      <Modal
        title={null}
        centered
        visible={this.props.modalVisible}
        footer={null}
        onCancel={this.props.handleOnCancel}
        width={900}
        bodyStyle={{ padding: "0px" }}
      >
        <Row style={{ height: "500px" }}>
          <Col md={14}>
            <img
              src={`${server}/files/${this.props?.post?.image}`}
              height="500"
              width="500"
              onDoubleClick={() => {
                this.props.handleLike(
                  this.props?.post?.postId,
                  this.props?.post?.userId
                );
              }}
            />
          </Col>
          <Col md={10}>
            <Row style={{ marginLeft: "5px", marginTop: "10px" }}>
              <Col md={4}>
                {this.props?.post?.profilePictureUrl ? (
                  <Avatar
                    src={`${server}/files/${this.props?.post?.profilePictureUrl}`}
                  />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    alt={this.props?.post?.username}
                    style={{ color: "#FFFFFF", backgroundColor: "#376e6f" }}
                  />
                )}
              </Col>
              <Col md={20}>
                <Row>
                  <Col md={24}>
                    <div
                      style={{
                        marginTop: "5px",
                        marginLeft: "-15px",
                      }}
                    >
                      <strong>{this.props?.post?.username}</strong>
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        marginLeft: "-15px",
                        color: "rgb(141 142 142)",
                      }}
                    >
                      {dateDiffInDays(
                        new Date(this.props?.post?.createdAt),
                        new Date()
                      ) > 1
                        ? `${dateDiffInDays(
                            new Date(this.props?.post?.createdAt),
                            new Date()
                          )} days ago`
                        : "Today"}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr
              style={{
                marginLeft: "5px",
                marginTop: "15px",
                color: "#000",
                backgroundColor: "#efe1e1",
                border: "none",
                height: "1px",
              }}
            ></hr>
            <div
              style={{
                overflowY: "scroll",
                height: "350px",
              }}
            >
              {this.props?.post?.comments?.map((comment, idx) => (
                <Row style={{ marginLeft: "5px", marginTop: "25px" }} key={idx}>
                  <Col md={3}>
                    {comment.profilePictureUrl ? (
                      <Avatar
                        src={`${server}/files/${comment.profilePictureUrl}`}
                        alt={comment.username}
                      />
                    ) : (
                      <Avatar
                        icon={<UserOutlined />}
                        alt={comment.username}
                        style={{ color: "#FFFFFF", backgroundColor: "#376e6f" }}
                      />
                    )}
                  </Col>
                  <Col md={21} style={{ marginTop: "3px" }}>
                    <span>
                      <strong>{comment.username}</strong>
                    </span>
                    <span style={{ marginLeft: "5px" }}>{comment.comment}</span>
                  </Col>
                </Row>
              ))}
            </div>
            <hr
              style={{
                marginLeft: "5px",
                marginTop: "1px",
                color: "#000",
                backgroundColor: "#efe1e1",
                border: "none",
                height: "1px",
              }}
            ></hr>
            <div>
              {this.props?.post?.likedBy?.indexOf(
                localStorage.getItem("userId")
              ) !== -1 && this.props?.post?.likedBy !== undefined ? (
                <HeartFilled
                  style={{
                    fontSize: "20px",
                    padding: "2px 2px",
                    cursor: "pointer",
                    color: "#eb2f96",
                  }}
                  onClick={() =>
                    this.props.handleLike(
                      this.props?.post?.postId,
                      this.props?.post?.userId
                    )
                  }
                />
              ) : (
                <HeartOutlined
                  style={{
                    fontSize: "20px",
                    padding: "2px 2px",
                    cursor: "pointer",
                    color: "#eb2f96",
                  }}
                  onClick={() =>
                    this.props.handleLike(
                      this.props?.post?.postId,
                      this.props?.post?.userId
                    )
                  }
                />
              )}
              <span
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => {
                  this.props?.post?.likedBy?.length !== 0 &&
                    this.setState(
                      {
                        openPostId: this.props?.post?.postId,
                        openPostUserId: this.props?.post?.userId,
                      },
                      () => {
                        this.setState({ modalVisible: true });
                      }
                    );
                }}
              >
                {this.props?.post?.likedBy?.length} likes
              </span>
            </div>
            <div>
              <input
                type="text"
                id="comment"
                name="comment"
                style={{
                  borderColor: "#CCCCCC",
                  width: "90%",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                placeholder="add a comment"
                onChange={this.props.handleCommentChange}
                onKeyPress={(e) =>
                  this.props.handleComment(
                    e,
                    this.props.post.postId,
                    this.props.idx
                  )
                }
              />
              <CommentOutlined
                style={{
                  marginLeft: "10px",
                  color: "#376e6f",
                  cursor: "pointer",
                }}
                onClick={(e) =>
                  this.props.handleComment(
                    e,
                    this.props.post.postId,
                    this.props.idx
                  )
                }
              />
            </div>
          </Col>
        </Row>
        {this.state.openPostId !== null ? (
          <LikesModal
            modalVisible={this.state.modalVisible}
            handleOnCancel={this.handleOnCancel}
            openPostId={this.state.openPostId}
            openPostUserId={this.state.openPostUserId}
          />
        ) : null}
      </Modal>
    );
  }
}

export default ProfilePostModal;
