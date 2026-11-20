
import { request } from "./services/request.js";

async function testAPI() {

    try {

        const data = await request("/wrong-endpoint");

        console.log(data);

    } catch (error) {

        console.log("Error type:", error.type);
        console.log("Error status:", error.status);
        console.log("Error message:", error.message);

    }

}

testAPI();
