import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={
        props.className ? props.className + " signup-button" : "signup-button"
      }
      onClick={props.onClick}
      disabled={props?.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
