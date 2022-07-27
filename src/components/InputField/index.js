import React from "react";
import "./input.css";

const InputField = ({ onChange, ...props }) => {
  return (
    <input onChange={onChange} className="input-class" {...props} />
  );
};

export default InputField;
