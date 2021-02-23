
import express from 'express';

const app = express();

app.get("/", (request, response) => {
    return response.json({status: 200, message: 'API runing!'})
})

app.get("/users", (request, response) => {
    return response.json({message: "Hello World #NLW4!"})
})

app.post("/users", (request, response) => {
    return response.json({message: "Os dados foram salvos com sucesso!"})
})

app.listen(3333, () => console.log("server is runing!"))