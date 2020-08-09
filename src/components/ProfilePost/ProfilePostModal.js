import React, { Component } from "react";
import { Modal, Row, Col, Avatar } from "antd";
import { server } from "../../utils/Constants";
import { HeartFilled, HeartOutlined, CommentOutlined } from "@ant-design/icons";

class ProfilePostModal extends Component {
  state = {};
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
              //className="profile-post"
            />
          </Col>
          <Col md={10}>
            <Row style={{ marginLeft: "5px", marginTop: "10px" }}>
              <Col md={4}>
                <Avatar
                  src={`${server}/files/${this.props?.post?.profilePictureUrl}`}
                />
              </Col>
              <Col md={20}>
                <Row>
                  <Col md={24}>
                    <div
                      style={{
                        marginTop: "7px",
                        marginLeft: "-10px",
                      }}
                    >
                      <strong>{this.props?.post?.username}</strong>
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
                    <Avatar
                      src={`${server}/files/${comment.profilePictureUrl}`}
                      alt={comment.username}
                    />
                  </Col>
                  <Col md={21}>
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
                marginTop: "5px",
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
                    marginTop: "2px",
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
                    marginTop: "2px",
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
            </div>
            <div>
              <input
                type="text"
                id="comment"
                name="comment"
                style={{
                  borderColor: "#CCCCCC",
                  width: "90%",
                  marginTop: "10px",
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
      </Modal>
    );
  }
}

export default ProfilePostModal;
