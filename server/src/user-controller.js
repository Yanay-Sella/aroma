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

const getAllFoods = async (req, res) => {
  try {
    let allFoods = await pool.query("SELECT * FROM foods");
    allFoods = allFoods.rows.map((e) => e.fname);
    return res.status(200).json(allFoods);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const getAllBranches = async (req, res) => {
  try {
    let allBranches = await pool.query("SELECT bname FROM branches");
    allBranches = allBranches.rows.map((e) => e.bname);
    return res.status(200).json(allBranches);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const getAllData = async (req, res) => {
  try {
    let allBranches = await pool.query("SELECT * FROM branches");
    let loves = await pool.query(
      "SELECT id, food, branch FROM users, loves WHERE userId=id"
    );
    let allUsers = await pool.query("SELECT * FROM users ORDER BY id");

    allBranches = allBranches.rows;
    loves = loves.rows;
    allUsers = allUsers.rows;

    allUsers = allUsers.map((user) => {
      let favFoods = loves.filter((love) => love.id === user.id);
      favFoods = favFoods.map((food) => food.food);
      return { ...user, favFoods };
    });

    allBranches = allBranches.map((e) => {
      const users = allUsers.filter((user) => user.branch === e.bname); //all users in a specific branch
      return { ...e, users };
    });

    let countries = allBranches.map((e) => e.country);
    countries = [...new Set(countries)];
    countries = countries.map((country) => {
      let branches = allBranches.filter((branch) => branch.country === country); //all branches in a specific country
      return { name: country, branches };
    });

    return res.status(200).json({ allBranches, countries });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const handleSignUp = async (req, res) => {
  try {
    let { fnm, lnm, email, phone, comment, branch, favList } = req.body;
    email = email.toLowerCase();

    const valid = await validate(fnm, lnm, email, phone, comment, branch);

    if (!valid) {
      console.log("input not valid");
      return res.status(400).json({ message: "input not valid" });
    }

    const conflict = await checkConflict(email, phone);
    if (conflict !== "")
      return res.status(409).json({ message: "conflict", conflict });

    let newUser;
    newUser = await pool.query(
      "INSERT INTO users (fnm, lnm, email, phone, branch, comment) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [fnm, lnm, email, phone, branch, comment]
    );

    newUser = newUser.rows[0];
    console.log(newUser);
    let newFav;
    await Promise.all(
      favList.map(async (element) => {
        const food = element.toLowerCase();
        newFav = await pool.query(
          "INSERT INTO loves (food, userId) values ($1, $2) RETURNING *",
          [food, newUser.id]
        );
      })
    );
    console.log("User added");
    newFav = newFav.rows[0];
    return res.status(200).json({ newUser, newFav });
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
    console.log(email);
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE email=$1 RETURNING *",
      [email]
    );
    console.log("User deleted");
    return res.status(200).json(deletedUser.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getAllUsers,
  handleDelete,
  handleEdit,
  handleSignUp,
  getAllData,
  getAllFoods,
  getAllBranches,
};
