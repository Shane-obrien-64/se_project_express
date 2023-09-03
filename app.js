const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes");

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "64e0c50199ceeb398f5f8cb3",
//   };
//   next();
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
