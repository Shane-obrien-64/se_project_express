const INVALID_REQUST = {
  name: "validationError",
  code: 400,
  message: "Invalid data",
};

const NOT_FOUND = {
  name: "notFoundError",
  code: 404,
  message: "Not found",
};

const SERVER_ERROR = {
  name: "serverError",
  code: 500,
  message: "Server error",
};

module.exports = {
  INVALID_REQUST,
  NOT_FOUND,
  SERVER_ERROR,
};
