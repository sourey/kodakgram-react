import React, { Component } from "react";
import { axiosPost } from "../../utils/AxiosApi";
import { URL } from "./../../utils/Constants";
import "./Profile.css";
import Bio from "./../Bio/Bio";
import ProfilePost from "./../ProfilePost/ProfilePost";
import { message } from "antd";

class Profile extends Component {
  state = { profile: null, fileList: [], imgURL: "" };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    let param = { userId: localStorage.getItem("userId") };
    axiosPost(URL.getProfile, param, (response) => {
      if (response.status === 200) {
        this.setState({ profile: response.data });
      }
    });
  };

  handleChange = (e) => {
    let newProfile = { ...this.state.profile };
    const { name, value } = e.target;
    newProfile[name] = value;
    this.setState({ profile: newProfile });
  };

  handleOnChange = (e) => {
    this.setState({ fileList: e.fileList }, () => {
      this.setState({
        imgURL: window.URL.createObjectURL(
          this.state.fileList[0]?.originFileObj
        ),
      });
    });
  };

  handleOnPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  clearImageURL = () => {
    this.setState({ imgURL: "" });
  };

  handleSave = (e) => {
    e.preventDefault();
    if (this.state.fileList.length > 0) {
      let formData = new FormData();
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("bio", this.state.profile.bio);
      formData.append("birthday", this.state.profile.birthday);
      formData.append(
        "image",
        this.state.fileList[0].originFileObj,
        this.state.fileList[0].originFileObj.name
      );
      axiosPost(URL.updateProfile, formData, (response) => {
        if (response.status === 200) {
          message.success("Profile Updated.");
          this.setState({ modalVisible: false });
        }
      });
    } else {
      message.warning("Sorry ! Could not update.");
    }
  };

  render() {
    return (
      <>
        <Bio
          name={localStorage.getItem("name")}
          profile={this.state.profile}
          handleChange={this.handleChange}
          fileList={this.state.fileList}
          handleOnChange={this.handleOnChange}
          handleOnPreview={this.handleOnPreview}
          clearImageURL={this.clearImageURL}
          handleSave={this.handleSave}
          imgURL={this.state.imgURL}
        />
        <ProfilePost />
      </>
    );
  }
}

export default Profile;
