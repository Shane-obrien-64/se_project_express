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

module.exports = {
  INVALID_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
};
