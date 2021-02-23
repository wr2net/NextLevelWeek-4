import 'reflect-metadata'
import express from 'express';
import './database';
import {router} from "./routes";

const app = express();

app.use(express.json())
app.use(router)
app.get("/", (request, response) => {
    return response.status(200).json({status: 200, message: 'API runing!'})
})

app.listen(3333, () => console.log("server is runing!"))