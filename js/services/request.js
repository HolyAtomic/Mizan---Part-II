
const API_URL = "https://jsonplaceholder.typicode.com";

export async function request(path, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(function () {
        controller.abort();
    }, 8000);

    try {

        let url = API_URL + path;

        // check if path rah full url
        if (path.startsWith("http")) {
            url = path;
        }

        const response = await fetch(url, {

            ...options,

            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },

            signal: controller.signal

        });

        if (!response.ok) {

            throw {
                type: "http",
                status: response.status,
                message: "HTTP request failed"
            };

        }

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();

        return data;

    } catch (error) {

        if (error.type) {
            throw error;
        }

        if (error.name === "AbortError") {

            throw {
                type: "timeout",
                status: 0,
                message: "Request timed out"
            };

        }

        if (!navigator.onLine) {

            throw {
                type: "offline",
                status: 0,
                message: "No internet connection"
            };

        }

        if (error instanceof SyntaxError) {

            throw {
                type: "parse",
                status: 0,
                message: "Invalid JSON response"
            };

        }

        throw {
            type: "network",
            status: 0,
            message: "Network error"
        };

    } finally {

        clearTimeout(timeout);

    }
}
