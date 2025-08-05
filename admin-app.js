class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminApp() {
  try {
    return (
      <div className="min-h-screen bg-[var(--background-light)]" data-name="admin-app" data-file="admin-app.js">
        <header className="bg-white shadow-sm border-b border-[var(--border-color)]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://app.trickle.so/storage/public/images/usr_1394e964e8000001/9c31f4f3-75f2-4ced-b207-4ad45ae5b4fc.jpeg" 
                  alt="PGP College Logo" 
                  className="h-12 w-12 rounded-full border-2 border-[var(--primary-color)]"
                />
                <div>
                  <h1 className="text-xl font-bold text-[var(--text-primary)]">Admin Panel</h1>
                  <p className="text-sm text-[var(--text-secondary)]">User Management System</p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = 'index.html'}
                className="btn-secondary flex items-center"
              >
                <div className="icon-arrow-left text-lg mr-2"></div>
                Back to Login
              </button>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-8">
          <UserManager />
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('admin-root'));
root.render(
  <ErrorBoundary>
    <AdminApp />
  </ErrorBoundary>
);