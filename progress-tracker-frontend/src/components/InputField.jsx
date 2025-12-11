import React from "react";

const InputField = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
}) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
