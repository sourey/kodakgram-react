import React, { Component } from "react";
import "./Feed.css";
import { Row, Col, Card, Avatar, message, Popconfirm } from "antd";
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
  state = { posts: [] };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axiosPost(URL.getFeedPosts, {}, (response) => {
      if (response.status === 200) {
        this.setState({ posts: response.data.posts });
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

  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <CreatePost getPosts={this.getPosts} />
          {this.state.posts.map((post, idx) => (
            <>
              <Card
                key={post.postId}
                title={
                  <>
                    {post?.profilePictureUrl ? (
                      <Avatar
                        size={50}
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                        src={`${server}/files/${post.profilePictureUrl}`}
                      />
                    ) : (
                      <Avatar
                        size={40}
                        icon={<UserOutlined />}
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
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
                  <>
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
                  </>,
                  <>
                    <Row>
                      <Col md={12}>
                        <span style={{ marginLeft: "60px" }}>10</span>
                      </Col>
                      <Col md={12}>
                        <CommentOutlined style={{ marginLeft: "40px" }} />
                      </Col>
                    </Row>
                  </>,
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
                  </Popconfirm>,
                  ,
                ]}
              >
                <Meta
                  title={post.caption}
                  style={{
                    fontWeight: "bold",
                  }}
                />
              </Card>
              <Comments />
            </>
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
