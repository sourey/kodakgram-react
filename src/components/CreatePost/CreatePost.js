import React, { Component } from "react";
import "./CreatePost.css";
import { Row, Col, Modal, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { Upload, message } from "antd";
import { axiosPost } from "../../utils/AxiosApi";
import { URL } from "../../utils/Constants";
import { FileImageOutlined } from "@ant-design/icons";

class CreatePost extends Component {
  state = {
    caption: "",
    fileList: [],
    modalVisible: false,
  };

  handleOnChange = (e) => {
    this.setState({ fileList: e.fileList });
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.fileList.length > 0) {
      let formData = new FormData();
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("caption", this.state.caption);
      formData.append(
        "image",
        this.state.fileList[0].originFileObj,
        this.state.fileList[0].originFileObj.name
      );
      axiosPost(URL.insertPost, formData, (response) => {
        if (response.status === 200) {
          message.success("Post uploaded.");
          this.setState({ modalVisible: false, caption: "", fileList: [] });
          this.props.getPosts();
        }
      });
    } else {
      message.warning("Upload an image first");
    }
  };

  render() {
    return (
      <Row
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          padding: "5px 5px",
        }}
      >
        <Col md={6}></Col>
        <Col md={12}>
          <Button
            type="primary"
            onClick={() => this.setState({ modalVisible: true })}
            className="create-post-button"
            icon={<FileImageOutlined />}
          >
            New Post
          </Button>
          <Modal
            title={<strong>New Post</strong>}
            centered
            visible={this.state.modalVisible}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ modalVisible: false })}
            okButtonProps={{
              style: { backgroundColor: "#376e6f", borderColor: "#376e6f" },
            }}
          >
            <Row>
              <Col md={24}>
                <textarea
                  type="text"
                  name="caption"
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    fontWeight: "bold",
                    outline: "none",
                    padding: "5px 5px",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  placeholder="caption"
                  onChange={(e) => this.setState({ caption: e.target.value })}
                />
              </Col>
              <Col>
                <ImgCrop grid zoom={false} rotate={true}>
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onChange={this.handleOnChange}
                    onPreview={this.handleOnPreview}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 0);
                    }}
                  >
                    {this.state.fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>
          </Modal>
        </Col>
        <Col md={6}></Col>
      </Row>
    );
  }
}

export default CreatePost;
