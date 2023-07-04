const getAllUsers = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const handleSignUp = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json({ message: "gg" });
  } catch (error) {
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
