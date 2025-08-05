
const USER_ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: 'Administrator' },
  { username: 'faculty', password: 'faculty456', role: 'Faculty' },
  { username: 'student', password: 'student789', role: 'Student Representative' },
  { username: 'coordinator', password: 'coord2024', role: 'Event Coordinator' }
];
const RESET_CREDENTIALS = {
  username: 'reset',
  password: 'reset123'
};

async function authenticateUser(username, password) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
        const user = USER_ACCOUNTS.find(u => u.username === username && u.password === password);
    
    if (user) {
      const token = btoa(`${username}:${user.role}:${Date.now()}`);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('currentUser', username);
      return { success: true, user };
    }
    
    if (username === RESET_CREDENTIALS.username && password === RESET_CREDENTIALS.password) {
      return { success: true, isReset: true };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false };
  }
}

function isValidToken(token) {
  try {
    if (!token) return false;
    
    const decoded = atob(token);
    const [username, role, timestamp] = decoded.split(':');
        const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000;
    
    const user = USER_ACCOUNTS.find(u => u.username === username);
    return user && tokenAge < maxAge;
  } catch (error) {
    return false;
  }
}

function resetUserPassword(username, newPassword) {
  try {
    const userIndex = USER_ACCOUNTS.findIndex(u => u.username === username);
    if (userIndex !== -1) {
      USER_ACCOUNTS[userIndex].password = newPassword;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Password reset error:', error);
    return false;
  }
}

function createNewUser(username, password, role) {
  try {
    const existingUser = USER_ACCOUNTS.find(u => u.username === username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
        USER_ACCOUNTS.push({ username, password, role });
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('User creation error:', error);
    return { success: false, message: 'Error creating user' };
  }
}

function getCurrentUser() {
  return {
    username: localStorage.getItem('currentUser'),
    role: localStorage.getItem('userRole')
  };
}

function getAllUsers() {
  return USER_ACCOUNTS.map(user => ({
    username: user.username,
    role: user.role
  }));
}

function logout() {
  localStorage.removeItem('authToken');
  window.location.href = 'index.html';
}