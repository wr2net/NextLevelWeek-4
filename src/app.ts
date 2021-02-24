import 'reflect-metadata'
import express from 'express';
import createConnection from './database';
import {router} from "./routes";

createConnection();
const app = express();

app.use(express.json())
app.use(router)
app.get("/", (request, response) => {
    return response.status(200).json({status: 200, message: 'API runing!'})
})

export { app }