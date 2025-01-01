import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const ManagerDashboard = () => {
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
                <h2>Manager Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Welcome, {userData.username}!</h1>
                    <p>Role: Manager</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Team Overview</h3>
                        <div className="team-stats">
                            <div className="stat-item">
                                <span className="stat-number">5</span>
                                <span className="stat-label">Team Members</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">3</span>
                                <span className="stat-label">Active Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Team Management</h3>
                        <div className="team-list">
                            <button className="action-btn">Add Team Member</button>
                            <button className="action-btn">View All Members</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Project Management</h3>
                        <div className="project-controls">
                            <button className="action-btn">Create Project</button>
                            <button className="action-btn">Assign Tasks</button>
                            <button className="action-btn">View All Projects</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Performance Analytics</h3>
                        <div className="analytics-placeholder">
                            <p>Team performance charts and metrics will be displayed here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;