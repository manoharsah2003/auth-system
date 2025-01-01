import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [systemStats] = useState({
        totalUsers: 156,
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
        <div className="modern-dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item active">Dashboard</button>
                    <button className="nav-item">Users</button>
                    <button className="nav-item">System</button>
                    <button className="nav-item">Security</button>
                    <button className="nav-item">Settings</button>
                </nav>
                <button onClick={handleLogout} className="modern-logout">
                    Logout
                </button>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>System Overview</h1>
                        <p>Monitoring all system activities and users</p>
                    </div>
                    <div className="header-actions">
                        <button className="modern-button primary">System Status</button>
                    </div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-title">Total Users</span>
                        <span className="stat-value">{systemStats.totalUsers}</span>
                        <span className="stat-change positive">+23 this month</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Active Users</span>
                        <span className="stat-value">{systemStats.activeUsers}</span>
                        <span className="stat-change positive">57% active now</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Managers</span>
                        <span className="stat-value">{systemStats.managers}</span>
                        <span className="stat-change neutral">2 pending approval</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Total Projects</span>
                        <span className="stat-value">{systemStats.projects}</span>
                        <span className="stat-change positive">+5 this week</span>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="grid-card">
                        <div className="card-header">
                            <h3>Recent User Activity</h3>
                            <button className="modern-button secondary">View All</button>
                        </div>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon new">+</div>
                                <div className="activity-info">
                                    <h4>New User Registration</h4>
                                    <p>John Doe registered as Manager</p>
                                    <span className="activity-time">5 minutes ago</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon update">↺</div>
                                <div className="activity-info">
                                    <h4>Role Update</h4>
                                    <p>Sarah Smith promoted to Manager</p>
                                    <span className="activity-time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon alert">!</div>
                                <div className="activity-info">
                                    <h4>Security Alert</h4>
                                    <p>Multiple failed login attempts</p>
                                    <span className="activity-time">1 day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <div className="card-header">
                            <h3>System Health</h3>
                            <button className="modern-button secondary">Details</button>
                        </div>
                        <div className="system-metrics">
                            <div className="metric-item">
                                <h4>Server Status</h4>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: '92%'}}></div>
                                </div>
                                <span className="metric-value">92% Uptime</span>
                            </div>
                            <div className="metric-item">
                                <h4>Database Load</h4>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: '45%'}}></div>
                                </div>
                                <span className="metric-value">45% Capacity</span>
                            </div>
                            <div className="metric-item">
                                <h4>Memory Usage</h4>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: '78%'}}></div>
                                </div>
                                <span className="metric-value">78% Used</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <div className="card-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div className="quick-actions-grid">
                            <button className="modern-button secondary">User Management</button>
                            <button className="modern-button secondary">System Backup</button>
                            <button className="modern-button secondary">Security Settings</button>
                            <button className="modern-button secondary">View Logs</button>
                            <button className="modern-button secondary">Update System</button>
                            <button className="modern-button secondary">Generate Reports</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;