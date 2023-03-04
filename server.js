import express from 'express';
import { APP_PORT, DB_URL } from './config/index.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set global variable for root directory of the application
global.appRoot = path.resolve();

// Database connection
    (mongoose.connect('mongodb://127.0.0.1:27017/restapi'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

const app = express();

global.aapRoot = path.resolve(__dirname);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use( routes);
//app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);
app.listen(APP_PORT, () => {console.log(`listening on port${APP_PORT}`)})