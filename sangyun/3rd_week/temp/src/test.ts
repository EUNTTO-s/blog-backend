import express from 'express';

import sc from './module/custom-module';

const app = express();
app.use(express.json());

app.get("/test", sc.test);

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});