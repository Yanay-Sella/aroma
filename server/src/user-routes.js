const express = require("express");

const router = express.Router();

const {
  handleSignUp,
  handleDelete,
  handleEdit,
  getAllUsers,
} = require("./user-controller.js");

router.post("/signup", handleSignUp);
router.post("/delete", handleDelete);
router.put("/edit", handleEdit);
router.get("/", getAllUsers);

module.exports = router;
