const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes");
const { createUser, login } = require("./controllers/user");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64e0c50199ceeb398f5f8cb3",
  };
  next();
});

app.use(routes);

app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
