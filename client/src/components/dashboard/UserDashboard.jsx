import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userStats] = useState({
        tasksCompleted: 24,
        projectsInvolved: 3,
        hoursLogged: 156,
        upcomingTasks: 5
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
                    <h3>Workspace</h3>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item active">Overview</button>
                    <button className="nav-item">My Tasks</button>
                    <button className="nav-item">Projects</button>
                    <button className="nav-item">Calendar</button>
                    <button className="nav-item">Profile</button>
                </nav>
                <button onClick={handleLogout} className="modern-logout">
                    Logout
                </button>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Welcome, {userData.username}!</h1>
                        <p>Track your tasks and projects</p>
                    </div>
                    <div className="header-actions">
                        <button className="modern-button primary">+ New Task</button>
                    </div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-title">Tasks Completed</span>
                        <span className="stat-value">{userStats.tasksCompleted}</span>
                        <span className="stat-change positive">+8 this week</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Active Projects</span>
                        <span className="stat-value">{userStats.projectsInvolved}</span>
                        <span className="stat-change neutral">All on track</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Hours Logged</span>
                        <span className="stat-value">{userStats.hoursLogged}</span>
                        <span className="stat-change positive">40h this week</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Upcoming Tasks</span>
                        <span className="stat-value">{userStats.upcomingTasks}</span>
                        <span className="stat-change neutral">Due this week</span>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="grid-card">
                        <div className="card-header">
                            <h3>Current Tasks</h3>
                            <button className="modern-button secondary">View All</button>
                        </div>
                        <div className="task-list">
                            <div className="task-item">
                                <div className="task-status high">High</div>
                                <div className="task-info">
                                    <h4>Complete Project Documentation</h4>
                                    <p>Due in 2 days</p>
                                </div>
                                <button className="task-action">Mark Done</button>
                            </div>
                            <div className="task-item">
                                <div className="task-status medium">Medium</div>
                                <div className="task-info">
                                    <h4>Review Code Changes</h4>
                                    <p>Due tomorrow</p>
                                </div>
                                <button className="task-action">Mark Done</button>
                            </div>
                            <div className="task-item">
                                <div className="task-status low">Low</div>
                                <div className="task-info">
                                    <h4>Update Weekly Report</h4>
                                    <p>Due in 3 days</p>
                                </div>
                                <button className="task-action">Mark Done</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <div className="card-header">
                            <h3>My Projects</h3>
                            <button className="modern-button secondary">All Projects</button>
                        </div>
                        <div className="project-list">
                            <div className="project-item">
                                <div className="project-info">
                                    <h4>Website Redesign</h4>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: '75%'}}></div>
                                    </div>
                                </div>
                                <span className="project-status">75%</span>
                            </div>
                            <div className="project-item">
                                <div className="project-info">
                                    <h4>Mobile App Development</h4>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: '45%'}}></div>
                                    </div>
                                </div>
                                <span className="project-status">45%</span>
                            </div>
                            <div className="project-item">
                                <div className="project-info">
                                    <h4>Database Migration</h4>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: '90%'}}></div>
                                    </div>
                                </div>
                                <span className="project-status">90%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <div className="card-header">
                            <h3>Recent Activity</h3>
                        </div>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-time">10:30 AM</div>
                                <div className="activity-info">
                                    <h4>Task Completed</h4>
                                    <p>Frontend bug fixes completed</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-time">09:15 AM</div>
                                <div className="activity-info">
                                    <h4>New Task Assigned</h4>
                                    <p>Review pull request #128</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-time">Yesterday</div>
                                <div className="activity-info">
                                    <h4>Project Update</h4>
                                    <p>Database migration phase 1 complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;