import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userStats] = useState({
        tasksCompleted: 12,
        activeProjects: 3,
        hoursLogged: 45,
        achievementPoints: 150
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role !== 'user') {
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
                <h2>Employee Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Welcome back, {userData.username}!</h1>
                    <p>Employee Portal • Last active: Today</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>My Performance</h3>
                        <div className="admin-stats">
                            <div className="stat-item">
                                <span className="stat-number">{userStats.tasksCompleted}</span>
                                <span className="stat-label">Tasks Done</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{userStats.activeProjects}</span>
                                <span className="stat-label">Active Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{userStats.hoursLogged}</span>
                                <span className="stat-label">Hours Logged</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{userStats.achievementPoints}</span>
                                <span className="stat-label">Points</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>My Tasks</h3>
                        <div className="task-list">
                            <div className="activity-list">
                                <p>• Complete project documentation</p>
                                <p>• Team meeting preparation</p>
                                <p>• Client presentation review</p>
                            </div>
                            <div className="quick-actions">
                                <button className="action-btn">View All Tasks</button>
                                <button className="action-btn">Add New Task</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>My Projects</h3>
                        <div className="project-list">
                            <div className="activity-list">
                                <p>• Website Redesign - In Progress</p>
                                <p>• Mobile App Development - Planning</p>
                                <p>• Database Migration - Review</p>
                            </div>
                            <div className="quick-actions">
                                <button className="action-btn">Project Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Time Tracking</h3>
                        <div className="time-tracking">
                            <div className="stat-item">
                                <span className="stat-number">7.5</span>
                                <span className="stat-label">Hours Today</span>
                            </div>
                            <div className="quick-actions">
                                <button className="action-btn">Start Timer</button>
                                <button className="action-btn">Log Hours</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Upcoming Events</h3>
                        <div className="activity-list">
                            <p>• Team Standup - Tomorrow, 9:00 AM</p>
                            <p>• Project Review - Wednesday, 2:00 PM</p>
                            <p>• Training Session - Friday, 11:00 AM</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Quick Links</h3>
                        <div className="quick-actions">
                            <button className="action-btn">Submit Leave</button>
                            <button className="action-btn">Request Resources</button>
                            <button className="action-btn">View Reports</button>
                            <button className="action-btn">Help Desk</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;