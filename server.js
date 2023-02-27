import express from 'express';
import { APP_PORT, DB_URL } from './config/index.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';

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


app.use(express.json());
app.use( routes);
//app.use(express.json());

app.use(errorHandler);
app.listen(APP_PORT, () => {console.log(`listening on port${APP_PORT}`)})