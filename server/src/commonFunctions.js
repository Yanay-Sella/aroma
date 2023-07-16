const pool = require("./database/db.js");

const validate = async (fnm, lnm, email, phone, comment, branch) => {
  console.log("validating...");
  const namePattern = /^[a-z]{1,10}$/i; //first and last
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern = /^0\d{9}$/;

  if (!fnm || !lnm || !email || !phone || !branch) return false;

  if (!namePattern.test(fnm) || !namePattern.test(lnm)) return false;
  if (!emailPattern.test(email)) return false;
  if (!phonePattern.test(phone)) return false;
  if (!namePattern.test(branch)) return false;

  if (typeof comment !== "string") return false;

  try {
    const existingBranch = await pool.query(
      "SELECT * FROM branches WHERE bname=$1",
      [branch]
    );
    console.log(existingBranch.rows.length);
    if (existingBranch.rows.length == 0) return false;
  } catch (error) {
    console.log(error);
  }

  console.log("Validation passed");
  return true;
};

const checkConflict = async (email, phone, id = 0) => {
  let existingUser;
  let conflict = "";

  existingUser = await pool.query(
    "SELECT * FROM users WHERE (email=$1 AND id!=$2)",
    [email, id]
  );
  existingUser = existingUser.rows[0];
  if (existingUser) {
    conflict = "e"; //email conflict
  }
  existingUser = await pool.query(
    "SELECT * FROM users WHERE (phone=$1 AND id!=$2)",
    [phone, id]
  );
  existingUser = existingUser.rows[0];
  if (existingUser) {
    conflict = conflict + "p"; //phone conflict
  }

  return conflict;
};

module.exports = { validate, checkConflict };
