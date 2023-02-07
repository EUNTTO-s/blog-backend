const NODE_ENV = process.env.NODE_ENV;
const appendPath = NODE_ENV? `${NODE_ENV}`: '.';
const domain = process.env.HOST_URL || `http://localhost:${process.env.PORT || 5500}/${appendPath}`;

export {
  domain
};