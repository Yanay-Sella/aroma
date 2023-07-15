import React, { useState } from "react";

const Caret = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length !== 0;

  const open = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <span className={`caret ${isOpen && "caret-down"}`} onClick={open}>
        {title}
      </span>
      <ul className={`${isOpen ? "active" : "nested"}`}>{children}</ul>
    </div>
  );
};

export default Caret;
