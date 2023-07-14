import React from "react";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Circlink from "../components/Circlink.jsx";

const Users = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAllBranches = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/branches`);
        setCountries(response.data.countries);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBranches();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-6 w-96">
        <Logo />
        <Circlink to="/" icon={faHouse} />
        {countries && (
          <div className="text-white fonty text-2xl w-96 p-2 border-2 border-white rounded-md">
            <ul id="myUL">
              <li>
                <Caret
                  title={"countries"}
                  children={
                    <div>
                      {countries.map((country) => (
                        <Caret
                          key={country.name}
                          title={country.name}
                          children={country.branches.map((branch) => (
                            <Caret
                              key={branch.bname}
                              title={branch.bname}
                              children={branch.users.map((user) => (
                                <Caret
                                  key={user.fnm}
                                  title={user.fnm}
                                  children={user.favFoods.map((food) => (
                                    <li
                                      className="text-xl text-red-600"
                                      key={food}
                                    >
                                      {food}
                                    </li>
                                  ))}
                                />
                              ))}
                            />
                          ))}
                        />
                      ))}
                    </div>
                  }
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Caret = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length !== 0;

  const open = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <span className={`caret ${isOpen && "caret-down"}`} onClick={open}>
        {title}
      </span>
      <ul className={`${isOpen ? "active" : "nested"}`}>{children}</ul>
    </div>
  );
};

export default Users;
