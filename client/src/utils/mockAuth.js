// Mock user data
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: 2,
        username: 'manager',
        email: 'manager@example.com',
        password: 'manager123',
        role: 'manager'
    },
    {
        id: 3,
        username: 'user',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
    }
];

export const loginUser = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Invalid credentials' };
};

export const registerUser = (userData) => {
    const exists = mockUsers.some(u => u.email === userData.email);
    if (exists) {
        return { success: false, message: 'User already exists' };
    }
    
    const newUser = {
        id: mockUsers.length + 1,
        ...userData
    };
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};