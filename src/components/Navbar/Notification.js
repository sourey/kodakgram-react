import React, { useState, useEffect } from "react";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Popover, Row, Col, Avatar } from "antd";
import { axiosPost } from "./../../utils/AxiosApi";
import { URL, server } from "./../../utils/Constants";

const Notification = () => {
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    getNotifications();
    let interval = setInterval(() => getNotifications(), 10000);
    //destroy interval on unmount
    return () => clearInterval(interval);
  }, []);

  const getNotifications = () => {
    axiosPost(
      URL.getNotifications,
      {},
      (response) => {
        setNotification(response.data.notifications);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const title = <div className="notification-title">Notifications</div>;

  const notificationList = (
    <div className="notification-content">
      {notifications.map((notification) => (
        <>
          <Row style={{ width: "220px" }}>
            <Col md={4}>
              {notification.profilePictureUrl !== "" ? (
                <Avatar
                  src={`${server}/files/${notification.profilePictureUrl}`}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <Avatar
                  size={24}
                  icon={<UserOutlined />}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Col>
            <Col md={20} style={{ marginTop: "5px", wordSpacing: "4px" }}>
              <span style={{ marginLeft: "4px" }}>{notification.username}</span>
              <span style={{ marginLeft: "4px" }}>
                {notification.type === "follow"
                  ? "followed you."
                  : "liked your photo."}
              </span>
            </Col>
          </Row>
          <hr
            style={{
              marginLeft: "5px",
              marginTop: "6px",
              color: "white",
              backgroundColor: "#efe1e1",
              border: "none",
              height: "1px",
            }}
          ></hr>
        </>
      ))}
    </div>
  );

  return (
    <>
      <Popover
        placement="bottom"
        // title={title}
        content={notificationList}
        trigger="click"
      >
        <span
          style={{
            color: "white",
            fontSize: "10px",
            marginTop: "28px",
            marginLeft: "6px",
            position: "absolute",
          }}
        >
          {notifications.length}
        </span>
        <NotificationOutlined
          style={{
            fontSize: "24px",
            marginRight: "20px",
            marginTop: "6px",
            color: "white",
          }}
        />
      </Popover>
    </>
  );
};

export default Notification;
