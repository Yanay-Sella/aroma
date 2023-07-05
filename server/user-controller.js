const pool = require("./database/db.js");

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

    //validation
    const namePattern = /^[a-z]{1,10}$/i; //first and last
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phonePattern = /^0\d{9}$/;

    if (!namePattern.test(fnm) || !namePattern.test(lnm))
      return res.status(400).json({ message: "Name not valid" });
    if (!emailPattern.test(email))
      return res.status(400).json({ message: "email not valid" });
    if (!phonePattern.test(phone))
      return res.status(400).json({ message: "phone not valid" });
    if (typeof comment !== "string") {
      return res.status(400).json({ message: "comment not valid" });
    }
    //end validation

    const newUser = await pool.query(
      "INSERT INTO users (fnm, lnm, email, phone, comment) values ($1, $2, $3, $4, $5) RETURNING *",
      [fnm, lnm, email, phone, comment]
    );
    console.log(newUser);
    return res.status(200).json(newUser.rows[0]);
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
