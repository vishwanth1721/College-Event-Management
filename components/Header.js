function Header() {
  try {
    const handleLogout = () => {
      if (confirm('Are you sure you want to logout?')) {
        logout();
      }
    };

    return (
      <header className="bg-white shadow-sm border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://app.trickle.so/storage/public/images/usr_1394e964e8000001/9c31f4f3-75f2-4ced-b207-4ad45ae5b4fc.jpeg" 
                alt="PGP College Logo" 
                className="h-12 w-12 rounded-full border-2 border-[var(--primary-color)]"
              />
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">PGP COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
                <p className="text-sm text-[var(--text-secondary)]">Event Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Welcome, {getCurrentUser().username || 'User'}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {getCurrentUser().role || 'ECE ELECTROSWAGGERS'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center"
              >
                <div className="icon-log-out text-lg mr-2"></div>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}