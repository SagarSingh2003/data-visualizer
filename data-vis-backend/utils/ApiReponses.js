import { responses } from "../constants/ApiResponse.js";

class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  successful(message = "Successful", data = null) {
    return this.res.status(responses.successful.status).json({
      ...responses.successful.message,
      msg: message,
      data: data || null,
    });
  }

  badRequest(message = "Bad Request") {
    return this.res
      .status(responses.badRequest.status)
      .json(responses.badRequest.message);
  }

  unauthorized(message = "Unauthorized") {
    return this.res
      .status(responses.unauthorized.status)
      .json(responses.unauthorized.message);
  }

  forbidden(message = "Forbidden") {
    return this.res
      .status(responses.forbidden.status)
      .json(responses.forbidden.message);
  }

  notFound(message = "Not Found") {
    return this.res
      .status(responses.notFound.status)
      .json(responses.notFound.message);
  }

  internalServerError(message = "Internal Server Error") {
    return this.res
      .status(responses.internalServerError.status)
      .json(responses.internalServerError.message);
  }

  customError(status, message) {
    return this.res.status(status).json({ msg: message });
  }
}

export default ApiResponse;
