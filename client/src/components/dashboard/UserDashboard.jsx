import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const UserDashboard = () => {
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
                <h2>User Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-section">
                    <h1>Welcome, {userData.username}!</h1>
                    <p>Role: User</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>My Profile</h3>
                        <div className="profile-info">
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <button className="action-btn">Edit Profile</button>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>My Tasks</h3>
                        <div className="task-list">
                            <div className="task-header">
                                <h4>Current Tasks</h4>
                                <button className="action-btn">View All</button>
                            </div>
                            <div className="task-items">
                                <p>No active tasks.</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>My Projects</h3>
                        <div className="project-list">
                            <div className="project-header">
                                <h4>Active Projects</h4>
                                <button className="action-btn">Browse Projects</button>
                            </div>
                            <div className="project-items">
                                <p>No active projects.</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            <div className="activity-header">
                                <h4>Latest Updates</h4>
                            </div>
                            <div className="activity-items">
                                <p>No recent activity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;