import express from 'express';
import router from '../routes/router.js';
import dotenv from 'dotenv';
import { crossOrig, parseJson } from '../middleware/middleware.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(crossOrig);
app.use(parseJson);
app.use('/api', router);

app.listen(port, () => {
  console.log(`PORT is running on http://localhost:${port}`);
});