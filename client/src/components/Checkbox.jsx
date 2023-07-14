import React, { useEffect } from "react";
import { useState } from "react";

const Checkbox = ({ name, setFavList, favList }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    let { name } = e.target;
    name = name.toString();

    setChecked((prev) => !prev);
  };

  useEffect(() => {
    setFavList((prev) => {
      if (checked) {
        return [...prev, name];
      } else {
        return prev.filter((element) => element !== name);
      }
    });
  }, [checked]);

  useEffect(() => {
    setChecked(() => favList.includes(name));
  }, [favList]);

  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default Checkbox;
