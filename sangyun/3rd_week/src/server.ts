import express from 'express';
import morgan from 'morgan';
import {createApp} from './app';


const app = createApp();
app.use(express.json());

app.use(morgan('combined'));

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// JUST EXAMPLE FOR TYPE_선언.
let BUILD_MODE_PRODUCTION  = true;
if (BUILD_MODE_PRODUCTION) {
}