import express, {Request, Response} from 'express';
import { yellow, red, blue, green } from 'cli-color';
import type { TokenIndexer } from 'morgan';

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

function bodyText(req: Request) {
  let bodyText = '';
  if (req.method !== 'GET') {
    bodyText = `${yellow('BODY\t|')}`;
    bodyText +=
      Object.keys(req.body)
        .map((key, index) => {
          return `${index === 0 ? '' : '\t' + yellow('|')} ${green.italic(
            key
          )} ${req.body[key]}`;
        })
        .join('\n') + '\n';
  }
  return bodyText;
}

function morganCustomFormat(tokens: TokenIndexer<Request, Response>, req: Request, res: Response) {
  return [
    `\n= ${red('MESSAGE')} =`,
    '\n',
    `${blue('URL\t| ')}`,
    tokens.url(req, res),
    '\n',
    `${blue('METHOD\t| ')}`,
    tokens.method(req, res),
    '\n',
    bodyText(req),
    `${blue('STATUS\t| ')}`,
    tokens.status(req, res),
    '\n',
    `${blue('RESP\t| ')}`,
    tokens['response-time'](req, res),
    'ms',
    `${blue('\nDATE\t|')} `,
    new Date().toLocaleTimeString(),
    '\n',
  ].join('');
}

export {
  asyncWrap,
  checkDataIsNotEmpty,
  morganCustomFormat,
};