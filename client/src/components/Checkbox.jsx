import React from "react";

const Checkbox = ({ name, setFavList }) => {
  const handleChange = (e) => {
    let { name, checked } = e.target;
    name = name.toString();

    setFavList((prev) => {
      if (checked) {
        return [...prev, name];
      } else {
        return prev.filter((element) => element !== name);
      }
    });
  };

  return (
    <div className="flex gap-2">
      <input type="checkbox" id={name} name={name} onChange={handleChange} />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default Checkbox;
