import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faHourglass,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //validation
  const namePattern = /^[a-z]{1,10}$/i; //first and last
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern = /^0\d{9}$/;

  const [fnmValid, setFnmValid] = useState(true);
  const [lnmValid, setLnmValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [isLoading, setIsloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [failMsg, setFailMsg] = useState("error");

  const [userData, setUserData] = useState({
    fnm: "",
    lnm: "",
    email: "",
    phone: "",
    comment: "",
  });

  const { fnm, lnm, email, phone, comment } = userData;

  const type = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //validation
    let unvalid = false;
    if (!namePattern.test(fnm)) {
      setFnmValid(false);
      unvalid = true;
    } else setFnmValid(true);

    if (!namePattern.test(lnm)) {
      setLnmValid(false);
      unvalid = true;
    } else setLnmValid(true);
    if (!emailPattern.test(email)) {
      setEmailValid(false);
      unvalid = true;
    } else setEmailValid(true);
    if (!phonePattern.test(phone)) {
      setPhoneValid(false);
      unvalid = true;
    } else setPhoneValid(true);
    if (unvalid) return;

    try {
      setIsloading(true);
      const response = await axios.post(`${serverUrl}/user/signup`, userData);
      console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          setSuccess(true);
        }, 1000);
        setTimeout(() => {
          setIsloading(false);
          setSuccess(false);
          setUserData({
            fnm: "",
            lnm: "",
            email: "",
            phone: "",
            comment: "",
          });
        }, 2000);
      }
    } catch (error) {
      const { response } = error;
      console.log(response);
      //conflict
      if (response.status === 409) {
        const { conflict } = response.data;

        setTimeout(() => {
          switch (conflict) {
            case "e":
              {
                setEmailValid(false);
                setFailMsg(`email already in use...`);
              }
              break;
            case "p":
              {
                setPhoneValid(false);
                setFailMsg(`phone already in use...`);
              }
              break;
            case "ep":
              {
                setEmailValid(false);
                setPhoneValid(false);
                setFailMsg(`email & phone already in use`);
              }
              break;
          }
          setFail(true);
        }, 1000);
        setTimeout(() => {
          setIsloading(false);
          setFail(false);
        }, 3000);
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

        {isLoading ? (
          <div className="text-white text-xl self-center">
            {success ? (
              <FontAwesomeIcon icon={faCircleCheck} />
            ) : fail ? (
              <div className="flex flex-col">
                <p className="text-red-600 fonty text-xl">{failMsg}</p>
              </div>
            ) : (
              <FontAwesomeIcon icon={faHourglass} spin />
            )}
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

      <div className="flex gap-4 ">
        <div
          className="hover:shadow-md hover:shadow-gray-600 text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div
          className="hover:shadow-md hover:shadow-gray-600 text-2xl bg-gray-950 bg-opacity-95 border-2 rounded-full transition-all hover:scale-105 hover:cursor-pointer text-white p-3 flex"
          onClick={() => {
            navigate("/users");
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
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
