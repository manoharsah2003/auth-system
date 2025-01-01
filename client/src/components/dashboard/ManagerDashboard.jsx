import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [teamStats] = useState({
        teamMembers: 8,
        activeProjects: 5,
        tasksCompleted: 23,
        upcomingDeadlines: 4
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role !== 'manager') {
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
                <h2>Team Management Portal</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Hello, {userData.username}!</h1>
                    <p>Team Manager • Department: Software Development</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Team Performance</h3>
                        <div className="team-stats">
                            <div className="stat-item">
                                <span className="stat-number">{teamStats.teamMembers}</span>
                                <span className="stat-label">Team Members</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{teamStats.activeProjects}</span>
                                <span className="stat-label">Active Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{teamStats.tasksCompleted}</span>
                                <span className="stat-label">Tasks Completed</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{teamStats.upcomingDeadlines}</span>
                                <span className="stat-label">Upcoming Deadlines</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Team Management</h3>
                        <div className="quick-actions">
                            <button className="action-btn">Add Member</button>
                            <button className="action-btn">Team Schedule</button>
                            <button className="action-btn">Performance Review</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Project Overview</h3>
                        <div className="project-list">
                            <div className="quick-actions">
                                <button className="action-btn">Create Project</button>
                                <button className="action-btn">Assign Tasks</button>
                                <button className="action-btn">Project Reports</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Team Calendar</h3>
                        <div className="calendar-preview">
                            <p>Upcoming Events:</p>
                            <div className="activity-list">
                                <p>• Team Meeting - Tomorrow, 10:00 AM</p>
                                <p>• Project Deadline - Next Week</p>
                                <p>• Performance Reviews - Next Month</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Recent Updates</h3>
                        <div className="activity-list">
                            <p>• New task assigned to John - 1 hour ago</p>
                            <p>• Project milestone completed - 3 hours ago</p>
                            <p>• Team meeting minutes uploaded - Yesterday</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Quick Tools</h3>
                        <div className="quick-actions">
                            <button className="action-btn">Time Tracking</button>
                            <button className="action-btn">Resource Planning</button>
                            <button className="action-btn">Reports</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;