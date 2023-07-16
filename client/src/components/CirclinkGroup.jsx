import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faSitemap,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import Circlink from "./Circlink";

const CirclinkGroup = ({ highlighted }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Circlink to="/" icon={faHouse} highlight={highlighted === "landing"} />

      <div className="flex gap-4 justify-center">
        <Circlink
          to="/users"
          icon={faUser}
          highlight={highlighted === "users"}
        />

        <Circlink
          to="/data"
          icon={faSitemap}
          highlight={highlighted === "data"}
        />
        <Circlink
          to="/signup"
          icon={faMugSaucer}
          highlight={highlighted === "signup"}
        />
      </div>
    </div>
  );
};

export default CirclinkGroup;
