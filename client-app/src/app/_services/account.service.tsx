var baseUrl = process.env.NEXT_PUBLIC_API_PATH;
import { destroyCookie } from 'nookies';
import { setUserCookie } from '../_lib/auth';

export const loginUser = async (model: any): Promise<User | null> => {
    try {
        const res = await fetch(`${baseUrl}api/account/login`, {
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
        const mockUser = {
            username: user.username,
            token: user.token,
            role: user.role,
            gymId: user.gymId
          };
        setUserCookie(mockUser);
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
    user.gymId = token?.gym_id;

    localStorage.setItem('user', JSON.stringify(user));
    return user;
}


export const logoutUser = () => {
    localStorage.removeItem('user');
    destroyCookie(null, 'user', { path: '/' });

}

export const getDecodedToken = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
}


