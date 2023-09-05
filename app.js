const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
