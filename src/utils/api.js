import { Navigate } from "react-router-dom";


export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = options.headers || {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
        }
    });




    if ( response.status === 403 ||response.status === 401) {
        localStorage.removeItem("token");      
        console.error("Unauthorized, token removed");
        window.location.href = "/login";
        return;
    }

    

    
    return response;
}