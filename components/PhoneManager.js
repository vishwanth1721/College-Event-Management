function PhoneManager({ phoneNumbers, onPhoneUpdated }) {
  try {
    const [newPhone, setNewPhone] = React.useState('');
    const [isAdding, setIsAdding] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(null);
    const [message, setMessage] = React.useState('');

    const handleAddPhone = async (e) => {
      e.preventDefault();
      setIsAdding(true);
      setMessage('');

      const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
      if (!phoneRegex.test(newPhone.trim())) {
        setMessage('Please enter a valid phone number');
        setIsAdding(false);
        return;
      }

      try {
        await trickleCreateObject('phone_number', {
          number: newPhone.trim(),
          createdAt: new Date().toISOString()
        });

        setMessage('Phone number added successfully!');
        setNewPhone('');
        
        if (onPhoneUpdated) {
          onPhoneUpdated();
        }
      } catch (error) {
        setMessage('Error adding phone number. Please try again.');
        console.error('Error adding phone:', error);
      } finally {
        setIsAdding(false);
      }
    };

    const handleDeletePhone = async (phoneId) => {
      if (!confirm('Are you sure you want to remove this phone number?')) {
        return;
      }

      setIsDeleting(phoneId);
      try {
        await trickleDeleteObject('phone_number', phoneId);
        if (onPhoneUpdated) {
          onPhoneUpdated();
        }
      } catch (error) {
        console.error('Error deleting phone:', error);
        alert('Error removing phone number. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    };

    return (
      <div className="card" data-name="phone-manager" data-file="components/PhoneManager.js">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
          <div className="icon-phone text-xl mr-3 text-[var(--primary-color)]"></div>
          SMS Notification Numbers
        </h2>

        <form onSubmit={handleAddPhone} className="mb-6">
          <div className="flex gap-3">
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="form-input flex-1"
              placeholder="Enter phone number (e.g., +1234567890)"
              required
            />
            <button
              type="submit"
              disabled={isAdding}
              className="btn-primary disabled:opacity-50"
            >
              {isAdding ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </form>

        {message && (
          <div className={`px-4 py-3 rounded-lg mb-4 ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {phoneNumbers.length === 0 ? (
          <div className="text-center py-8">
            <div className="icon-phone-off text-4xl text-[var(--text-secondary)] mb-4"></div>
            <p className="text-[var(--text-secondary)]">No phone numbers added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {phoneNumbers.map((phoneObj) => (
              <div key={phoneObj.objectId} className="flex items-center justify-between p-3 border border-[var(--border-color)] rounded-lg">
                <div className="flex items-center">
                  <div className="icon-phone text-lg mr-3 text-[var(--primary-color)]"></div>
                  <span className="font-medium">{phoneObj.objectData.number}</span>
                </div>
                <button
                  onClick={() => handleDeletePhone(phoneObj.objectId)}
                  disabled={isDeleting === phoneObj.objectId}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {isDeleting === phoneObj.objectId ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <div className="icon-x text-lg"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">SMS Notification Info</h3>
          <p className="text-sm text-blue-800">
            SMS reminders will be sent to all numbers 1 day before each event.
            The system automatically monitors upcoming events and sends notifications.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PhoneManager component error:', error);
    return null;
  }
}