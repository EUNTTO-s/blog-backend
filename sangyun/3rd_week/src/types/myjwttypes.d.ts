import jwt from 'jsonwebtoken';

declare global {
  type JwtIDPayload = jwt.JwtPayload & {id : string};
}