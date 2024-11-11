import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/validation';
import { loginRoute } from '../utils/APIRoutes';

const useLoginForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value });
    };


    const handleSubmit = async(event) => {
        event.preventDefault();
        const validation = validateLogin(values);
        if (!validation.isValid) {
            toast.error(validation.message);
            return;
        }

        try {
            const response = await fetch(loginRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
                credentials: 'include' // This is important for handling cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            toast.success("تم تسجيل الدخول بنجاح!");
            navigate("/chat");
        } catch (error) {
            toast.error(error.message || "حدث خطأ في تسجيل الدخول");
            console.error(error);
        }
    };

    return { handleChange, handleSubmit };
};

export default useLoginForm;