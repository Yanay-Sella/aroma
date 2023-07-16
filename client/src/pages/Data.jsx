import React, { useEffect, useState } from "react";
import axios from "axios";

import Logo from "../components/Logo.jsx";
import Caret from "../components/Caret.jsx";
import CirclinkGroup from "../components/CirclinkGroup.jsx";

import {
  faHouse,
  faUser,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/data`);
        setCountries(response.data.countries);
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-6 w-96">
        <Logo />
        <CirclinkGroup highlighted={"data"} />
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

export default Users;
