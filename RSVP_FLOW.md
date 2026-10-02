# RSVP Form → Google Sheets Data Flow

## 📊 How It Works

```
┌─────────────────┐
│  Wedding Guest  │
│   Fills Form    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│         RSVP Form (index.html)          │
│  • Name: r-name                         │
│  • Phone: r-phone                       │
│  • Guests: r-guests                     │
│  • Attending: yes/no toggle             │
│  • Message: r-message                   │
└────────┬────────────────────────────────┘
         │ Submit
         ▼
┌─────────────────────────────────────────┐
│    JavaScript (Frontend)                │
│  • Validates form data                  │
│  • Saves to localStorage (backup)       │
│  • Creates JSON payload                 │
└────────┬────────────────────────────────┘
         │
         │ POST (no-cors)
         │ JSON: {name, phone, guests, attending, message, time}
         ▼
┌─────────────────────────────────────────┐
│    Google Apps Script (Backend)         │
│  • Receives POST request                │
│  • Parses JSON data                     │
│  • Adds timestamp                       │
└────────┬────────────────────────────────┘
         │
         │ appendRow()
         ▼
┌─────────────────────────────────────────┐
│        Google Sheet                     │
│                                         │
│  Row Layout:                            │
│  [Timestamp][Name][Phone][Guests]       │
│  [Attending][Message]                   │
│                                         │
│  Example:                               │
│  2026-11-01 10:30 | John Doe |          │
│  +91 9876543210 | 2 | yes |             │
│  Congratulations! 🎉                    │
└─────────────────────────────────────────┘
```

---

## 🔄 Offline Support

```
No Internet? ❌
     │
     ▼
┌──────────────────────┐
│  localStorage Queue  │
│  Saves RSVP locally  │
└──────────┬───────────┘
           │
           │ ⏳ Waits for connection
           │
Internet back! ✅
     │
     ▼
┌──────────────────────┐
│  Auto-retry System   │
│  Sends queued RSVPs  │
└──────────┬───────────┘
           │
           ▼
      Google Sheet
```

---

## 📦 Data Mapping

### Frontend → Backend

| Form Field | Input ID | JavaScript Variable | Apps Script |
|-----------|----------|---------------------|-------------|
| Full Name | `r-name` | `entry.name` | `data.name` → Col B |
| Phone | `r-phone` | `entry.phone` | `data.phone` → Col C |
| Guests | `r-guests` | `entry.guests` | `data.guests` → Col D |
| Attending | toggle buttons | `entry.attending` | `data.attend` → Col E |
| Message | `r-message` | `entry.message` | `data.message` → Col F |
| - | auto-generated | `entry.time` | `timestamp` → Col A |

---

## 🎯 Complete Data Flow Example

### Step 1: Guest Fills Form
```
Name: "Rajesh Kumar"
Phone: "+91 9876543210"
Guests: "3"
Attending: "yes" (clicked COUNT ME IN)
Message: "Looking forward to the celebration!"
```

### Step 2: JavaScript Creates Payload
```javascript
{
  "name": "Rajesh Kumar",
  "phone": "+91 9876543210",
  "guests": 3,
  "attending": "yes",
  "message": "Looking forward to the celebration!",
  "time": "2026-10-15T14:30:00.000Z"
}
```

### Step 3: Apps Script Processes
```javascript
rowData = [
  new Date(),                            // Timestamp: 15/10/2026 20:00:00
  "Rajesh Kumar",                        // Name
  "+91 9876543210",                      // Phone
  "3",                                   // Guests
  "yes",                                 // Attending
  "Looking forward to the celebration!"  // Message
]
```

### Step 4: Saved in Google Sheet
```
| Timestamp           | Name          | Phone          | Guests | Attending | Message                              |
|---------------------|---------------|----------------|--------|-----------|--------------------------------------|
| 15/10/2026 20:00:00 | Rajesh Kumar  | +91 9876543210 | 3      | yes       | Looking forward to the celebration!  |
```

---

## 🔐 Security Features

1. **No-CORS Mode**: Prevents browser security issues
2. **Anyone Access**: Required for form submissions from any device
3. **Server-side Validation**: Apps Script validates all incoming data
4. **Error Handling**: Catches and logs errors without exposing sensitive info
5. **Timestamp**: Server-side timestamp prevents tampering

---

## ⚙️ Advanced Features Already Built-In

### 1. Offline Queue System
- RSVPs saved locally if offline
- Auto-sends when connection restored
- No data loss!

### 2. Retry Mechanism
```javascript
// Triggers on:
- Page load (flushPendingRSVPs)
- Network reconnect (online event)
```

### 3. Dual Storage
- **Pending Queue**: Failed submissions to retry
- **Archive**: All submissions as backup

### 4. Timeout Protection
```javascript
const RSVP_TIMEOUT_MS = 20000; // 20 seconds
// Prevents hanging requests
```

---

## 🐛 Debugging

### Check Form Submission
```javascript
// Browser Console (F12)
console.log('RSVP submitted:', entry);
```

### Check Apps Script Logs
```
Apps Script Editor → Executions
- See all incoming requests
- Check for errors
```

### Check Network Request
```
Browser DevTools → Network Tab
- Look for request to script.google.com
- Status: 200 = success
```

### Check localStorage
```javascript
// Browser Console
console.log(localStorage.getItem('hd_rsvp_list'));
console.log(localStorage.getItem('hd_rsvp_pending'));
```

---

## 🎨 Customization Ideas

Want to add more fields? Update 3 places:

### 1. HTML Form
```html
<div class="field">
  <label>Email</label>
  <input type="email" id="r-email" placeholder="your@email.com">
</div>
```

### 2. JavaScript
```javascript
const entry = {
  name: name,
  phone: document.getElementById('r-phone').value.trim(),
  email: document.getElementById('r-email').value.trim(), // NEW
  // ... rest of fields
};
```

### 3. Apps Script
```javascript
const rowData = [
  timestamp,
  data.name || '',
  data.phone || '',
  data.email || '',  // NEW
  data.guests || '',
  data.attend || '',
  data.message || ''
];
```

### 4. Sheet Headers
```
Timestamp | Name | Phone | Email | Guests | Attending | Message
```

---

## 📈 Analytics You Can Track

With your Google Sheet data, you can:

- ✅ Total responses count
- ✅ Attending vs Not Attending ratio
- ✅ Total guest count
- ✅ Response timeline (by timestamp)
- ✅ Most common messages
- ✅ Peak response times
- ✅ Mobile vs Desktop submissions (with user-agent)

Use the `createRSVPSummary()` function in `google-apps-script.js` for automatic stats!

---

## 🚀 You're All Set!

Your RSVP form is production-ready with:
- ✅ Google Sheets integration
- ✅ Offline support
- ✅ Auto-retry
- ✅ Error handling
- ✅ Data validation
- ✅ Beautiful UI

Just deploy the Apps Script and you're good to go! 🎉
