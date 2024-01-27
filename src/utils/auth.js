import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp;

  const now = Math.floor(Date.now() / 1000);
  return now < expirationTime;
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
 const decodedUser = jwtDecode(token);
 return decodedUser;
}