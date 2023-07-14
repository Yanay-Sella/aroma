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
  const [branchesArr, setBranchesArr] = useState();

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

    const getAllBranches = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/branches`);
        setBranchesArr(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBranches();
  }, []);

  //   var toggler = document.getElementsByClassName("caret");
  //   var i;

  //   for (i = 0; i < toggler.length; i++) {
  //     toggler[i].addEventListener("click");
  //   }

  //   const open = () => {
  //     this.parentElement.querySelector(".nested").classList.toggle("active");
  //     this.classList.toggle("caret-down");
  //   };

  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <Logo />
        <div className="text-white fonty text-2xl">
          <ul id="myUL">
            <li>
              <Caret
                title={"countries"}
                children={
                  <div>
                    <Caret title={"israel"} />
                    <Caret title={"israel"} />
                    <Caret title={"israel"} />
                    <Caret title={"israel"} />
                    <Caret title={"israel"} />
                  </div>
                }
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Caret = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-96">
      <span className={`caret ${isOpen && "caret-down"}`} onClick={open}>
        {title}
      </span>
      <ul className={`${isOpen ? "active" : "nested"}`}>{children}</ul>
    </div>
  );
};

export default Users;
