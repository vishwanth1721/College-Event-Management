function UserManager() {
  try {
    const [users, setUsers] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('reset');
    const [message, setMessage] = React.useState('');

    const [resetForm, setResetForm] = React.useState({
      username: '',
      newPassword: ''
    });

    const [newUserForm, setNewUserForm] = React.useState({
      username: '',
      password: '',
      role: 'Student Representative'
    });

    React.useEffect(() => {
      setUsers(getAllUsers());
    }, []);

    const handleResetPassword = (e) => {
      e.preventDefault();
      setMessage('');

      if (resetUserPassword(resetForm.username, resetForm.newPassword)) {
        setMessage(`Password reset successfully for user: ${resetForm.username}`);
        setResetForm({ username: '', newPassword: '' });
        setUsers(getAllUsers());
      } else {
        setMessage('User not found or reset failed');
      }
    };

    const handleCreateUser = (e) => {
      e.preventDefault();
      setMessage('');

      const result = createNewUser(newUserForm.username, newUserForm.password, newUserForm.role);
      setMessage(result.message);
      
      if (result.success) {
        setNewUserForm({ username: '', password: '', role: 'Student Representative' });
        setUsers(getAllUsers());
      }
    };

    return (
      <div className="max-w-4xl mx-auto" data-name="user-manager" data-file="components/UserManager.js">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('reset')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'reset' 
                ? 'bg-[var(--primary-color)] text-white' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Reset Password
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'create' 
                ? 'bg-[var(--primary-color)] text-white' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Create New User
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'users' 
                ? 'bg-[var(--primary-color)] text-white' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            View Users
          </button>
        </div>

        {message && (
          <div className={`px-4 py-3 rounded-lg mb-6 ${
            message.includes('successfully') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}
        {activeTab === 'reset' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Reset User Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={resetForm.username}
                  onChange={(e) => setResetForm({...resetForm, username: e.target.value})}
                  className="form-input"
                  placeholder="Enter username to reset"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={resetForm.newPassword}
                  onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                  className="form-input"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Reset Password</button>
            </form>
          </div>
        )}
        {activeTab === 'create' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Create New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({...newUserForm, username: e.target.value})}
                  className="form-input"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                  className="form-input"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Role
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student Representative">Student Representative</option>
                  <option value="Event Coordinator">Event Coordinator</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Create User</button>
            </form>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Current Users</h2>
            <div className="space-y-3">
              {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-[var(--border-color)] rounded-lg">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{user.username}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{user.role}</p>
                  </div>
                  <div className="icon-user text-xl text-[var(--primary-color)]"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('UserManager component error:', error);
    return null;
  }
}