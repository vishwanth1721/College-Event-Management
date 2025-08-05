function EventForm({ onEventAdded }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      date: '',
      time: '',
      location: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setMessage('');

      try {
        await trickleCreateObject('event', {
          ...formData,
          createdAt: new Date().toISOString()
        });

        setMessage('Event added successfully!');
        setFormData({
          name: '',
          description: '',
          date: '',
          time: '',
          location: ''
        });
        
        if (onEventAdded) {
          onEventAdded();
        }
      } catch (error) {
        setMessage('Error adding event. Please try again.');
        console.error('Error adding event:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="card" data-name="event-form" data-file="components/EventForm.js">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
          <div className="icon-plus text-xl mr-3 text-[var(--primary-color)]"></div>
          Add New Event
        </h2>

        {message && (
          <div className={`px-4 py-3 rounded-lg mb-4 ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
              Event Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input h-24 resize-none"
              placeholder="Enter event description"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[var(--text-primary)] text-sm font-semibold mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter event location"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding Event...
              </div>
            ) : (
              'Add Event'
            )}
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('EventForm component error:', error);
    return null;
  }
}