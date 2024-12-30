import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiList, FiFolder, FiBell, FiLogOut, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import './DashboardStyles.css';

const UserDashboard = () => {
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
                    <div className="user-profile">
                        <div className="profile-avatar">
                            {userData.username[0].toUpperCase()}
                        </div>
                        <h3>{userData.username}</h3>
                        <span className="role-badge user">User</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}>
                        <FiUser /> My Profile
                    </button>
                    <button className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tasks')}>
                        <FiList /> My Tasks
                    </button>
                    <button className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}>
                        <FiFolder /> Projects
                    </button>
                    <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calendar')}>
                        <FiCalendar /> Calendar
                    </button>
                    <button className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                            onClick={() => setActiveTab('messages')}>
                        <FiMessageCircle /> Messages
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
                        <h1>Welcome back, {userData.username}!</h1>
                        <p>Here's what's happening today</p>
                    </div>
                    <div className="header-actions">
                        <button className="notification-btn">
                            <FiBell />
                            <span className="notification-badge">3</span>
                        </button>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <div className="grid-card">
                        <h3>Today's Tasks</h3>
                        <div className="task-progress">
                            <div className="progress-bar">
                                <div className="progress" style={{width: '60%'}}></div>
                            </div>
                            <span>6/10 tasks completed</span>
                        </div>
                        <div className="task-list">
                            <div className="task-item completed">
                                <span>Complete project presentation</span>
                                <span>9:00 AM</span>
                            </div>
                            <div className="task-item">
                                <span>Team meeting</span>
                                <span>11:00 AM</span>
                            </div>
                            <div className="task-item">
                                <span>Review code changes</span>
                                <span>2:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <h3>Active Projects</h3>
                        <div className="project-list">
                            <div className="project-item">
                                <div className="project-info">
                                    <h4>Website Redesign</h4>
                                    <p>Deadline: Dec 31, 2024</p>
                                </div>
                                <div className="project-progress">75%</div>
                            </div>
                            <div className="project-item">
                                <div className="project-info">
                                    <h4>Mobile App Development</h4>
                                    <p>Deadline: Jan 15, 2025</p>
                                </div>
                                <div className="project-progress">45%</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <h3>Calendar</h3>
                        <div className="calendar-preview">
                            <div className="event-list">
                                <div className="event-item">
                                    <div className="event-date">
                                        <span className="day">15</span>
                                        <span className="month">DEC</span>
                                    </div>
                                    <div className="event-details">
                                        <h4>Team Building Event</h4>
                                        <p>2:00 PM - Office</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-card">
                        <h3>Messages</h3>
                        <div className="message-list">
                            <div className="message-item unread">
                                <div className="message-avatar">JS</div>
                                <div className="message-content">
                                    <h4>John Smith</h4>
                                    <p>Updated the project timeline...</p>
                                </div>
                                <span className="message-time">10m ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;