import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
//Route
import UserRoute from "./routes/UserRoute.js";
import versiRoute from "./routes/VersiRoute.js";
import wilayahRoute from "./routes/WilayahRoute.js";



const app = express();

mongoose.connect('mongodb://localhost:27017/ikionline');

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//check middleware
const apiKeyCheck = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (apiKey && apiKey === '7c6c5f1b6e2d5a22781a8b7d7e761c8b9f79230f') {
        next();
    } else {
        res.status(401).json({
            error: 'Unauthorized. Invalid Api Key'
        });
    }
}



app.use(apiKeyCheck);

app.use(wilayahRoute);
app.use(UserRoute);
app.use(versiRoute);
app.use((req, res, next) => {
    res.status(404).json({
        error: 'bad request'
    });
})

app.listen(5001, () => console.log('Server up and running...'));