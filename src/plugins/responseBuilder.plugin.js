const responseBuilder = (response, status, data = {}, message = null) => {
  response.status(status).send({
    code: status,
    message: message,
    data: data,
  });
};

module.exports = responseBuilder;
