const express = require("express");

const router = express.Router();

const {
  handleSignUp,
  handleDelete,
  handleEdit,
  getAllUsers,
  getAllData,
  getAllFoods,
  getAllBranches,
} = require("./user-controller.js");

router.post("/signup", handleSignUp);
router.post("/delete", handleDelete);

router.put("/edit", handleEdit);

router.get("/", getAllUsers);
router.get("/data", getAllData);
router.get("/foods", getAllFoods);
router.get("/branches", getAllBranches);

module.exports = router;
