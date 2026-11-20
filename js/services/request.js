
const API_URL = "https://jsonplaceholder.typicode.com";

export async function request(path, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(function () {
        controller.abort();
    }, 8000);

    try {

        const response = await fetch(API_URL + path, {

            ...options,

            headers: {
                "Content-Type": "application/json"
            },

            signal: controller.signal

        });

        if (!response.ok) {
            throw new Error("HTTP_ERROR");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        if (error.name === "AbortError") {
            throw new Error("TIMEOUT");
        }

        throw error;

    } finally {

        clearTimeout(timeout);

    }
}
