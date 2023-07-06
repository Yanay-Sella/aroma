const pool = require("./database/db.js");

const validate = (fnm, lnm, email, phone, comment) => {
  const namePattern = /^[a-z]{1,10}$/i; //first and last
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern = /^0\d{9}$/;

  if (!namePattern.test(fnm) || !namePattern.test(lnm)) return false;
  if (!emailPattern.test(email)) return false;
  if (!phonePattern.test(phone)) return false;
  if (typeof comment !== "string") {
    return false;
  }
  return true;
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    return res.status(200).json(allUsers.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleSignUp = async (req, res) => {
  try {
    const { fnm, lnm, email, phone, comment } = req.body;
    console.log(validate(fnm, lnm, email, phone, comment));
    if (!validate(fnm, lnm, email, phone, comment)) {
      return res.status(400).json({ message: "input not valid" });
    }
    let existingUser;
    let conflict = "";
    //checking if user already exist
    existingUser = await pool.query("SELECT * FROM users WHERE (email=$1)", [
      email,
    ]);
    existingUser = existingUser.rows[0];
    if (existingUser) {
      conflict = "e"; //email conflict
    }
    existingUser = await pool.query("SELECT * FROM users WHERE (phone=$1)", [
      phone,
    ]);
    existingUser = existingUser.rows[0];
    if (existingUser) {
      conflict = conflict + "p"; //phone conflict
    }

    if (conflict !== "")
      return res.status(409).json({ message: "conflict", conflict });

    const newUser = await pool.query(
      "INSERT INTO users (fnm, lnm, email, phone, comment) values ($1, $2, $3, $4, $5) RETURNING *",
      [fnm, lnm, email, phone, comment]
    );
    return res.status(200).json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleDelete = async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE email=$1 RETURNING *",
      [email]
    );
    return res.status(200).json(deletedUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const handleEdit = async (req, res) => {
  //TODO: add conflicts

  try {
    const newUser = req.body;
    const {
      uFnm: fnm,
      uLnm: lnm,
      uEmail: email,
      uPhone: phone,
      uComment: comment,
      id,
    } = newUser;

    if (!validate(fnm, lnm, email, phone, comment))
      return res.status(400).json({ message: "input not valid" });

    const updatedUser = await pool.query(
      "UPDATE users SET fnm=$1, lnm=$2, email=$3, phone=$4, comment=$5 WHERE id=$6 RETURNING *",
      [fnm, lnm, email, phone, comment, id]
    );
    return res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = { getAllUsers, handleDelete, handleEdit, handleSignUp };
