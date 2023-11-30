import express from "express"
import morgan from "morgan"
import cors from 'cors'
import tasksroutes from './routes'
import bodyParser from "body-parser"

const session = require('express-session')
const app = express();

const whiteList = [
    'http://localhost:8100',
    'http://localhost:5173'
]

app.use(cors({
    origin: whiteList
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use("/api", tasksroutes);
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false
}));

export default app;