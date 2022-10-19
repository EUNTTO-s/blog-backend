function asyncWrap(asyncController) {
  return async (req, res, next) => {
		  try {
        await asyncController(req, res, next)
      }
      catch(error) {
        next(error);
      }
  };
}

module.exports = asyncWrap;