const express = require("express");

const router = express.Router();

const {
  handleSignUp,
  handleDelete,
  handleEdit,
  getAllUsers,
  getAllBranches,
} = require("./user-controller.js");

router.post("/signup", handleSignUp);
router.post("/delete", handleDelete);
router.put("/edit", handleEdit);
router.get("/", getAllUsers);
router.get("/branches", getAllBranches);

module.exports = router;
