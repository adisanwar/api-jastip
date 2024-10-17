import supertest from "supertest";
import {web} from "../application/web";
import {logger} from "../application/logging";
import {UserTest} from "./test-util";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                email: "",
                isAdmin: ""
            });

        // logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should register new user', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                email: "test",
                isAdmin: true
            });

        // logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test");
        expect(response.body.data.isAdmin).toBe(true);
    });

});

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to login', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            });

        // logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test");
        expect(response.body.data.token).toBeDefined();
    });

    it('should reject login user if username is wrong', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salah",
                password: "test"
            });

        // logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject login user if password is wrong', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "salah"
            });

        // logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to get user', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test");

        // logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });

    it('should reject get user if token is invalid', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "salah");

        // logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should reject update user if request is invalid', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "",
                email: ""
            });

        // logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update user if token is wrong', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                password: "benar",
                email: "benar"
            });

        // logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                email: "benar"
            });

        // logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("benar");
    });

    it('should be able to update user password', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar"
            });
    
        // logger.debug(response.body);
        expect(response.status).toBe(200);
    
        // Retrieve the user ID from the response or from the UserTest.create()
        const user = await UserTest.get("test"); // Pass the ID of the user created
        expect(await bcrypt.compare("benar", user.password)).toBe(true);
    });
    
    describe('DELETE /api/users/current', () => {
        let userId: string; // Declare a variable to hold the user ID
    
        beforeEach(async () => {
            const user = await UserTest.create();
            userId = user.id; // Store the user ID after creating the user
        });
    
        afterEach(async () => {
            await UserTest.delete();
        });
    
        it('should be able to logout', async () => {
            const response = await supertest(web)
                .delete("/api/users/current")
                .set("X-API-TOKEN", "test");
    
            // logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data).toBe("OK");
    
            const user = await UserTest.get(userId); // Pass the user ID here
            expect(user.token).toBeNull();
        });
    
        it('should reject logout user if token is wrong', async () => {
            const response = await supertest(web)
                .delete("/api/users/current")
                .set("X-API-TOKEN", "salah");
    
            // logger.debug(response.body);
            expect(response.status).toBe(401);
            expect(response.body.errors).toBeDefined();
        });
    });
})    