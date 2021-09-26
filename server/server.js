require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.DB_PORT || 3000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});
