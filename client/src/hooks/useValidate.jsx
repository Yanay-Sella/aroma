import { useState } from "react";

const useValidate = ({ fnm, lnm, email, phone }) => {
  //validation
  const namePattern = /^[a-z]{1,10}$/i; //first and last
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern = /^0\d{9}$/;

  const [fnmValid, setFnmValid] = useState(true);
  const [lnmValid, setLnmValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const checkValidate = () => {
    console.log(email);
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

    return !unvalid;
  };

  const resetValidation = () => {};
  return {
    fnmValid,
    lnmValid,
    emailValid,
    phoneValid,
    checkValidate,
    setPhoneValid,
    setEmailValid,
  };
};

export default useValidate;
