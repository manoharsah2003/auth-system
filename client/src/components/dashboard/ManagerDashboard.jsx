import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiPieChart, FiCalendar, FiClipboard, FiLogOut, FiSettings, FiBell } from 'react-icons/fi';
import './DashboardStyles.css';

const ManagerDashboard = () => {
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
                    <div className="manager-profile">
                        <div className="profile-avatar manager">
                            {userData.username[0].toUpperCase()}
                        </div>
                        <h3>{userData.username}</h3>
                        <span className="role-badge">Manager</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}>
                        <FiPieChart /> Overview
                    </button>
                    <button className={`nav-item ${activeTab === 'team' ? 'active' : ''}`}
                            onClick={() => setActiveTab('team')}>
                        <FiUsers /> Team
                    </button>
                    <button className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}>
                        <FiClipboard /> Projects
                    </button>
                    <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calendar')}>
                        <FiCalendar /> Schedule
                    </button>
                    <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}>
                        <FiSettings /> Settings
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
                        <h1>Team Management Portal</h1>
                        <p>Managing 12 team members</p>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn">Add Member</button>
                        <button className="notification-btn">
                            <FiBell />
                            <span className="notification-badge">5</span>
                        </button>
                    </div>
                </header>

                <div className="manager-overview">
                    <div className="team-performance card">
                        <h3>Team Performance</h3>
                        <div className="performance-stats">
                            <div className="stat-item">
                                <span className="stat-label">Projects</span>
                                <span className="stat-value">8</span>
                                <span className="stat-change positive">+2 this month</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Tasks</span>
                                <span className="stat-value">45</span>
                                <span className="stat-change positive">85% completed</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Deadlines</span>
                                <span className="stat-value">12</span>
                                <span className="stat-change warning">3 upcoming</span>
                            </div>
                        </div>
                    </div>

                    <div className="team-members card">
                        <h3>Team Members</h3>
                        <div className="member-list">
                            <div className="member-item">
                                <div className="member-info">
                                    <div className="member-avatar">JD</div>
                                    <div className="member-details">
                                        <h4>John Doe</h4>
                                        <p>Frontend Developer</p>
                                    </div>
                                </div>
                                <div className="member-status active">Active</div>
                            </div>
                            <div className="member-item">
                                <div className="member-info">
                                    <div className="member-avatar">AS</div>
                                    <div className="member-details">
                                        <h4>Alice Smith</h4>
                                        <p>UI Designer</p>
                                    </div>
                                </div>
                                <div className="member-status away">Away</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-timeline card">
                        <h3>Project Timeline</h3>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">Dec 15</div>
                                <div className="timeline-content">
                                    <h4>Website Redesign</h4>
                                    <p>Phase 1 Completion</p>
                                </div>
                                <div className="timeline-status pending">Pending</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Dec 20</div>
                                <div className="timeline-content">
                                    <h4>Mobile App Launch</h4>
                                    <p>Beta Testing</p>
                                </div>
                                <div className="timeline-status upcoming">Upcoming</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerDashboard;