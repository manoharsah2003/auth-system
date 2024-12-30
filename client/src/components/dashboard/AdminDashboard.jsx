import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiSettings, FiDatabase, FiActivity, FiLogOut } from 'react-icons/fi';
import './DashboardStyles.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const token = localStorage.getItem('token');

        if (!token || !savedUserData) {
            navigate('/login');
            return;
        }

        try {
            setUserData(JSON.parse(savedUserData));
        } catch (error) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!userData) return null;

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Portal</h2>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FiDatabase /> Overview
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <FiUsers /> Users
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FiSettings /> Settings
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        <FiActivity /> Activity Logs
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="content-header">
                    <div className="header-title">
                        <h1>Welcome, {userData.username}</h1>
                        <p>Administrator Dashboard</p>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn success">New User</button>
                        <button className="action-btn warning">Settings</button>
                    </div>
                </header>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-icon users">
                            <FiUsers />
                        </div>
                        <div className="stat-details">
                            <h3>Total Users</h3>
                            <p className="stat-number">1,234</p>
                            <span className="stat-change positive">+12% this month</span>
                        </div>
                    </div>
                    {/* Add more stat cards */}
                </div>

                <div className="dashboard-grid">
                    <div className="grid-card">
                        <h3>Recent Users</h3>
                        <div className="user-list">
                            <div className="user-item">
                                <div className="user-info">
                                    <span className="user-name">John Doe</span>
                                    <span className="user-email">john@example.com</span>
                                </div>
                                <span className="user-role">Manager</span>
                            </div>
                            {/* Add more user items */}
                        </div>
                    </div>

                    <div className="grid-card">
                        <h3>System Logs</h3>
                        <div className="log-list">
                            <div className="log-item">
                                <span className="log-time">10:45 AM</span>
                                <span className="log-message">New user registration</span>
                                <span className="log-type info">INFO</span>
                            </div>
                            {/* Add more log items */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;