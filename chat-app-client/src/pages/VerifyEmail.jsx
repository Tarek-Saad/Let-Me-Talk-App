import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import robot from '../assets/robot.gif';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email, username, password } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!verificationCode) {
            toast.error('يجب إدخال رمز التحقق');
            return;
        }

        if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
            toast.error('رمز التحقق يجب أن يتكون من 6 أرقام');
            return;
        }
        console.log(email, username, password)
        console.log(verificationCode)
        try {
            // Verify the code
            const codeVerificationResponse = await axios.post(`${registerRoute}/verify-code`, {
                email,
                verificationCode,
                
            });
            console.log(codeVerificationResponse)
            console.log(email, username, password)

            if (codeVerificationResponse.status === 200) {
                // Create user
                const response = await axios.post(registerRoute, { email, username, password });
                if (response.status === 201) {
                    toast.success('تم انشاء الحساب بنجاح');
                    navigate('/chat');
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} pauseOnHover={true} draggable={true} />
            <div className="flex justify-center items-center h-screen custom-font-baloo">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl w-96 border-2 border-orange-200">
                    <div className="brand flex flex-col items-center justify-center mb-8">
                        <img src={robot} alt="robot" className="w-24 h-24 drop-shadow-lg hover:scale-110 transition-transform duration-300" />
                        <h1 className="text-4xl font-bold text-orange-500 mt-4 hover:text-orange-600 transition-colors duration-300">التحقق من البريد</h1>
                    </div>
                    <div className="space-y-4">
                        <p className="text-center text-gray-600 mb-4">
                            تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز المكون من 6 أرقام
                        </p>
                        <input 
                            type="text" 
                            placeholder="رمز التحقق" 
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full p-2 text-sm rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300" 
                        />
                        <button 
                            type="submit" 
                            disabled={verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)}
                            className="w-full p-2 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 shadow-md"
                        >
                            تحقق
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default VerifyEmail; 