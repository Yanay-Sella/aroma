import React from "react";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import User from "../components/User.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Users = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [usersArr, setUsersArr] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user`);
        setUsersArr(response.data); //array from db
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
            <Link
              className="hover:shadow-md hover:shadow-gray-700 text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
              to="/"
            >
              <FontAwesomeIcon icon={faHouse} />
            </Link>
            <Link
              className="hover:shadow-md hover:shadow-gray-700 text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
              to="/signup"
            >
              <FontAwesomeIcon icon={faMugSaucer} />
            </Link>
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
