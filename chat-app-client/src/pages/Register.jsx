import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import robot from '../assets/robot.gif';
import useRegisterForm from '../hooks/useRegisterForm';

const Register = () => {
    const { handleChange, handleSubmit, isPasswordMatch } = useRegisterForm();

    return (
        <>
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} pauseOnHover={true} draggable={true} />
            <div className="flex justify-center items-center h-screen custom-font-baloo">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl w-96 border-2 border-orange-200">
                    {/* Brand Section */}
                    <div className="brand flex flex-col items-center justify-center mb-8">
                        <img src={robot} alt="robot" className="w-24 h-24 drop-shadow-lg hover:scale-110 transition-transform duration-300" />
                        <h1 className="text-4xl font-bold text-orange-500 mt-4 hover:text-orange-600 transition-colors duration-300">هيا نتواصل !</h1>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="الاسم" 
                            name="username"
                            onChange={handleChange}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type="email" 
                            placeholder="الايميل" 
                            name="email"
                            onChange={handleChange}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type="password" 
                            placeholder="كلمة المرور" 
                            name="password"
                            onChange={handleChange}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <input 
                            type='password' 
                            placeholder='تأكيد كلمة المرور' 
                            name='confirmPassword'
                            onChange={handleChange}
                            className='w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300' 
                        />
                        
                        {!isPasswordMatch && 
                            <p className='text-red-500 text-xs'>كلمة المرور وتأكيد كلمة المرور غير متطابقين</p>
                        }

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
};

export default Register;