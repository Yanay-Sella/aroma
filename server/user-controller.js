const pool = require("./database/db.js");

const getAllUsers = async (req, res) => {
  try {
    return res.status(200).json({ message: `gg` });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const handleSignUp = async (req, res) => {
  try {
    console.log(req.body);
    const { fnm, lnm, email, phone, comment } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (fnm, lnm, email, phone, comment) values ($1, $2, $3, $4, $5)",
      [fnm, lnm, email, phone, comment]
    );
    console.log(`user ${fnm} added succefully`);
    return res.status(200).json({ message: `user ${fnm} added succefully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleDelete = async (req, res) => {
  console.log("delete");
};

const handleEdit = async (req, res) => {
  console.log("edit");
};

module.exports = { getAllUsers, handleDelete, handleEdit, handleSignUp };
