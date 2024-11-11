import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

export default async function registerUser(userData) {
    const response = await axios.post(registerRoute, userData);
    return response;
}