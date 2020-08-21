import React, { Component } from "react";
import { axiosPost } from "../../utils/AxiosApi";
import { URL } from "./../../utils/Constants";
import "./Profile.css";
import Bio from "./../Bio/Bio";
import ProfilePost from "./../ProfilePost/ProfilePost";
import { message, Spin } from "antd";

class Profile extends Component {
  state = {
    posts: [],
    profile: null,
    fileList: [],
    imgURL: "",
    isUpdate: false,
    userId: null,
    comment: "",
    postLoading: true,
  };

  componentDidMount() {
    this.getProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.match?.params?.username !== this.props?.match?.params?.username
    ) {
      this.getProfile();
    }
  }
  getProfile = () => {
    let param;
    if (this.props?.match?.params?.username) {
      axiosPost(
        URL.getUserByUsername,
        {
          username: this.props.match.params.username,
        },
        (response) => {
          if (response.status === 200) {
            this.setState({ userId: response.data.user.userId }, () => {
              this.getPosts();
            });
            param = {
              userId: response.data.user.userId,
            };
            this.call(param);
            this.getPosts();
          }
        }
      );
    } else if (this.props?.location?.state?.userId) {
      param = {
        userId: this.props.location.state.userId,
      };
      this.setState({ userId: this.props.location.state.userId });
      this.call(param);
      this.getPosts();
    } else {
      param = { userId: localStorage.getItem("userId") };
      this.setState({ userId: localStorage.getItem("userId") });
      this.call(param);
      this.getPosts();
    }
  };

  call = (param) => {
    axiosPost(URL.getProfile, param, (response) => {
      if (response.status === 200) {
        this.setState({ profile: response.data.profile });
      }
    });
  };

  getPosts = () => {
    let param;
    if (this.props?.location?.state?.userId) {
      param = {
        userId: this.props.location.state.userId,
      };
      this.callPost(param);
    } else if (this.props?.match?.params?.username) {
      param = {
        userId: this.state.userId,
      };
      this.callPost(param);
    } else {
      param = { userId: localStorage.getItem("userId") };
      this.callPost(param);
    }
  };

  callPost = (param) => {
    axiosPost(
      URL.getPosts,
      param,
      (response) => {
        if (response.status === 200) {
          this.setState({ posts: response.data, postLoading: false });
        }
      },
      (error) => {
        this.setState({ posts: [], postLoading: false });
      }
    );
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

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleComment = (e, postId, postIndex) => {
    const comment = e.target.value;
    if (e.key === "Enter" && e.target.value !== "") {
      this.postComment(comment, postId, postIndex);
    }
    if (!e.key && this.state.comment !== "") {
      this.postComment(this.state.comment, postId, postIndex);
    }
  };

  postComment = (comment, postId, postIndex) => {
    const username = localStorage.getItem("username");
    const profilePictureUrl = localStorage.getItem("profilePictureUrl");
    const param = {
      postId,
      comment: comment,
      username,
    };
    axiosPost(URL.insertComment, param, (response) => {
      if (response.status === 200) {
        debugger;
        document.getElementById(`comment`).value = "";
        let newPosts = [...this.state.posts];
        if (newPosts[postIndex].comments) {
          newPosts[postIndex].comments.push({
            comment,
            username,
            profilePictureUrl,
          });
        } else {
          newPosts[postIndex].comments = [];
          newPosts[postIndex].comments.push({
            comment,
            username,
            profilePictureUrl,
          });
        }
        this.setState({ posts: newPosts }, () => {
          message.success("comment posted");
        });
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
          userId={this.state.userId}
          following={this.props.following}
        />

        <ProfilePost
          posts={this.state.posts}
          postLoading={this.state.postLoading}
          handleComment={this.handleComment}
          handleCommentChange={this.handleCommentChange}
          handleLike={this.handleLike}
          handleDeletePost={this.handleDeletePost}
        />
      </>
    );
  }
}

export default Profile;
