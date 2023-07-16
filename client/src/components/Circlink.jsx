import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Circlink = ({ to, icon, highlight }) => {
  return (
    <Link
      className={`${
        highlight
          ? "shadow-lg shadow-gray-700 scale-105"
          : "hover:shadow-md  hover:shadow-gray-700 hover:scale-105"
      } text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all w-14 h-14 hover:cursor-pointer text-white p-3 flex justify-center items-center`}
      to={to}
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
};

export default Circlink;
