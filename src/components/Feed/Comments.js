import React, { Component } from "react";
import { Comment, Avatar, Col, Row } from "antd";
import { server } from "../../utils/Constants";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

class Comments extends Component {
  state = {};
  render() {
    return (
      <>
        {this.props.showComments &&
          this.props.comments?.map((comment, idx) => (
            <Row style={{ width: "450px" }} key={idx}>
              <Col md={22}>
                <Comment
                  style={{
                    marginLeft: "60px",
                    padding: `0px ${idx * 3}px`,
                  }}
                  author={comment.username}
                  avatar={
                    comment.profilePictureUrl ? (
                      <Avatar
                        src={`${server}/files/${comment.profilePictureUrl}`}
                        alt={comment.username}
                      />
                    ) : (
                      <Avatar
                        //size={40}
                        icon={<UserOutlined />}
                        style={{ color: "#FFFFFF", backgroundColor: "#376e6f" }}
                      />
                    )
                  }
                  content={comment.comment}
                />
              </Col>
              <Col md={2}>
                <DeleteOutlined
                  style={{
                    marginTop: "18px",
                    fontSize: "16px",
                    marginLeft: "65px",
                  }}
                  onClick={() =>
                    this.props.handleDeleteComment(
                      this.props.postId,
                      comment.commentId,
                      this.props.id
                    )
                  }
                />
              </Col>
            </Row>
          ))}
        <input
          key={this.props.postId}
          id={`comment-${this.props.id}`}
          type="text"
          name="comment"
          style={{
            width: "450px",
            marginLeft: "57px",
            marginBottom: "10px",
            marginTop: "10px",
            borderColor: "rgb(141 142 142)",
          }}
          placeholder="write a comment"
          onKeyPress={(e) =>
            this.props.handleComment(e, this.props.postId, this.props.id)
          }
        />
      </>
    );
  }
}

export default Comments;
