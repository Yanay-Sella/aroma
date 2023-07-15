import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Checkbox from "../components/Checkbox.jsx";
import Logo from "../components/Logo.jsx";
import Circlink from "../components/Circlink.jsx";
import Input from "../components/Input.jsx";
import useValidate from "../hooks/useValidate.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faHourglass,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [branchesArr, setBranchesArr] = useState([]);
  const [foodsArr, setFoodsArr] = useState([]);

  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const defaultUser = {
    fnm: "",
    lnm: "",
    email: "",
    phone: "",
    branch: "",
    comment: "",
  };
  const [userData, setUserData] = useState(defaultUser);

  const [favList, setFavList] = useState([]);

  const { fnm, lnm, email, phone, comment, branch } = userData;

  useEffect(() => {
    const getAllFoods = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/foods`);
        setFoodsArr(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFoods();
    const getAllBranches = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/branches`);
        setBranchesArr(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBranches();
  }, []);

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
          setUserData(defaultUser);
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
      }
      if (response.status === 500) {
        setTimeout(() => {
          setIsloading(false);
          showSnack(`server error, please check your input`);
        }, [1000]);
      }
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
            {branchesArr.map((b) => (
              <option className="text-gray-900" value={b} key={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-red-600 text-xl">{"Favorite foods or drinks"}</h1>
        <div className="text-white grid grid-cols-2">
          {foodsArr.map((f) => (
            <Checkbox
              name={f}
              setFavList={setFavList}
              favList={favList}
              key={f}
            />
          ))}
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
        <Circlink to="/users" icon={faUser} />
        <Circlink to="/" icon={faHouse} />
        <Circlink to="/data" icon={faSitemap} />
      </div>

      {/* snack bar */}
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

export default SignUp;
