import { parseCookies, setCookie, destroyCookie } from 'nookies';

// Set user cookie
export const setUserCookie = (user: { username: string; token: string; role: string; gymId: string }) => {
  setCookie(null, 'user', JSON.stringify(user), {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

// Get user from cookie
export const getUserFromCookie = (req?: any) => {
  const cookies = parseCookies({ req });
  return cookies.user ? JSON.parse(cookies.user) : null;
};

// Logout function
export const logout = () => {
  destroyCookie(null, 'user', { path: '/' });
  window.location.href = '/signin';
};
