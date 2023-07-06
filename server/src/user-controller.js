const pool = require("./database/db.js");

const { validate, checkConflict } = require("./commonFunctions.js");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users ORDER BY id");
    return res.status(200).json(allUsers.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleSignUp = async (req, res) => {
  try {
    let { fnm, lnm, email, phone, comment } = req.body;
    email = email.toLowerCase();

    if (!validate(fnm, lnm, email, phone, comment)) {
      return res.status(400).json({ message: "input not valid" });
    }

    const conflict = await checkConflict(email, phone);
    if (conflict !== "")
      return res.status(409).json({ message: "conflict", conflict });

    const newUser = await pool.query(
      "INSERT INTO users (fnm, lnm, email, phone, comment) values ($1, $2, $3, $4, $5) RETURNING *",
      [fnm, lnm, email, phone, comment]
    );
    console.log("User added");
    return res.status(200).json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleEdit = async (req, res) => {
  try {
    const newUser = req.body;
    let {
      uFnm: fnm,
      uLnm: lnm,
      uEmail: email,
      uPhone: phone,
      uComment: comment,
      id,
    } = newUser;
    email = email.toLowerCase();

    if (!validate(fnm, lnm, email, phone, comment))
      return res.status(400).json({ message: "input not valid" });

    const conflict = await checkConflict(email, phone, id);
    if (conflict !== "")
      return res.status(409).json({ message: "conflict", conflict });

    const updatedUser = await pool.query(
      "UPDATE users SET fnm=$1, lnm=$2, email=$3, phone=$4, comment=$5 WHERE id=$6 RETURNING *",
      [fnm, lnm, email, phone, comment, id]
    );
    console.log("User updated!");
    return res.status(200).json(updatedUser.rows[0]);
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
    console.log("User deleted");
    return res.status(200).json(deletedUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = { getAllUsers, handleDelete, handleEdit, handleSignUp };
