import React, { Component } from "react";
import Button from "./../Button/Button";
import "./CreatePost.css";

class CreatePost extends Component {
  state = {
    picture: null,
  };

  render() {
    return (
      <div className="create-post">
        <div>
          <input type="file" name="image" />
        </div>
        <div className="create-post-button">
          <Button text={"Create Post"} className="button-color" />
        </div>
      </div>
    );
  }
}

export default CreatePost;
