import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import robot from '../assets/robot.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // check if the password and confirm password are the same
    const isPasswordMatch = formData.password === formData.confirmPassword;

    // handle validation errors
    const handleValidationErrors = () => {
        if (!isPasswordMatch) {
            toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
            return false;
        }

        if (formData.username.length < 3) {
            toast.error('الاسم يجب ان يكون اكثر من 3 حروف');
            return false;
        }

        if (!formData.email.includes('@')) {
            toast.error('البريد الالكترونى غير صحيح');
            return false;
        }

        if (formData.password.length < 8) {
            toast.error('كلمة المرور يجب ان يكون اكثر من 8 حروف');
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleValidationErrors()) {
            return;
        }
        // send data to server
        try {
            const { username, email, password } = formData;
            const response = await axios.post(registerRoute, { username, email, password });
            if (response.status === 201) {
                toast.success('تم انشاء الحساب بنجاح');
                navigate('/chat');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <>
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} pauseOnHover={true} draggable={true} />
            <div className="flex justify-center items-center h-screen custom-font-baloo">
                <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-8 rounded-lg shadow-2xl w-96 border-2 border-orange-200">
                    <div className="brand flex flex-col items-center justify-center mb-8">
                        <img src={robot} alt="robot" className="w-24 h-24 drop-shadow-lg hover:scale-110 transition-transform duration-300" />
                        <h1 className="text-4xl font-bold text-orange-500 mt-4 hover:text-orange-600 transition-colors duration-300">هيا نتواصل !</h1>
                    </div>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="الاسم" 
                            name="username"
                            onChange={(e) => handleChange(e)}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type="email" 
                            placeholder="الايميل" 
                            name="email"
                            onChange={(e) => handleChange(e)}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type="password" 
                            placeholder="كلمة المرور" 
                            name="password"
                            onChange={(e) => handleChange(e)}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type='password' 
                            placeholder='تأكيد كلمة المرور' 
                            name='confirmPassword'
                            onChange={(e) => handleChange(e)}
                            className='w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300' 
                        />
                        {!isPasswordMatch && <p className='text-red-500 text-xs'>كلمة المرور وتأكيد كلمة المرور غير متطابقين</p>}
                        <button 
                            type="submit" 
                            className="w-full p-2 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 shadow-md"
                        >
                            انشاء حساب
                        </button>
                        <div className="text-xs text-gray-500 text-center mt-8 custom-font-baloo">
                            لديك حساب ؟ <Link to="/login" className="text-orange-500 hover:text-orange-600 transition-colors duration-300">تسجيل الدخول</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;