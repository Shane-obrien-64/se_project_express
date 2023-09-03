const jwt = require("jsonwebtoken");
const { AUTHORIZATION_ERROR } = require("../utils/config");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: AUTHORIZATION_ERROR.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
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
