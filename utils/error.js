const checkEmpty = (result, message) => {
  if (!result || (Array.isArray(result) && result.length === 0)) {
    const error = new Error(message);
  error.statusCode = 404;
  throw error;
  }
  return result;
};
const throwError=(message,statusCode)=>{
  const error= new Error(message);
  error.statusCode=statusCode;
  throw error
}
const checkId=(id)=>{
  if (!id) {
    throwError("Please Provide an id",400)
  }

  if (isNaN(id)) {
    throwError("Id must be a number",400)
  }
}
module.exports={checkEmpty,throwError,checkId}