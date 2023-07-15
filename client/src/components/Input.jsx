import React from "react";

const Input = ({ placeholder, name, value, type, valid }) => {
  return (
    <input
      className={`tracking-wider bg-gray-900 bg-opacity-60 border-2 ${
        !valid ? "border-red-600" : "border-transparent"
      } rounded-md p-1 px-3 text-white`}
      type="text"
      placeholder={placeholder}
      name={name}
      onChange={type}
      value={value}
    />
  );
};

export default Input;
