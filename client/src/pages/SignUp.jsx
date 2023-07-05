import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

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
      //signing up the user
      const response = await axios.post(`${serverUrl}/user/signup`, userData);
      console.log(response);
      if (response.status === 200)
        setUserData({
          fnm: "",
          lnm: "",
          email: "",
          phone: "",
          comment: "",
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-96">
      <Logo />

      <form className="flex flex-col gap-4 w-full border-2 rounded-lg p-3">
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
          className="bg-gray-900 rounded-md p-1 px-3 text-white"
          type="text"
          placeholder="comment"
          name="comment"
          onChange={type}
          value={comment}
        />
        <button
          onClick={onSubmit}
          className="bg-gray-900 rounded-md w-fit self-center p-1 px-2 transition-all hover:scale-105 text-white"
        >
          Submit
        </button>
      </form>

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
      className={`bg-gray-900 border-2 ${
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
