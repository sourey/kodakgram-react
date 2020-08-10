import React, { Component } from "react";
import "./Feed.css";
import {
  Row,
  Col,
  Card,
  Avatar,
  message,
  Popconfirm,
  Skeleton,
  Spin,
} from "antd";
import {
  CommentOutlined,
  HeartOutlined,
  DeleteOutlined,
  HeartFilled,
  UserOutlined,
} from "@ant-design/icons";
import CreatePost from "./../CreatePost/CreatePost";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL, server } from "../../utils/Constants";
import Followers from "./../Followers/Followers";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const { Meta } = Card;

class Feed extends Component {
  state = { posts: [], comment: "", postLoading: true };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axiosPost(URL.getFeedPosts, {}, (response) => {
      if (response.status === 200) {
        this.setState({ posts: response.data.posts, postLoading: false });
      }
    });
  };

  handleDeletePost = (e, postId) => {
    let param = {
      userId: localStorage.getItem("userId"),
      postId,
    };
    axiosPost(URL.deletePost, param, (response) => {
      if (response.status === 200) {
        this.setState({
          posts: this.state.posts.filter((post) => post.postId !== postId),
        });
        message.success("Post deleted.");
      }
    });
  };

  handleLike = (postId, userId) => {
    let param = {
      postId,
      userId,
    };
    const likerId = localStorage.getItem("userId");
    axiosPost(URL.likePost, param, (response) => {
      if (response.status === 200) {
        const index = this.state.posts.findIndex(
          (post) => post.postId === postId
        );
        if (index !== -1) {
          let posts = [...this.state.posts];
          if (posts[index].likedBy && posts[index].likedBy.length > 0) {
            posts[index].likedBy = posts[index].likedBy.filter(
              (liker) => liker !== likerId
            );
          } else {
            posts[index].likedBy = [];
            posts[index].likedBy.push(likerId);
          }
          this.setState({
            posts: posts,
          });
        }
      }
    });
  };

  handleComment = (e, postId, postIndex) => {
    const comment = e.target.value;
    const username = localStorage.getItem("username");
    const profilePictureUrl = localStorage.getItem("profilePictureUrl");
    const param = {
      postId,
      comment,
      username,
    };
    if (e.key === "Enter" && e.target.value !== "") {
      axiosPost(URL.insertComment, param, (response) => {
        if (response.status === 200) {
          document.getElementById(`comment-${postIndex}`).value = "";
          let newPosts = [...this.state.posts];
          const userId = localStorage.getItem("userId");
          if (newPosts[postIndex].comments) {
            newPosts[postIndex].comments.push({
              comment,
              username,
              profilePictureUrl,
            });
          } else {
            newPosts[postIndex].comments = [];
            newPosts[postIndex].comments.push({
              comment,
              username,
              profilePictureUrl,
            });
          }
          this.setState({ posts: newPosts }, () => {
            message.success("comment posted");
          });
        }
      });
    }
  };

  handleDeleteComment = (postId, commentId, postIndex) => {
    let param = {
      postId,
      commentId,
    };
    axiosPost(URL.deleteComment, param, (response) => {
      if (response.status === 200) {
        let newPosts = [...this.state.posts];
        if (newPosts[postIndex].comments) {
          newPosts[postIndex].comments = newPosts[postIndex].comments.filter(
            (comment) => comment.commentId !== commentId
          );
          this.setState({ posts: newPosts }, () => {
            message.success("comment deleted.");
          });
        }
      }
    });
  };

  handleShowComments = (idx) => {
    let newPosts = [...this.state.posts];
    newPosts[idx].showComments = !newPosts[idx].showComments;
    this.setState({ posts: newPosts });
  };

  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <CreatePost getPosts={this.getPosts} />
          {this.state.posts.map((post, idx) => (
            <Spin spinning={this.state.postLoading}>
              <Card
                key={post.postId}
                title={
                  <>
                    {post?.profilePictureUrl ? (
                      <Avatar
                        size={50}
                        style={{ color: "#376e6f", backgroundColor: "#376e6f" }}
                        src={`${server}/files/${post.profilePictureUrl}`}
                      />
                    ) : (
                      <Avatar
                        size={40}
                        icon={<UserOutlined />}
                        style={{ color: "#FFFFFF", backgroundColor: "#376e6f" }}
                      />
                    )}
                    <Link
                      to={{
                        pathname: `/profile/${post.username}`,
                        state: { userId: post.userId },
                      }}
                      style={{ color: "black" }}
                    >
                      <span className="username">@{post.username}</span>
                    </Link>
                  </>
                }
                id={idx}
                className="feed-container"
                style={{ width: "450px" }}
                cover={
                  <img
                    alt={post.caption}
                    src={`${server}/files/${post.image}`}
                  />
                }
                actions={[
                  <Row>
                    <Col md={24}>
                      {post.likedBy?.indexOf(localStorage.getItem("userId")) !==
                        -1 && post.likedBy !== undefined ? (
                        <HeartFilled
                          style={{ color: "#eb2f96" }}
                          onClick={() =>
                            this.handleLike(post.postId, post.userId)
                          }
                        />
                      ) : (
                        <HeartOutlined
                          style={{ color: "#eb2f96" }}
                          onClick={() =>
                            this.handleLike(post.postId, post.userId)
                          }
                        />
                      )}
                    </Col>
                  </Row>,
                  <>
                    <Row onClick={() => this.handleShowComments(idx)}>
                      <Col md={12}>
                        <span style={{ marginLeft: "80px" }}>
                          {post?.comments?.length}
                        </span>
                      </Col>
                      <Col md={12}>
                        <CommentOutlined style={{ marginLeft: "50px" }} />
                      </Col>
                    </Row>
                  </>,
                  <>
                    {post.userId === localStorage.getItem("userId") ? (
                      <Popconfirm
                        title="Are you sure to delete this post?"
                        onConfirm={(e) => this.handleDeletePost(e, post.postId)}
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
                        <DeleteOutlined style={{ marginLeft: "70px" }} />
                      </Popconfirm>
                    ) : null}
                  </>,
                  ,
                ]}
              >
                <Meta
                  title={
                    <span style={{ whiteSpace: "pre-line" }}>
                      {post.caption}
                    </span>
                  }
                  style={{
                    fontWeight: "bold",
                  }}
                />
              </Card>
              <Comments
                id={idx}
                postId={post.postId}
                comments={post?.comments}
                showComments={post.showComments}
                handleComment={this.handleComment}
                handleDeleteComment={this.handleDeleteComment}
              />
            </Spin>
          ))}
        </Col>
        <Col md={6}>
          <Followers />
        </Col>
      </Row>
    );
  }
}

export default Feed;
