import { Navigate } from "react-router-dom";


export async function apiFetch(url, options = {}) {
    try {
        const headers = options.headers || {};
        const response = await fetch(url, {
            ...options,
            headers: {
                ...headers,
            },
            credentials: "include"
        });

        if ( response.status === 403 ||response.status === 401) {
            console.error("Unauthorized, token");
            return response;
        }

        return response;
    }
    catch (error) {
        console.error("API fetch error:", error);
        return null;

    }
}