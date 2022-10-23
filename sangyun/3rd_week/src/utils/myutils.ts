import express from 'express';

function asyncWrap(asyncController : express.RequestHandler) {
  return async (...[req, res, next] : Parameters<express.RequestHandler>) => {
		  try {
        await asyncController(req, res, next)
      }
      catch(error) {
        next(error);
      }
  };
}

function checkDataIsNotEmpty(targetData : {[key : string] : any}) {
  Object.keys(targetData).forEach(key => {
    if (!targetData[key])
      throw {status: 400, message: `plz fill ${key}`};
  });
}



export {asyncWrap, checkDataIsNotEmpty};