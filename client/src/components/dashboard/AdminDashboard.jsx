import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [stats] = useState({
        totalUsers: 152,
        activeUsers: 89,
        managers: 12,
        projects: 34
    });

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
                <h2>Admin Control Panel</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Welcome back, {userData.username}!</h1>
                    <p>System Administrator • Last login: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>System Overview</h3>
                        <div className="admin-stats">
                            <div className="stat-item">
                                <span className="stat-number">{stats.totalUsers}</span>
                                <span className="stat-label">Total Users</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.activeUsers}</span>
                                <span className="stat-label">Active Users</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.managers}</span>
                                <span className="stat-label">Managers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.projects}</span>
                                <span className="stat-label">Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>User Management</h3>
                        <div className="quick-actions">
                            <button className="action-btn">Add New User</button>
                            <button className="action-btn">Manage Roles</button>
                            <button className="action-btn">View All Users</button>
                            <button className="action-btn">User Reports</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>System Health</h3>
                        <div className="health-status">
                            <div className="stat-item">
                                <span className="stat-number">99.9%</span>
                                <span className="stat-label">System Uptime</span>
                            </div>
                            <div className="quick-actions">
                                <button className="action-btn">System Logs</button>
                                <button className="action-btn">Performance</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Security Center</h3>
                        <div className="security-controls">
                            <div className="quick-actions">
                                <button className="action-btn">Security Logs</button>
                                <button className="action-btn">Access Control</button>
                                <button className="action-btn">Backup System</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            <p>• New user registration - 5 minutes ago</p>
                            <p>• System backup completed - 1 hour ago</p>
                            <p>• Security update installed - 2 hours ago</p>
                            <p>• User role modified - 3 hours ago</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Quick Settings</h3>
                        <div className="quick-actions">
                            <button className="action-btn">Email Settings</button>
                            <button className="action-btn">Notifications</button>
                            <button className="action-btn">API Access</button>
                            <button className="action-btn">System Config</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;