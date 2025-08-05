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
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      // Check if user is already logged in
      const token = localStorage.getItem('authToken');
      if (token && isValidToken(token)) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }, []);

    const handleLogin = (success) => {
      if (success) {
        setIsAuthenticated(true);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    };

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-light)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-[var(--text-secondary)]">Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js" style={{
        backgroundImage: `url('https://app.trickle.so/storage/public/images/usr_1394e964e8000001/1e6f5153-b3b9-4f04-bc36-23552b375929.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay"></div>
        <div className="relative z-10">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);