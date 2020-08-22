import React, { Component } from "react";
import { Row, Col, Empty, Popconfirm, Spin } from "antd";
import { server } from "../../utils/Constants";
import "./ProfilePost.css";
import {
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ProfilePostModal from "./ProfilePostModal";
import InfiniteScroll from "react-infinite-scroll-component";

class ProfilePost extends Component {
  state = {
    overlayed: false,
    modalVisible: false,
    post: null,
    idx: null,
  };

  handleOnCancel = () => {
    this.setState({ modalVisible: false, modalData: [] });
  };

  render() {
    return (
      <Row>
        <Col md={2}></Col>
        <Col md={20} style={{ marginTop: "5px", padding: "5px 5px" }}>
          <InfiniteScroll
            dataLength={this.props.posts.length} //This is important field to render the next data
            children={this.props.posts}
            next={this.props.getNextPosts}
            hasMore={this.props.postsLength > this.props.posts.length}
            loader={
              <Spin
                style={{
                  display: "inherit",
                  textAlign: "center",
                  marginRight: "120px",
                  marginTop: "20px",
                }}
              />
            }
          >
            {this.props.posts.length > 0 ? (
              <Row>
                {this.props.posts.map((post, idx) => (
                  <Col
                    style={{
                      marginBottom: "15px",
                      height: "320px",
                      width: "320px",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                    key={post.postId}
                    className="container"
                  >
                    <div
                      className="image-container"
                      style={{
                        height: "320px",
                        width: "320px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        this.setState({
                          modalVisible: true,
                          post: post,
                          idx: idx,
                        })
                      }
                    >
                      <img
                        src={`${server}/files/${post.image}`}
                        height="320"
                        width="320"
                        className="profile-post image"
                        onMouseEnter={() => this.setState({ overlayed: true })}
                        onMouseLeave={() => this.setState({ overlayed: false })}
                      />
                    </div>
                    <Row className="delete-overlay">
                      <Col>
                        <Popconfirm
                          placement="bottom"
                          title="Are you sure to delete this post?"
                          onConfirm={(e) =>
                            this.props.handleDeletePost(e, post.postId)
                          }
                          onCancel={this.cancelDelete}
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{
                            style: {
                              backgroundColor: "#376e6f",
                              borderColor: "#376e6f",
                            },
                          }}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </Col>
                    </Row>

                    <Row className="overlay">
                      <Col>
                        <span> {post?.likedBy?.length || 0}</span>
                        <HeartFilled style={{ marginLeft: "10px" }} />
                      </Col>
                      <Col style={{ marginLeft: "20px" }}>
                        <span> {post?.comments?.length || 0}</span>
                        <CommentOutlined style={{ marginLeft: "10px" }} />
                      </Col>
                    </Row>
                  </Col>
                ))}
                <ProfilePostModal
                  idx={this.state.idx}
                  post={this.state.post}
                  modalVisible={this.state.modalVisible}
                  handleOnCancel={this.handleOnCancel}
                  handleComment={this.props.handleComment}
                  handleCommentChange={this.props.handleCommentChange}
                  handleLike={this.props.handleLike}
                />
              </Row>
            ) : (
              <Empty
                description={"No Posts"}
                style={{ justifyContent: "center" }}
              />
            )}
          </InfiniteScroll>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default ProfilePost;
