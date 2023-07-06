import React from "react";

import Logo from "../components/Logo.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center gap-6 w-96">
      <Logo />
      <div className="flex gap-10">
        <MegaLink
          text="Sign Up"
          icon={<FontAwesomeIcon icon={faMugSaucer} />}
          to="/signup"
        />
        <MegaLink
          text="View Users"
          icon={<FontAwesomeIcon icon={faUser} />}
          to="users"
        />
      </div>
    </div>
  );
};

const MegaLink = ({ text, icon, to }) => {
  return (
    <Link
      className="hover:shadow-md hover:shadow-gray-600 border-2 bg-gray-950 bg-opacity-95 border-white rounded-md fonty text-white flex flex-col items-center gap-3 w-48 h-auto justify-between px-1 py-2 hover:cursor-pointer transition-all hover:scale-105"
      to={to}
    >
      <p className="text-center text-6xl">{text}</p>
      <p className="text-center text-5xl">{icon}</p>
    </Link>
  );
};
export default Landing;
