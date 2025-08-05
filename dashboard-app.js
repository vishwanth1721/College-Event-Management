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
              className="btn-primary"
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

function DashboardApp() {
  try {
    const [events, setEvents] = React.useState([]);
    const [phoneNumbers, setPhoneNumbers] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('events');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      // Check authentication
      const token = localStorage.getItem('authToken');
      if (!token || !isValidToken(token)) {
        window.location.href = 'index.html';
        return;
      }
      loadEvents();
      loadPhoneNumbers();
      setIsLoading(false);
      startSMSMonitoring();
    }, []);
    const loadEvents = async () => {
      try {
        const result = await trickleListObjects('event', 100, true);
        setEvents(result.items || []);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };
    const loadPhoneNumbers = async () => {
      try {
        const result = await trickleListObjects('phone_number', 100, true);
        setPhoneNumbers(result.items || []);
      } catch (error) {
        console.error('Error loading phone numbers:', error);
      }
    };
    const handleEventAdded = () => {
      loadEvents();
    };

    const handleEventDeleted = () => {
      loadEvents();
    };

    const handlePhoneUpdated = () => {
      loadPhoneNumbers();
    };

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-light)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-[var(--text-secondary)]">Loading dashboard...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[var(--background-light)]" data-name="dashboard-app" data-file="dashboard-app.js">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'events' 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="icon-calendar text-lg mr-2"></div>
              Events Management
            </button>
            <button
              onClick={() => setActiveTab('phones')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'phones' 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="icon-phone text-lg mr-2"></div>
              SMS Notifications
            </button>
          </div>
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <EventForm onEventAdded={handleEventAdded} />
              </div>
              <div>
                <EventList events={events} onEventDeleted={handleEventDeleted} />
              </div>
            </div>
          )}

          {activeTab === 'phones' && (
            <div className="max-w-2xl mx-auto">
              <PhoneManager phoneNumbers={phoneNumbers} onPhoneUpdated={handlePhoneUpdated} />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);