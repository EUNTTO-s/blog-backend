import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routers';

const app = express();
app.use(express.json());

import morgan from 'morgan';
app.use(morgan('combined'));

app.use(router);

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// JUST EXAMPLE FOR TYPE_선언.
let BUILD_MODE_PRODUCTION  = true;
if (BUILD_MODE_PRODUCTION) {
}