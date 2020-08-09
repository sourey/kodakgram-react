import React, { Component } from "react";
import { Row, Col, Modal, Avatar, Button } from "antd";
import { server } from "../../utils/Constants";
import {
  UserOutlined,
  CheckOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

class StatModal extends Component {
  render() {
    return (
      <Row>
        <Col md={24}>
          <Modal
            title={<strong>{this.props.title}</strong>}
            centered
            visible={this.props.modalVisible}
            footer={null}
            onCancel={this.props.handleOnCancel}
            width={400}
          >
            <Row>
              <Col
                md={24}
                style={{
                  overflowY: "scroll",
                  height: "450px",
                }}
              >
                {this.props.modalData.length > 0
                  ? this.props.modalData.map((data) => (
                      <Row
                        style={{
                          padding: "5px 5px",
                          marginBottom: "5px",
                        }}
                      >
                        <Col md={3}>
                          <Link
                            to={{
                              pathname: `/profile/${data.username}`,
                            }}
                            onClick={this.props.handleModalVisible}
                          >
                            {data.profilePictureUrl !== "" ? (
                              <Avatar
                                src={`${server}/files/${data?.profilePictureUrl}`}
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <Avatar
                                icon={<UserOutlined />}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </Link>
                        </Col>
                        <Col md={12} style={{ marginTop: "2px" }}>
                          <Link
                            to={{
                              pathname: `/profile/${data.username}`,
                            }}
                            onClick={this.props.handleModalVisible}
                          >
                            <span
                              style={{ marginLeft: "15px", fontSize: "16px" }}
                            >
                              <strong>{data.username}</strong>
                            </span>
                          </Link>
                        </Col>
                        {data.userId ===
                        localStorage.getItem("userId") ? null : (
                          <Col md={8}>
                            {localStorage
                              .getItem("following")
                              .indexOf(data.userId) !== -1 ? (
                              <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                shape="round"
                                className="follow-button"
                                disabled={this.props.buttonDisabled}
                                onClick={() =>
                                  this.props.handleUnFollow(data.userId)
                                }
                              >
                                Following
                              </Button>
                            ) : (
                              <Button
                                type="primary"
                                style={{ padding: "0px 26px" }}
                                icon={<UserAddOutlined />}
                                shape="round"
                                className="follow-button"
                                disabled={this.props.buttonDisabled}
                                onClick={() =>
                                  this.props.handleFollow(data.userId)
                                }
                              >
                                Follow
                              </Button>
                            )}
                          </Col>
                        )}
                        <Col md={1}></Col>
                      </Row>
                    ))
                  : `No ${this.props.title}`}
              </Col>
            </Row>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default StatModal;
