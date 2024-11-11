import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateRegistration } from '../utils/validation';
import registerUser from '../services/authService';

export default function useRegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const isPasswordMatch = formData.password === formData.confirmPassword;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validation = validateRegistration(formData);

        if (!validation.isValid) {
            toast.error(validation.message);
            return;
        }

        try {
            const { username, email, password } = formData;
            const response = await registerUser({ username, email, password });

            if (response.status === 201) {
                toast.success('تم انشاء الحساب بنجاح');
                localStorage.setItem('chat-app-user', JSON.stringify(response.data.data.user));
                navigate('/chat');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isPasswordMatch
    };
}