function EventList({ events, onEventDeleted }) {
  try {
    const [isDeleting, setIsDeleting] = React.useState(null);

    const handleDelete = async (eventId) => {
      if (!confirm('Are you sure you want to delete this event?')) {
        return;
      }

      setIsDeleting(eventId);
      try {
        await trickleDeleteObject('event', eventId);
        if (onEventDeleted) {
          onEventDeleted();
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const formatTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const isUpcoming = (eventDate) => {
      const today = new Date();
      const event = new Date(eventDate);
      return event >= today;
    };

    return (
      <div className="card" data-name="event-list" data-file="components/EventList.js">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
          <div className="icon-list text-xl mr-3 text-[var(--primary-color)]"></div>
          Events ({events.length})
        </h2>

        {events.length === 0 ? (
          <div className="text-center py-8">
            <div className="icon-calendar-x text-4xl text-[var(--text-secondary)] mb-4"></div>
            <p className="text-[var(--text-secondary)]">No events found. Add your first event!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((eventObj) => {
              const event = eventObj.objectData;
              const upcoming = isUpcoming(event.date);
              
              return (
                <div 
                  key={eventObj.objectId} 
                  className={`border rounded-lg p-4 ${upcoming ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] text-lg">{event.name}</h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-2">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <div className="icon-calendar text-lg mr-1 text-[var(--primary-color)]"></div>
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center">
                          <div className="icon-clock text-lg mr-1 text-[var(--primary-color)]"></div>
                          {formatTime(event.time)}
                        </div>
                        <div className="flex items-center">
                          <div className="icon-map-pin text-lg mr-1 text-[var(--primary-color)]"></div>
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(eventObj.objectId)}
                      disabled={isDeleting === eventObj.objectId}
                      className="btn-danger ml-4 disabled:opacity-50"
                    >
                      {isDeleting === eventObj.objectId ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <div className="icon-trash-2 text-lg"></div>
                      )}
                    </button>
                  </div>
                  
                  {upcoming && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Upcoming Event
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('EventList component error:', error);
    return null;
  }
}
