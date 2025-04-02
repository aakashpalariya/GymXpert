var BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const fetchWithAuth = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', // Default is GET
    options: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;

    var authToken = "";
    const user = getUserFromLocalStorage();
    if (user) {
        authToken = user.token;
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        ...options.headers, // Merge with any additional headers passed in options
    };

    // Prepare body if needed (e.g., for POST or PUT requests)
    const body = options.body ? JSON.stringify(options.body) : undefined;

    // Make the request with dynamic method and body
    const res = await fetch(url, {
        method,
        headers,
        body,
        ...options,
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    const data: T = await res.json();
    return data;
};


function getUserFromLocalStorage(): User | null {
    if (typeof window !== 'undefined') {
        // Get the user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                // Parse the stored data to JSON and return it
                return JSON.parse(storedUser) as User;
            } catch (error) {
                console.error("Error parsing user data:", error);
                return null;
            }
        }
    }
    return null;
}
