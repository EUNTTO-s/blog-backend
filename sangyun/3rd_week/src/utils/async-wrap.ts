import express from 'express';

function asyncWrap(asyncController : express.RequestHandler) {
  return async (req, res, next) => {
		  try {
        await asyncController(req, res, next)
      }
      catch(error) {
        next(error);
      }
  };
}

export default asyncWrap;