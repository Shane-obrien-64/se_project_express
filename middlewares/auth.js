const jwt = require("jsonwebtoken");
const { AUTHORIZATION_ERROR } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(AUTHORIZATION_ERROR.code)
      .send({ message: AUTHORIZATION_ERROR.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res
      .status(AUTHORIZATION_ERROR.code)
      .send({ message: AUTHORIZATION_ERROR.message });
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
