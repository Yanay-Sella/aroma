import React from "react";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMugSaucer,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [usersArr, setUsersArr] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user`);
        console.log(response);
        setUsersArr(response.data); //array from db
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log(usersArr);
  }, [usersArr]);

  return (
    <div className="flex flex-col items-center gap-6 w-96">
      <Logo />
      {usersArr && (
        <div className="flex flex-col gap-4 items-center width-full text-white fonty">
          {usersArr.map((element) => {
            const { fnm, lnm, email, phone, comment } = element;
            return (
              <User
                fnm={fnm}
                lnm={lnm}
                email={email}
                phone={phone}
                comment={comment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const User = ({ fnm, lnm, email, phone, comment }) => {
  return (
    <div className="relative border-2 rounded-md w-96 p-3 transition-all hover:scale-105">
      <div>
        <p className="text-3xl">{`${fnm} ${lnm}`}</p>
        <p>{`Email: ${email}`}</p>
        <p>{`Phone number: ${phone}`}</p>
        <p>{`Comment: ${comment}`}</p>
      </div>
      <div className="absolute right-2 bottom-2 flex gap-2">
        <div className="hover:cursor-pointer text-white hover:bg-gray-900 rounded-full flex p-2">
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className="hover:cursor-pointer text-white hover:bg-gray-900 rounded-full flex p-2">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </div>
  );
};

export default Users;
