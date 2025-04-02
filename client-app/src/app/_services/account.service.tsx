var defaultUrl = process.env.NEXT_PUBLIC_API_PATH;

export const loginUser = async (model: any): Promise<User | null> => {
    try {
        const res = await fetch(`${defaultUrl}/api/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await res.json();

        const user = setCurrentUser(data);

        return user;
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return null;
    }
}

export const setCurrentUser = (user: User) : User=> {
    if (!user || !user.token) {
        console.error("Invalid user object or token");
        return user;
    }

    user.role = "";
    const token = getDecodedToken(user.token);
    console.log("token " + JSON.stringify(token));
    const roles = token?.role;
    console.log("roles " + roles);
    user.role = token?.role;

    // if (Array.isArray(roles)) {
    //     user.roles = roles;
    // } else if (roles) {
    //     user.roles.push(roles);
    // }

    localStorage.setItem('user', JSON.stringify(user));
    return user;
}


export const logoutUser = () => {
    localStorage.removeItem('user');
}

export const getDecodedToken = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
}


