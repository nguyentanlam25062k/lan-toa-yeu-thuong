import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from './config/connectDB.js';
import initWebRoutes from './routes/web.route';

const port = process.env.PORT || 8080;

const app = express();
dotenv.config();

connectDB();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})