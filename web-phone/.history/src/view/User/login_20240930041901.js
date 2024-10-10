import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './log.css';
import jwtDecode from 'jwt-decode'; 

const Login = ({ handleOpenSignUp, handleCloseLogin, setIsSignIn, setId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Hàm xử lý khi người dùng nhấn "Login"
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email, password };
        
        try {
            // Gọi API loginUser từ backend
            const response = await axios.post('http://localhost:3001/api/user/sign-in', user);

            // Kiểm tra phản hồi từ backend
            if (response.data.status === 'FAILED') {
                setError(response.data.message);
            } else if (response.data.status === 'OK') {
                console.log('Đăng nhập thành công:', response.data.data);
                const accessToken = response.data.data.access_token;

                // Lưu access token vào localStorage
                localStorage.setItem('access_token', accessToken);
                
                // Giải mã token để lấy thông tin user
                const decoded = jwtDecode(accessToken);
                console.log(decoded);

                handleCloseLogin();
                setIsSignIn(true);
                setId(decoded.payload.id); // Đảm bảo cấu trúc của decoded đúng
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng nhập');
            console.error('Lỗi đăng nhập:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group-log">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? 
                <Link to="#" onClick={handleOpenSignUp}>
                    Sign up here
                </Link>
            </p>
        </div>
    );
};

export default Login;
