import React, { Component } from "react";
import Navbar from "./../Navbar/Navbar";
import "./Feed.css";
import CreatePost from "./../CreatePost/CreatePost";
import Post from "./../Post/Post";

class Feed extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div className="feed">
          <div></div>
          <div className="feed-container">
            {/* <CreatePost />
            <Post /> */}
          </div>
          <div></div>
        </div>
      </>
    );
  }
}

export default Feed;
