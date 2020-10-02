function sendInvalidJsonError(res, jsonError, statusCode) {
  const status = jsonError.status || statusCode;
  res.status(status).send(jsonError);
}

function expressMiddleware(
    validatorObj,
    statusCode = 400,
) {
  return (req, res, next) => {
    if (validatorObj.validate(req.body)) {
      next();
    } else sendInvalidJsonError(res, validatorObj.errors, statusCode);
  };
}

module.exports = expressMiddleware;
