function LoginForm({ onLogin }) {
  try {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
        const result = await authenticateUser(username, password);
        if (result.success) {
          if (result.isReset) {
            window.location.href = 'admin.html';
          } else {
            onLogin(true);
          }
        } else {
          setError('Invalid username or password');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4" data-name="login-form" data-file="components/LoginForm.js">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="https://app.trickle.so/storage/public/images/usr_1394e964e8000001/9c31f4f3-75f2-4ced-b207-4ad45ae5b4fc.jpeg" 
              alt="PGP College Logo" 
              className="h-20 w-20 mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
            />
            <h1 className="text-4xl font-bold text-white mb-2">ECE ELECTROSWAGGERS</h1>
            <p className="text-white text-lg opacity-90">PGP COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
          </div>

          <div className="card backdrop-blur-sm bg-white/95">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">Login to Dashboard</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                <strong>Available Accounts:</strong>
              </p>
              <div className="text-xs text-[var(--text-secondary)] space-y-1">
                <div><strong>Admin:</strong> admin / admin123</div>
                <div><strong>Faculty:</strong> faculty / faculty456</div>
                <div><strong>Student:</strong> student / student789</div>
                <div><strong>Coordinator:</strong> coordinator / coord2024</div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <strong>Reset Panel:</strong> reset / reset123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}