import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import router from './routers';

const app = express();
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

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