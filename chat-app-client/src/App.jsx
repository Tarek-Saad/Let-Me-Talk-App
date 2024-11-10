import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import VerifyEmail from './pages/VerifyEmail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
