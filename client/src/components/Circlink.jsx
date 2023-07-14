import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Circlink = ({ to, icon }) => {
  return (
    <Link
      className="hover:shadow-md hover:shadow-gray-700 text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
      to={to}
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
};

export default Circlink;
