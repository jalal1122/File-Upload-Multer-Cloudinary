class ApiError extends Error {
  constructor(message, statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message || "An error occurred";
  }
}
