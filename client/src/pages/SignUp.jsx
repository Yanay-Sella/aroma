import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Checkbox from "../components/Checkbox.jsx";

import Logo from "../components/Logo.jsx";
import useValidate from "../hooks/useValidate.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import Circlink from "../components/Circlink.jsx";

const SignUp = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);

  const [snackMsg, setSnackMsg] = useState("");

  const [userData, setUserData] = useState({
    fnm: "",
    lnm: "",
    email: "",
    phone: "",
    branch: "",
    comment: "",
  });

  const [favList, setFavList] = useState([]);

  const { fnm, lnm, email, phone, comment, branch } = userData;

  const {
    fnmValid,
    lnmValid,
    emailValid,
    phoneValid,
    checkValidate,
    setPhoneValid,
    setEmailValid,
  } = useValidate({ fnm, lnm, email, phone, branch });

  const showSnack = (message) => {
    setSnackMsg(message);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const type = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const valid = checkValidate();

    if (!valid) {
      showSnack("Input not valid");
      return;
    }

    try {
      setIsloading(true);
      const response = await axios.post(`${serverUrl}/user/signup`, {
        ...userData,
        favList,
      });
      console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          setIsloading(false);
          showSnack("User created");
          setUserData({
            fnm: "",
            lnm: "",
            email: "",
            phone: "",
            comment: "",
            branch: "",
          });
          setFavList([]);
        }, 1500);
      }
    } catch (error) {
      const { response } = error;
      //conflict
      if (response.status === 409) {
        const { conflict } = response.data;

        setTimeout(() => {
          switch (conflict) {
            case "e":
              {
                setEmailValid(false);
                showSnack(`email already in use...`);
              }
              break;
            case "p":
              {
                setPhoneValid(false);
                showSnack(`phone already in use...`);
              }
              break;
            case "ep":
              {
                setEmailValid(false);
                setPhoneValid(false);
                showSnack(`email & phone already in use`);
              }
              break;
          }
          setIsloading(false);
        }, 1000);
      } else setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-96">
      <Logo />

      <form className="flex flex-col gap-4 w-full border-2 rounded-lg p-3 fonty">
        <h1 className="text-white fonty self-center text-3xl">Sign Up</h1>

        <Input
          placeholder="first name"
          name="fnm"
          value={fnm}
          type={type}
          valid={fnmValid}
        />
        <Input
          placeholder="last name"
          name="lnm"
          value={lnm}
          type={type}
          valid={lnmValid}
        />
        <Input
          placeholder="email"
          name="email"
          value={email}
          type={type}
          valid={emailValid}
        />
        <Input
          placeholder="phone number"
          name="phone"
          value={phone}
          type={type}
          valid={phoneValid}
        />

        <textarea
          className="bg-gray-900 bg-opacity-60 rounded-md p-1 px-3 text-white"
          type="text"
          placeholder="comment"
          name="comment"
          onChange={type}
          value={comment}
        />

        <div className="flex flex-col gap-1">
          <label className="text-red-600 text-lg" htmlFor="branch">
            Choose a branch:
          </label>
          <select
            className={`tracking-wider bg-gray-900 bg-opacity-60 border-2 text-white rounded-md p-1 px-2 border-transparent`}
            name="branch"
            id="branch"
            value={branch}
            onChange={type}
          >
            <option className="text-gray-900" value="telAviv">
              telAviv
            </option>
            <option className="text-gray-900" value="rishon">
              rishon
            </option>
            <option className="text-gray-900" value="holon">
              holon
            </option>
            <option className="text-gray-900" value="newYork">
              newYork
            </option>
            <option className="text-gray-900" value="california">
              california
            </option>
            <option className="text-gray-900" value="texas">
              texas
            </option>
            <option className="text-gray-900" value="ohio">
              ohio
            </option>
            <option className="text-gray-900" value="munich">
              munich
            </option>
            <option className="text-gray-900" value="berlin">
              berlin
            </option>
            <option className="text-gray-900" value="budapest">
              budapest
            </option>
          </select>
        </div>

        <h1 className="text-red-600 text-xl">{"Favorite foods or drinks"}</h1>
        <div className="text-white grid grid-cols-2">
          <Checkbox name="Coffee" setFavList={setFavList} favList={favList} />
          <Checkbox name="Sandwich" setFavList={setFavList} favList={favList} />
          <Checkbox
            name="Croissant"
            setFavList={setFavList}
            favList={favList}
          />
          <Checkbox name="Tea" setFavList={setFavList} favList={favList} />
          <Checkbox name="Cookie" setFavList={setFavList} favList={favList} />
          <Checkbox name="Eggs" setFavList={setFavList} favList={favList} />
          <Checkbox name="Bread" setFavList={setFavList} favList={favList} />
        </div>

        {isLoading ? (
          <div className="text-white text-xl self-center">
            <FontAwesomeIcon icon={faHourglass} spin />
          </div>
        ) : (
          <button
            onClick={onSubmit}
            className="bg-gray-900 hover:shadow-md hover:shadow-gray-900 bg-opacity-60 rounded-full w-fit self-center p-2 px-4 transition-all hover:scale-105 text-white tracking-wider"
          >
            Submit
          </button>
        )}
      </form>

      {/* links to other pages */}
      <div className="flex gap-4 ">
        <Circlink to="/" icon={faHouse} />
        <Circlink to="/users" icon={faUser} />
      </div>
      <div
        className={`snackbar fonty justify-self-center rounded-lg bg-gray-900 px-5 py-3 text-red-600 text-xl ${
          show && "snackbarshow"
        }`}
      >
        <p>{snackMsg}</p>
      </div>
    </div>
  );
};

const Input = ({ placeholder, name, value, type, valid }) => {
  return (
    <input
      className={`tracking-wider bg-gray-900 bg-opacity-60 border-2 ${
        !valid ? "border-red-600" : "border-transparent"
      } rounded-md p-1 px-3 text-white`}
      type="text"
      placeholder={placeholder}
      name={name}
      onChange={type}
      value={value}
    />
  );
};
export default SignUp;
