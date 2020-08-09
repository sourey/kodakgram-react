import React, { Component } from "react";
import { Row, Col } from "antd";
import { Avatar, Button, Modal } from "antd";
import {
  UserAddOutlined,
  SettingOutlined,
  CameraOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  GiftFilled,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { Upload, message } from "antd";
import { server, URL } from "../../utils/Constants";
import ProfileStats from "./../ProfileStats/ProfileStats";
import { axiosPost } from "./../../utils/AxiosApi";

class Bio extends Component {
  state = {
    name: "",
    bio: "",
    modalVisible: false,
    propObj: {},
    followed: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      const following = JSON.parse(localStorage.getItem("following"));
      this.setState({
        followed: following.indexOf(this.props.userId) !== -1 ? true : false,
      });
    }
  }

  handleFollow = (followingId) => {
    axiosPost(URL.follow, { followingId }, (response) => {
      if (response.status === 200) {
        this.setState({ followed: true });
        let following = JSON.parse(localStorage.getItem("following"));
        following.push(followingId);
        localStorage.setItem("following", JSON.stringify(following));
        message.success("followed");
      }
    });
  };

  handleUnFollow = (followingId) => {
    axiosPost(URL.unfollow, { followingId }, (response) => {
      if (response.status === 200) {
        this.setState({ followed: false });
        let following = JSON.parse(localStorage.getItem("following"));
        following = following.filter((id) => id !== followingId);
        localStorage.setItem("following", JSON.stringify(following));
        message.success("unfollowed");
      }
    });
  };

  render() {
    let propObj = {};
    if (this.props.imgURL === "") {
      propObj.icon = <CameraOutlined />;
    } else {
      propObj.src = this.props.imgURL;
    }
    return (
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <Row>
            <Col md={18} style={{ marginTop: "5px", padding: "5px 5px" }}>
              <Row>
                <Col md={6}>
                  {" "}
                  {this.props.isUpdate ? (
                    <Avatar
                      size={128}
                      className="profile-picture"
                      {...propObj}
                      onClick={() => {
                        this.setState({ modalVisible: true });
                      }}
                    />
                  ) : (
                    <>
                      {this.props.profile?.profilePictureUrl ? (
                        <Avatar
                          size={128}
                          className="profile-picture"
                          src={`${server}/files/${this.props.profile?.profilePictureUrl}`}
                        />
                      ) : (
                        <Avatar
                          size={128}
                          className="profile-picture"
                          icon={<UserOutlined />}
                        />
                      )}
                    </>
                  )}
                </Col>
                <Col md={18}>
                  <Row>
                    <Col md={24}>
                      <strong
                        style={{
                          marginLeft: "20px",
                          fontSize: "18px",
                          marginTop: "2px",
                        }}
                      >
                        {this.props.profile?.name}
                      </strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <ProfileStats userId={this.props.userId} />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md={24} className="name">
                  <strong style={{ textDecoration: "underline" }}>
                    {this.props.match.params.username
                      ? this.props.match.params.username
                      : localStorage.getItem("username")}
                  </strong>
                </Col>
              </Row>
              <Row>
                <Col md={24} className="bio">
                  {this.props.isUpdate ? (
                    <>
                      <Row>
                        <Col md={24}>
                          <label>Bio:</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={24}>
                          <textarea
                            id="bio"
                            name="bio"
                            value={this.props.profile?.bio}
                            style={{
                              width: "100%",
                              outline: "none",
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                            onChange={this.props.handleChange}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : (
                    this.props.profile?.bio
                  )}
                </Col>
                <Col md={24} className="bio">
                  {this.props.isUpdate ? (
                    <>
                      <Row>
                        <Col md={24}>
                          <label>Birthday:</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={24}>
                          <input
                            type="date"
                            id="bio"
                            name="birthday"
                            value={this.props.profile?.birthday}
                            style={{
                              width: "100%",
                              outline: "none",
                              border: "none",
                            }}
                            onChange={this.props.handleChange}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      {this.props.profile?.birthday ? (
                        <img
                          src="https://img.icons8.com/plasticine/30/000000/birthday-cake.png"
                          style={{ marginBottom: "12px", marginRight: "5px" }}
                        />
                      ) : null}
                      {this.props.profile?.birthday.slice(-5)}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={6} style={{ marginTop: "5px", padding: "5px 5px" }}>
              {this.props.match.params.username ===
              localStorage.getItem("username") ? null : (
                <>
                  {this.state.followed ? (
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      shape="round"
                      className="follow-button"
                      onClick={() => this.handleUnFollow(this.props.userId)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<UserAddOutlined />}
                      shape="round"
                      className="follow-button"
                      onClick={() => this.handleFollow(this.props.userId)}
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  {this.props.match.params.username ===
                    localStorage.getItem("username") &&
                  this.props.isUpdate === false ? (
                    <Button
                      type="primary"
                      icon={<SettingOutlined />}
                      shape="round"
                      className="follow-button"
                      onClick={() => {
                        this.props.handleIsUpdate(true);
                      }}
                    >
                      Update
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.props.isUpdate ? (
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      shape="round"
                      className="cancel-button"
                      onClick={() => {
                        this.props.handleIsUpdate(false);
                        this.props.clearImageURL();
                      }}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </Col>
                <Col md={24}>
                  {this.props.isUpdate ? (
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      shape="round"
                      className="save-button"
                      onClick={this.props.handleSave}
                    >
                      Save
                    </Button>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={6}></Col>
        <Modal
          title={<strong>Update Profile Picture</strong>}
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
          okButtonProps={{
            style: { backgroundColor: "#376e6f", borderColor: "#376e6f" },
          }}
        >
          <Row>
            <Col>
              <ImgCrop grid zoom={false} rotate={true}>
                <Upload
                  action=""
                  listType="picture-card"
                  fileList={this.props.fileList}
                  onChange={this.props.handleOnChange}
                  onPreview={this.props.handleOnPreview}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess("ok");
                    }, 0);
                  }}
                >
                  {this.props.fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
        </Modal>
      </Row>
    );
  }
}

export default withRouter(Bio);
