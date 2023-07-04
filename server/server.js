require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./database/db.js");

const userRoutes = require("./user-routes.js");

const port = 5000;
const app = express();
const clientURL = process.env.CLIENT_URL;

//middleware
app.use(cors({ origin: clientURL }));
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
