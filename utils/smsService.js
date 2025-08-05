let smsMonitorInterval = null;

async function startSMSMonitoring() {
  try {
    smsMonitorInterval = setInterval(checkUpcomingEvents, 60 * 60 * 1000);
    
    await checkUpcomingEvents();
    
    console.log('SMS monitoring started');
  } catch (error) {
    console.error('Error starting SMS monitoring:', error);
  }
}

async function checkUpcomingEvents() {
  try {
    const [eventsResult, phonesResult] = await Promise.all([
      trickleListObjects('event', 100, true),
      trickleListObjects('phone_number', 100, true)
    ]);

    const events = eventsResult.items || [];
    const phoneNumbers = phonesResult.items || [];

    if (phoneNumbers.length === 0) {
      return; 
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const upcomingEvents = events.filter(eventObj => {
      const eventDate = eventObj.objectData.date;
      return eventDate === tomorrowStr;
    });

    for (const eventObj of upcomingEvents) {
      const event = eventObj.objectData;
      
       const smsKey = `sms_sent_${eventObj.objectId}_${tomorrowStr}`;
      if (localStorage.getItem(smsKey)) {
        continue;  
      }

      await sendEventReminder(event, phoneNumbers);
            localStorage.setItem(smsKey, 'true');
    }
  } catch (error) {
    console.error('Error checking upcoming events:', error);
  }
}

async function sendEventReminder(event, phoneNumbers) {
  try {
    const message = `Reminder: ${event.name} is happening tomorrow (${formatEventDate(event.date)}) at ${formatEventTime(event.time)} at ${event.location} - PGP COLLEGE OF ENGINEERING AND TECHNOLOGY`;
    for (const phoneObj of phoneNumbers) {
      const phoneNumber = phoneObj.objectData.number;
            console.log(`SMS sent to ${phoneNumber}: ${message}`);
      
      await trickleCreateObject('sms_log', {
        phoneNumber: phoneNumber,
        message: message,
        eventId: event.objectId || 'unknown',
        eventName: event.name,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
    }

    showNotification(`SMS reminders sent for event: ${event.name}`);
    
  } catch (error) {
    console.error('Error sending SMS reminder:', error);
  }
}

function formatEventDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatEventTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function stopSMSMonitoring() {
  if (smsMonitorInterval) {
    clearInterval(smsMonitorInterval);
    smsMonitorInterval = null;
    console.log('SMS monitoring stopped');
  }
}