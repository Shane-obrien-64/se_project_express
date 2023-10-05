require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;
console.log(JWT_SECRET);

module.exports = {
  NODE_ENV,
  JWT_SECRET,
};
