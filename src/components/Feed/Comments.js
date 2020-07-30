import React, { Component } from "react";
import { Comment, Avatar } from "antd";

class Comments extends Component {
  state = {};
  render() {
    return (
      <Comment
        style={{ marginLeft: "105px" }}
        //actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={<p>It is what it is</p>}
        // datetime={
        //   <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
        //     <span>{moment().fromNow()}</span>
        //   </Tooltip>
        // }
      />
    );
  }
}

export default Comments;
