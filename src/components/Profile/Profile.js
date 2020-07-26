import React, { Component } from "react";
import { axiosPost } from "../../utils/AxiosApi";
import { URL } from "./../../utils/Constants";
import "./Profile.css";
import Bio from "./../Bio/Bio";
import ProfilePost from "./../ProfilePost/ProfilePost";

class Profile extends Component {
  state = { profile: null };

  componentDidMount() {
    let param = { userId: localStorage.getItem("userId") };
    axiosPost(URL.getProfile, param, (response) => {
      if (response.status === 200) {
        this.setState({ profile: response.data });
      }
    });
  }
  render() {
    return (
      <>
        <Bio name={localStorage.getItem("name")} />

        <ProfilePost />
      </>
    );
  }
}

export default Profile;
