import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import bodyParser from "body-parser";
const app = express();

mongoose.connect('mongodb://localhost:27017/ikionline');

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(UserRoute);

app.listen(5000, () => console.log('Server up and running...'));