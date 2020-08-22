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
import LikesModal from "./LikesModal";
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Card;

class Feed extends Component {
  state = {
    posts: [],
    comment: "",
    postLoading: true,
    modalVisible: false,
    openPostId: null,
    openPostUserId: null,
    postsLength: 0,
    page: 1,
  };

  componentDidMount() {
    this.getPosts(this.state.page);
  }

  getPosts = (page) => {
    const param = {
      page: page,
    };
    axiosPost(URL.getFeedPosts, param, (response) => {
      if (response.status === 200) {
        let posts;
        page === 1
          ? (posts = response.data.posts)
          : (posts = this.state.posts.concat(response.data.posts));

        this.setState({
          posts: posts,
          postLoading: false,
          postsLength: response.data.length,
        });
      }
    });
  };

  getNextPosts = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getPosts(this.state.page);
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
          if (
            posts[index].likedBy &&
            posts[index].likedBy.indexOf(likerId) !== -1
          ) {
            posts[index].likedBy = posts[index].likedBy.filter(
              (liker) => liker !== likerId
            );
          } else if (posts[index].likedBy === undefined) {
            posts[index].likedBy = [];
            posts[index].likedBy.push(likerId);
          } else {
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

  handleOnCancel = () => {
    this.setState({ modalVisible: false, openPostId: null });
  };

  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <CreatePost getPosts={this.getPosts} />
          {this.state.posts.length > 0 ? (
            <InfiniteScroll
              dataLength={this.state.posts.length} //This is important field to render the next data
              children={this.state.posts}
              next={this.getNextPosts}
              hasMore={this.state.postsLength > this.state.posts.length}
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
              endMessage={
                <p
                  style={{
                    textAlign: "center",
                    marginRight: "120px",
                    marginTop: "20px",
                  }}
                >
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {!this.state.postLoading ? (
                <>
                  {this.state.posts.map((post, idx) => (
                    <>
                      <Card
                        key={post.postId}
                        title={
                          <>
                            {post?.profilePictureUrl ? (
                              <Avatar
                                size={50}
                                style={{
                                  color: "#376e6f",
                                  backgroundColor: "#376e6f",
                                }}
                                src={`${server}/files/${post.profilePictureUrl}`}
                              />
                            ) : (
                              <Avatar
                                size={40}
                                icon={<UserOutlined />}
                                style={{
                                  color: "#FFFFFF",
                                  backgroundColor: "#376e6f",
                                }}
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
                            onDoubleClick={() => {
                              this.handleLike(post.postId, post.userId);
                            }}
                          />
                        }
                        actions={[
                          <Row>
                            <Col md={24}>
                              <span
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                  post.likedBy?.length !== 0 &&
                                    this.setState(
                                      {
                                        openPostId: post.postId,
                                        openPostUserId: post.userId,
                                      },
                                      () => {
                                        this.setState({ modalVisible: true });
                                      }
                                    );
                                }}
                              >
                                {post.likedBy?.length || 0} likes
                              </span>
                              {post.likedBy?.indexOf(
                                localStorage.getItem("userId")
                              ) !== -1 && post.likedBy !== undefined ? (
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
                                <CommentOutlined
                                  style={{ marginLeft: "50px" }}
                                />
                              </Col>
                            </Row>
                          </>,
                          <>
                            {post.userId === localStorage.getItem("userId") ? (
                              <Popconfirm
                                title="Are you sure to delete this post?"
                                onConfirm={(e) =>
                                  this.handleDeletePost(e, post.postId)
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
                                <DeleteOutlined
                                  style={{ marginLeft: "70px" }}
                                />
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
                    </>
                  ))}
                </>
              ) : (
                <Spin className="spin-center" size="large" />
              )}
            </InfiniteScroll>
          ) : (
            <p
              style={{
                textAlign: "center",
                marginRight: "25%",
                fontWeight: "bold",
              }}
            >
              Server down :(
            </p>
          )}
        </Col>
        <Col md={6}>
          <Followers />
        </Col>
        {this.state.openPostId !== null ? (
          <LikesModal
            modalVisible={this.state.modalVisible}
            handleOnCancel={this.handleOnCancel}
            openPostId={this.state.openPostId}
            openPostUserId={this.state.openPostUserId}
          />
        ) : null}
      </Row>
    );
  }
}

export default Feed;
