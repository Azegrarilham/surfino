const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in .env.local");
}

/**
 * Fetches data from the backend API.
 * @param endpoint the api endpoint (e.g, '/instructors', '/users/me')
 * @param method the HTTP method (e.g, 'GET', 'POST')
 * @param body the request body for POST/PUT requests
 * @param token the authentication token for the request
 * */
export async function apiRequest<T>(
    endpoint: string,
    method: string = 'GET',
    body?: any,
    token?: string
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(`${BACKEND_URL}${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
        }
        // Handle 204 No Content for successful deletions/updates without response body
        if (response.status === 204) {
            return null as T; // Explicitly return null for no content
        }

        return await response.json();
    } catch (error) {
        console.error(`Error in apiRequest to ${endpoint}:`, error);
        throw error;
    }
}
