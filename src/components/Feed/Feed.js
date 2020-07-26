import React, { Component } from "react";
import "./Feed.css";
import { Row, Col, Card, Avatar } from "antd";
import {
  EllipsisOutlined,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import Woman from "../../assets/images/woman.jpg";
import CreatePost from "./../CreatePost/CreatePost";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL, server } from "../../utils/Constants";

const { Meta } = Card;

class Feed extends Component {
  state = { posts: [] };

  componentDidMount() {
    let param = {
      userId: localStorage.getItem("userId"),
    };
    axiosPost(URL.getPosts, param, (response) => {
      if (response.status === 200) {
        this.setState({ posts: response.data });
      }
    });
  }
  render() {
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <CreatePost />
          {this.state.posts.map((post, idx) => (
            <Card
              title={
                <>
                  <Avatar
                    size={40}
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    SS
                  </Avatar>
                  <span className="username">{post.username}</span>
                </>
              }
              id={idx}
              className="feed-container"
              style={{ width: 400 }}
              cover={
                <img alt={post.caption} src={`${server}/files/${post.image}`} />
              }
              actions={[
                <HeartOutlined style={{ color: "#eb2f96" }} />,
                <CommentOutlined />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                title={post.caption}
                style={{
                  fontWeight: "bold",
                }}
              />
            </Card>
          ))}
        </Col>
        <Col md={6}></Col>
      </Row>
    );
  }
}

export default Feed;
