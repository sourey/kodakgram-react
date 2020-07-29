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
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { Upload, message } from "antd";
import { server } from "../../utils/Constants";

class Bio extends Component {
  state = {
    isUpdate: false,
    name: "",
    bio: "",
    modalVisible: false,
    propObj: {},
  };

  componentDidMount() {
    // this.renderIconOrImage();
  }

  //  renderIconOrImage = () => {};

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
              {this.state.isUpdate ? (
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
              {
                <strong
                  className="name"
                  style={{ marginLeft: "10px", textDecoration: "underline" }}
                >
                  {localStorage.getItem("username")}
                </strong>
              }
              <Row>
                <Col md={24} className="name">
                  {this.props.name}
                </Col>
              </Row>
              <Row>
                <Col md={24} className="bio">
                  {this.state.isUpdate ? (
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
                            style={{ width: "100%", outline: "none" }}
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
                  {this.state.isUpdate ? (
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
                            style={{ width: "100%", outline: "none" }}
                            onChange={this.props.handleChange}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : (
                    this.props.profile?.birthday
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={6} style={{ marginTop: "5px", padding: "5px 5px" }}>
              {this.props.match.params.username ===
              localStorage.getItem("username") ? null : (
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  shape="round"
                  className="follow-button"
                >
                  Follow
                </Button>
              )}

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  {this.props.match.params.username ===
                    localStorage.getItem("username") &&
                  this.state.isUpdate === false ? (
                    <Button
                      type="primary"
                      icon={<SettingOutlined />}
                      shape="round"
                      className="follow-button"
                      onClick={() => {
                        this.setState({ isUpdate: true });
                      }}
                    >
                      Update
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.state.isUpdate ? (
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      shape="round"
                      className="cancel-button"
                      onClick={() => {
                        this.setState({ isUpdate: false });
                        this.props.clearImageURL();
                      }}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </Col>
                <Col md={24}>
                  {this.state.isUpdate ? (
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
