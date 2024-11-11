import axios from 'axios';
import { registerRoute, loginRoute } from '../utils/APIRoutes';

export default async function registerUser(userData) {
    const response = await axios.post(registerRoute, userData);
    return response;
}

export const loginUser = async(email, password) => {
    const response = await axios.post(loginRoute, { email, password }, { withCredentials: true });
    return response.data;
};