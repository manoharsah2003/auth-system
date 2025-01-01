import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/mockAuth';
import './AuthStyles.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = loginUser(email, password);
        
        if (result.success) {
            switch(result.user.role) {
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                case 'manager':
                    navigate('/manager-dashboard');
                    break;
                default:
                    navigate('/user-dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <div className="demo-credentials">
                    <p>Demo Credentials:</p>
                    <small>Admin: admin@example.com / admin123</small><br />
                    <small>Manager: manager@example.com / manager123</small><br />
                    <small>User: user@example.com / user123</small>
                </div>
            </div>
        </div>
    );
};

export default Login;