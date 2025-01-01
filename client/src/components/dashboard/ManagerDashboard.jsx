import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/mockAuth';
import './DashboardStyles.css';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [teamStats] = useState({
        teamMembers: 12,
        activeProjects: 8,
        pendingTasks: 15,
        completedTasks: 45
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
                    <h3>M-Dashboard</h3>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item active">Dashboard</button>
                    <button className="nav-item">Team</button>
                    <button className="nav-item">Projects</button>
                    <button className="nav-item">Analytics</button>
                    <button className="nav-item">Settings</button>
                </nav>
                <button onClick={handleLogout} className="modern-logout">
                    Logout
                </button>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Welcome back, {userData.username}</h1>
                        <p>Here's what's happening with your team today</p>
                    </div>
                    <div className="header-actions">
                        <button className="modern-button primary">+ New Project</button>
                    </div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-title">Team Members</span>
                        <span className="stat-value">{teamStats.teamMembers}</span>
                        <span className="stat-change positive">+2 this month</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Active Projects</span>
                        <span className="stat-value">{teamStats.activeProjects}</span>
                        <span className="stat-change positive">3 near completion</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Pending Tasks</span>
                        <span className="stat-value">{teamStats.pendingTasks}</span>
                        <span className="stat-change negative">5 overdue</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Completed Tasks</span>
                        <span className="stat-value">{teamStats.completedTasks}</span>
                        <span className="stat-change positive">+12 this week</span>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="grid-card team-section">
                        <div className="card-header">
                            <h3>Team Members</h3>
                            <button className="modern-button secondary">View All</button>
                        </div>
                        <div className="team-list">
                            <div className="team-member">
                                <div className="member-avatar">JS</div>
                                <div className="member-info">
                                    <h4>John Smith</h4>
                                    <p>Frontend Developer</p>
                                </div>
                                <span className="status active">Active</span>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">AS</div>
                                <div className="member-info">
                                    <h4>Alice Stevens</h4>
                                    <p>UI Designer</p>
                                </div>
                                <span className="status active">Active</span>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">RJ</div>
                                <div className="member-info">
                                    <h4>Robert Johnson</h4>
                                    <p>Backend Developer</p>
                                </div>
                                <span className="status away">Away</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card projects-section">
                        <div className="card-header">
                            <h3>Active Projects</h3>
                            <button className="modern-button secondary">View All</button>
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

                    <div className="grid-card calendar-section">
                        <div className="card-header">
                            <h3>Upcoming Events</h3>
                            <button className="modern-button secondary">Add Event</button>
                        </div>
                        <div className="event-list">
                            <div className="event-item">
                                <div className="event-time">10:00 AM</div>
                                <div className="event-info">
                                    <h4>Team Standup</h4>
                                    <p>Daily team sync meeting</p>
                                </div>
                            </div>
                            <div className="event-item">
                                <div className="event-time">2:00 PM</div>
                                <div className="event-info">
                                    <h4>Project Review</h4>
                                    <p>Website redesign milestone</p>
                                </div>
                            </div>
                            <div className="event-item">
                                <div className="event-time">4:30 PM</div>
                                <div className="event-info">
                                    <h4>Client Meeting</h4>
                                    <p>Progress update call</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerDashboard;