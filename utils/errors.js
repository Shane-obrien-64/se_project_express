const INVALID_REQUEST = {
  name: "ValidationError",
  code: 400,
  message: "Invalid data",
};

const NOT_FOUND = {
  name: "DocumentNotFoundError",
  code: 404,
  message: "Not found",
};

const SERVER_ERROR = {
  name: "serverError",
  code: 500,
  message: "Server error",
};

const CONFLICT_ERROR = {
  name: "MongoServerError",
  code: 409,
  message: "Email aleady exists",
};

const AUTHORIZATION_ERROR = {
  name: "authorizationError",
  code: 401,
  message: "Incorrect email or password",
};

module.exports = {
  INVALID_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT_ERROR,
  AUTHORIZATION_ERROR,
};
