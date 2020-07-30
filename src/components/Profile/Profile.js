import React, { Component } from "react";
import { axiosPost } from "../../utils/AxiosApi";
import { URL } from "./../../utils/Constants";
import "./Profile.css";
import Bio from "./../Bio/Bio";
import ProfilePost from "./../ProfilePost/ProfilePost";
import { message } from "antd";

class Profile extends Component {
  state = {
    posts: [],
    profile: null,
    fileList: [],
    imgURL: "",
    isUpdate: false,
  };

  componentDidMount() {
    this.getProfile();
    this.getPosts();
  }

  getProfile = () => {
    let param = { userId: localStorage.getItem("userId") };
    axiosPost(URL.getProfile, param, (response) => {
      if (response.status === 200) {
        debugger;
        this.setState({ profile: response.data.profile });
      }
    });
  };

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
    let formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("bio", this.state.profile.bio);
    formData.append("birthday", this.state.profile.birthday);
    if (this.state.fileList.length > 0) {
      formData.append(
        "image",
        this.state.fileList[0].originFileObj,
        this.state.fileList[0].originFileObj.name
      );
    } else {
      formData.append(
        "profilePictureUrl",
        this.state.profile.profilePictureUrl
      );
    }

    axiosPost(URL.updateProfile, formData, (response) => {
      if (response.status === 200) {
        message.success("Profile Updated.");
        this.setState({ modalVisible: false, isUpdate: false }, () => {
          this.getProfile();
        });
      } else {
        message.warning("Sorry ! Could not update.");
      }
    });
  };

  handleIsUpdate = (bool) => {
    this.setState({ isUpdate: bool });
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
          handleIsUpdate={this.handleIsUpdate}
          imgURL={this.state.imgURL}
          isUpdate={this.state.isUpdate}
        />
        <ProfilePost posts={this.state.posts} />
      </>
    );
  }
}

export default Profile;
