const checkEmpty = (result, message) => {
  if (!result || (Array.isArray(result) && result.length === 0)) {
    const error = new Error(message);
  error.statusCode = 404;
  throw error;
  }
  return result;
};

module.exports={checkEmpty}