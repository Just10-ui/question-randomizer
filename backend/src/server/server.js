import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/router.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use('/api', router);

app.listen(port, () => {
  console.log(`PORT running on http://localhost:${port}`);
});