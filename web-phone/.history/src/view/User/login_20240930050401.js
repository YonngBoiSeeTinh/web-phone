import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios để gọi API
import './log.css';
import { jwtDecode } from 'jwt-decode';


const Login = ({ handleOpenSignUp,handleCloseLogin,setIsSignIn,setAccess_token }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    

    // Hàm xử lý khi người dùng nhấn "Login"
    const handleLogin = async (e) => {
        e.preventDefault();

        const user = { email, password };
        
        try {
            // Gọi API loginUser từ backend
            const response = await axios.post('http://localhost:3001/api/User/sign-in', user); // URL API của bạn
            console.log(response.data.access_token);
            // Kiểm tra phản hồi từ backend
            // if (response.data.status === 'FAILED') {
            //     setError(response.data.message); // Hiển thị lỗi nếu đăng nhập thất bại
            // } else   if (response.data.status === 'OK') {
            //     console.log('Đăng nhập thành công:', response.data);
            //     const accessToken = response.data.access_token;
            //     setAccess_token(accessToken);
            //     setIsSignIn(true);
            //     handleCloseLogin();            
            // }
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng nhập');
            console.error(error);
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
                {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}
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
