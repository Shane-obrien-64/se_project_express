require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;
console.log(JWT_SECRET);
// const JWT_SECRET = "9Zp@-#RtW7$%Y";

module.exports = {
  NODE_ENV,
  JWT_SECRET,
};
