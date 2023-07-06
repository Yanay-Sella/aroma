import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const User = ({ userInfo, setUsersArr }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  //validation
  const namePattern = /^[a-z]{1,10}$/i; //first and last
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern = /^0\d{9}$/;

  const [originalUser, setOriginalUser] = useState(userInfo);
  const [isEdit, setIsEdit] = useState(false);

  const [fnmValid, setFnmValid] = useState(true);
  const [lnmValid, setLnmValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const { fnm, lnm, email, phone, comment, id } = originalUser; //original user

  //new User
  const [newUser, setNewUser] = useState({
    uFnm: fnm,
    uLnm: lnm,
    uEmail: email,
    uPhone: phone,
    uComment: comment,
  });

  const { uFnm, uLnm, uEmail, uPhone, uComment } = newUser;

  useEffect(() => {
    setNewUser({
      uFnm: fnm,
      uLnm: lnm,
      uEmail: email,
      uPhone: phone,
      uComment: comment,
    });
  }, [isEdit]);

  const type = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const deleteUser = async () => {
    try {
      const response = await axios.post(`${serverUrl}/user/delete`, { email });
      console.log(response);
      if (response.status === 200) {
        setUsersArr((prev) => {
          return prev.filter((e) => e.email !== email);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    //validation
    let unvalid = false;
    if (!namePattern.test(uFnm)) {
      setFnmValid(false);
      unvalid = true;
    } else setFnmValid(true);

    if (!namePattern.test(uLnm)) {
      setLnmValid(false);
      unvalid = true;
    } else setLnmValid(true);
    if (!emailPattern.test(uEmail)) {
      setEmailValid(false);
      unvalid = true;
    } else setEmailValid(true);
    if (!phonePattern.test(uPhone)) {
      setPhoneValid(false);
      unvalid = true;
    } else setPhoneValid(true);
    if (unvalid) return;

    try {
      const response = await axios.put(`${serverUrl}/user/edit`, {
        ...newUser,
        id,
      });
      if (response.status === 200) {
        setIsEdit(false);
        setOriginalUser(response.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative border-2 rounded-md w-96 p-3 transition-all hover:scale-105 tracking-wider">
      {isEdit ? (
        <form className="flex flex-col items-start gap-2">
          <div className="flex gap-3 mb-2">
            <span>
              <p>{`First name: `}</p>
              <input
                className={`tracking-wider border-0 border-b-2 rounded-md bg-gray-900 bg-opacity-50 h-7 pl-1 ${
                  fnmValid ? "border-gray-600" : "border-red-600"
                }`}
                type="text"
                value={uFnm}
                name="uFnm"
                placeholder="fnm"
                onChange={type}
              />
            </span>
            <span>
              <p>{`Last name: `}</p>
              <input
                className={`tracking-wider border-0 border-b-2 rounded-md bg-gray-900 bg-opacity-50 h-7 pl-1 ${
                  lnmValid ? "border-gray-600" : "border-red-600"
                }`}
                type="text"
                value={uLnm}
                name="uLnm"
                placeholder="lnm"
                onChange={type}
              />
            </span>
          </div>
          <span className="flex gap-2 self-stretch">
            <p>{`Email: `}</p>
            <input
              className={`tracking-wider border-0 border-b-2 rounded-md bg-gray-900 bg-opacity-50 h-5 pl-1 w-full ${
                emailValid ? "border-gray-600" : "border-red-600"
              }`}
              type="text"
              value={uEmail}
              name="uEmail"
              placeholder="email"
              onChange={type}
            />
          </span>
          <span className="flex gap-2 self-stretch">
            <p>{`Phone: `}</p>
            <input
              className={`tracking-wider border-0 border-b-2 rounded-md bg-gray-900 bg-opacity-50 h-5 pl-1 w-full ${
                phoneValid ? "border-gray-600" : "border-red-600"
              }`}
              type="text"
              value={uPhone}
              name="uPhone"
              placeholder="phone"
              onChange={type}
            />
          </span>
          <span className="flex flex-col gap-2">
            <p>{`Comment: `}</p>
            <textarea
              className={`tracking-wider border-0 border-b-2 rounded-md bg-gray-900 bg-opacity-50 pl-1 w-64 border-gray-600`}
              type="text"
              placeholder="comment"
              name="uComment"
              value={uComment}
              onChange={type}
            />
          </span>
        </form>
      ) : (
        <div>
          <p className="text-3xl text-red-600">{`${fnm} ${lnm}`}</p>
          <p>{`Email: ${email}`}</p>
          <p>{`Phone number: ${phone}`}</p>
          <p>{`Comment: ${comment}`}</p>
        </div>
      )}
      <div className="absolute right-2 bottom-2 flex gap-2">
        <div
          className="hover:cursor-pointer text-white hover:bg-gray-900 rounded-full flex p-2"
          onClick={() => {
            isEdit ? setIsEdit(false) : setIsEdit(true);
          }}
        >
          {isEdit ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faPencil} />
          )}
        </div>
        <div
          className="hover:cursor-pointer text-white hover:bg-gray-900 rounded-full flex p-2"
          onClick={() => {
            isEdit ? updateUser() : deleteUser();
          }}
        >
          {isEdit ? (
            <FontAwesomeIcon icon={faFloppyDisk} />
          ) : (
            <FontAwesomeIcon icon={faTrashCan} />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
