import React, { Component } from "react";
import "./Feed.css";
import {
  Row,
  Col,
  Card,
  Avatar,
  message,
  Popconfirm,
  Comment,
  Tooltip,
} from "antd";
import {
  CommentOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreatePost from "./../CreatePost/CreatePost";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL, server } from "../../utils/Constants";
import Followers from "./../Followers/Followers";
import Comments from "./Comments";

const { Meta } = Card;

class Feed extends Component {
  state = { posts: [] };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    let param = {
      userId: localStorage.getItem("userId"),
    };
    axiosPost(URL.getPosts, param, (response) => {
      if (response.status === 200) {
        this.setState({ posts: response.data });
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

  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <CreatePost getPosts={this.getPosts} />
          {this.state.posts.map((post, idx) => (
            <>
              <Card
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
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        SS
                      </Avatar>
                    )}

                    <span className="username">{post.username}</span>
                  </>
                }
                id={idx}
                className="feed-container"
                style={{ width: 400 }}
                cover={
                  <img
                    alt={post.caption}
                    src={`${server}/files/${post.image}`}
                  />
                }
                actions={[
                  <HeartOutlined style={{ color: "#eb2f96" }} />,
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
