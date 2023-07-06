import React from "react";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import User from "./components/User.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [usersArr, setUsersArr] = useState([]);

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
    <div className="flex flex-col items-center gap-6 w-96">
      <Logo />
      <div className="flex gap-4 ">
        <div
          className="text-2xl border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div
          className="text-2xl border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <FontAwesomeIcon icon={faMugSaucer} />
        </div>
      </div>
      {usersArr && (
        <div className="flex flex-col gap-4 items-center width-full text-white fonty">
          {usersArr.map((element) => {
            const { fnm, lnm, email, phone, comment, id } = element;
            console.log(element);
            return (
              <User userInfo={element} key={id} setUsersArr={setUsersArr} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
