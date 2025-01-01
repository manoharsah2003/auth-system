import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role !== 'admin') {
                navigate('/login');
                return;
            }
            setUserData(parsedUser);
        } catch (error) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (!userData) return null;

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Welcome, {userData.username}!</h1>
                    <p>Role: Administrator</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>System Overview</h3>
                        <div className="admin-stats">
                            <div className="stat-item">
                                <span className="stat-number">15</span>
                                <span className="stat-label">Total Users</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">3</span>
                                <span className="stat-label">Total Managers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5</span>
                                <span className="stat-label">Active Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>User Management</h3>
                        <div className="admin-controls">
                            <button className="action-btn">Add New User</button>
                            <button className="action-btn">Manage Roles</button>
                            <button className="action-btn">View All Users</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>System Settings</h3>
                        <div className="settings-controls">
                            <button className="action-btn">Security Settings</button>
                            <button className="action-btn">Email Configuration</button>
                            <button className="action-btn">System Backup</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Activity Logs</h3>
                        <div className="log-list">
                            <p>Recent system activities and user logs will be displayed here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;