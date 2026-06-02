import { createServer, Model, Response } from "miragejs"

// DISCLAIMER: This whole file is extremely naive mock-user authentication. 
// I'm only doing it this way for the sake of showcasing login routing features

createServer({
    models: {
        vans: Model,
        users: Model
    },

    seeds(server) {
        server.create("user", { id: "123", email: "b@b.com", password: "p123", name: "Bob" })
    },

    routes() {
        this.namespace = "api"
        this.passthrough("https://firestore.googleapis.com/**")

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }
            foundUser.password = undefined
            return {
                user: foundUser,
                token: "Enjoy your pizza, here's your tokens."
            }
        })
    }
})