import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faFloppyDisk,
  faXmark,
  faHourglass,
  faCircleExclamation,
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

  const [isLoading, setIsloading] = useState(false);
  const [fail, setFail] = useState(false);

  const [failMsg, setFailMsg] = useState("error");

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
    setFail(false);
    setIsloading(false);
    setFnmValid(true);
    setLnmValid(true);
    setEmailValid(true);
    setPhoneValid(true);
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
      setIsloading(true);
      const response = await axios.put(`${serverUrl}/user/edit`, {
        ...newUser,
        id,
      });
      if (response.status === 200) {
        setTimeout(() => {
          setIsEdit(false);
          setIsloading(false);
        }, 1500);
        setOriginalUser(response.data);
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
          setIsloading(false);
        }, 1500);
      }
    }
  };

  return (
    <div className="hover:shadow-md hover:shadow-gray-700 relative border-2 rounded-md w-96 p-3 transition-all hover:scale-105 tracking-wider bg-gray-950 bg-opacity-95">
      {isEdit ? (
        <form className="flex flex-col items-start gap-2">
          <span className="flex gap-3 mb-2 self-center">
            <span className="flex flex-col">
              <p className={`text-red-600`}>{`First name: `}</p>
              <input
                className={`tracking-wider border-0 border-b-2 rounded-t-md bg-gray-900 bg-opacity-50 h-7 ${
                  fnmValid ? "border-gray-600" : "border-red-600"
                }`}
                type="text"
                value={uFnm}
                name="uFnm"
                placeholder="fnm"
                onChange={type}
              />
            </span>
            <span className="flex flex-col">
              <p className={`text-red-600`}>{`Last name: `}</p>
              <input
                className={`tracking-wider border-0 border-b-2 rounded-t-md bg-gray-900 bg-opacity-50 h-7 ${
                  lnmValid ? "border-gray-600" : "border-red-600"
                }`}
                type="text"
                value={uLnm}
                name="uLnm"
                placeholder="lnm"
                onChange={type}
              />
            </span>
          </span>
          <span className="flex gap-2 self-stretch">
            <p className={`text-red-600`}>{`Email: `}</p>
            <input
              className={`tracking-wider border-0 border-b-2 rounded-t-md bg-gray-900 bg-opacity-50 h-5 pl-1 w-full ${
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
            <p className={`text-red-600`}>{`Phone: `}</p>
            <input
              className={`tracking-wider border-0 border-b-2 rounded-t-md bg-gray-900 bg-opacity-50 h-5 pl-1 w-full ${
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
            <p className={`text-red-600`}>{`Comment: `}</p>
            <textarea
              className={`tracking-wider border-2 rounded-md bg-gray-900 bg-opacity-50 pl-1 w-64 border-gray-600`}
              type="text"
              placeholder="comment"
              name="uComment"
              value={uComment}
              onChange={type}
            />
          </span>
          {fail && (
            <div className="flex gap-2 items-end text-red-600">
              <p className="text-red-600">
                <FontAwesomeIcon icon={faCircleExclamation} /> {"    "}
                {failMsg}
              </p>
            </div>
          )}
        </form>
      ) : (
        <div className="w-72 flex flex-col gap-1">
          <p className="text-3xl text-red-600 mb-1">{`${fnm} ${lnm}`}</p>
          <div className="flex gap-2">
            <p className="text-red-600 ">{"Email:"}</p>
            <p>{`${email}`}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-red-600 ">{`Phone number:`}</p>
            <p>{`${phone}`}</p>
          </div>
          <div>
            <p className="text-red-600 ">{`Comment:`}</p>
            <p>{`${comment}`}</p>
          </div>
        </div>
      )}

      <div className={`absolute bottom-2 ${isLoading ? "right-6" : "right-2"}`}>
        {isLoading ? (
          <div>
            <FontAwesomeIcon icon={faHourglass} spin />
          </div>
        ) : (
          <div className="flex gap-2">
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
        )}
      </div>
    </div>
  );
};

export default User;
