process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('./app');

describe("POST /", () => {
    test("Submit names & get back name and bio", async () => {
        const validRequestBody = {
            users: ["elie", "joelburton"]
        };

        const res = await request(app).post('/').send(validRequestBody);
        const users = res.body; // Assuming the response body is an array of users

        expect(res.status).toBe(200);

        // Check if `users` is defined and is an array
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);

        // Check each user in the array
        users.forEach(user => {
            // Check if `user` is defined and has the expected properties
            expect(user).toBeDefined();
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('bio');
            console.log(`Name: ${user.name}, Bio: ${user.bio}`);
        });

        console.log('Test 1 passed');
    });
});


test("Handle errors and return 500 status", async () => {

    let invalidRequestBody = {
        "developers": null,
    };
    const res = await request(app).post('/').send(invalidRequestBody);
    expect(res.status).toBe(500)
    console.log('Test 2 passed');

});



