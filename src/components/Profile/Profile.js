import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

class Profile extends Component {
  state = {};
  render() {
    console.log(this.props.user);
    return (
      <div>
        <Navbar />
        <div>Profile</div>
      </div>
    );
  }
}

export default Profile;
