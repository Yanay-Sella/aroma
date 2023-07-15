import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import User from "../components/User.jsx";
import Logo from "../components/Logo.jsx";
import Circlink from "../components/Circlink.jsx";

import {
  faHouse,
  faMugSaucer,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [usersArr, setUsersArr] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user`);
        setUsersArr(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      {usersArr && (
        <div className="flex flex-col items-center gap-6">
          <Logo />
          <div className="flex gap-4 ">
            <Circlink to="/data" icon={faSitemap} />
            <Circlink to="/" icon={faHouse} />
            <Circlink to="signup" icon={faMugSaucer} />
          </div>

          <div className="grid grid-cols-2 gap-6 width-full text-white fonty">
            {usersArr.map((element) => {
              return (
                <User
                  userInfo={element}
                  key={element.id}
                  setUsersArr={setUsersArr}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
