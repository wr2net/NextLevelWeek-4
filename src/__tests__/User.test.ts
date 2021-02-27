import request from 'supertest';
import {app} from "../app";

import createConnect from '../database'
import {getConnection} from "typeorm";

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnect()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "use@example.com",
            name: "User Example"
        })
        expect(response.status).toBe(201)
    })

    it("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            email: "use@example.com",
            name: "User Example"
        })
        expect(response.status).toBe(400)
    })

    it("Should be able to get all users", async () => {
        await request(app).post("/users").send({
            email: "use2@example.com",
            name: "User Example"
        })
        const response = await request(app).get("/users")
        expect(response.body.length).toBe(2)
    })
})

