# ✅ RSVP Setup Checklist

Use this checklist to ensure your RSVP → Google Sheets integration is working perfectly!

---

## 📋 Pre-Setup

- [ ] Have a Google account ready
- [ ] Website files are on your computer
- [ ] Can access [Google Sheets](https://sheets.google.com)
- [ ] Can access [Google Apps Script](https://script.google.com)

---

## 🔧 Setup Steps

### Step 1: Google Sheet
- [ ] Created new Google Sheet
- [ ] Named it (e.g., "Wedding RSVP Responses")
- [ ] Added headers in Row 1:
  ```
  Timestamp | Name | Phone | Guests | Attending | Message
  ```
- [ ] Verified all 6 columns are labeled correctly

### Step 2: Apps Script
- [ ] Clicked **Extensions** → **Apps Script** in Google Sheet
- [ ] Deleted any default code
- [ ] Copied code from `google-apps-script.js`
- [ ] Pasted into Apps Script editor
- [ ] Clicked **Save** (💾 icon)
- [ ] Named the project (e.g., "Wedding RSVP Handler")

### Step 3: Test Script (Optional but Recommended)
- [ ] In Apps Script, selected `testDoPost` from function dropdown
- [ ] Clicked **Run** (▶️ button)
- [ ] Authorized the script when prompted
- [ ] Checked Google Sheet for test entry
- [ ] Deleted test entry if present

### Step 4: Deploy
- [ ] Clicked **Deploy** → **New deployment**
- [ ] Clicked gear icon ⚙️ → Selected **Web app**
- [ ] Set **Execute as**: **Me**
- [ ] Set **Who has access**: **Anyone** ⚠️ (Important!)
- [ ] Clicked **Deploy**
- [ ] Completed authorization flow
- [ ] **Copied the Web app URL** 📋
- [ ] Saved URL somewhere safe (e.g., notepad)

### Step 5: Update HTML
- [ ] Opened `index.html` in text editor
- [ ] Found line ~3688: `const RSVP_ENDPOINT = "..."`
- [ ] Replaced URL with my new Web app URL
- [ ] Saved the file
- [ ] Verified no typos in the URL

---

## ✅ Testing

### Basic Test
- [ ] Opened `index.html` in browser
- [ ] Scrolled to RSVP section
- [ ] Filled out form:
  - **Name**: "Test User"
  - **Phone**: "+91 1234567890"
  - **Guests**: "2"
  - **Attending**: "COUNT ME IN"
  - **Message**: "Test message"
- [ ] Clicked **Submit RSVP**
- [ ] Saw success message: "Thank you! Your RSVP has been saved."
- [ ] Waited 5 seconds
- [ ] Checked Google Sheet → **New row appeared!** 🎉

### Data Verification
Check the new row in Google Sheet has:
- [ ] Timestamp is current date/time
- [ ] Name: "Test User"
- [ ] Phone: "+91 1234567890"
- [ ] Guests: "2"
- [ ] Attending: "yes"
- [ ] Message: "Test message"

### Delete Test Data
- [ ] Deleted test row(s) from Google Sheet
- [ ] Ready for real submissions!

---

## 🧪 Advanced Testing

### Test Offline Functionality
- [ ] Disconnected from internet (WiFi off)
- [ ] Filled and submitted RSVP form
- [ ] Saw message: "...saved on this device and will send automatically"
- [ ] Reconnected to internet
- [ ] Checked Google Sheet → Entry appeared! ✅

### Test Multiple Submissions
- [ ] Submitted 2-3 test RSVPs with different names
- [ ] All appeared in Google Sheet correctly
- [ ] Order matches submission order

### Test Mobile
- [ ] Opened website on mobile phone
- [ ] RSVP form looks good and is usable
- [ ] Submitted test RSVP from mobile
- [ ] Entry appeared in Google Sheet

---

## 🔍 Troubleshooting Checks

If something doesn't work, verify:

### Sheet Issues
- [ ] Headers are spelled exactly: `Timestamp | Name | Phone | Guests | Attending | Message`
- [ ] No extra spaces in headers
- [ ] Headers are in Row 1
- [ ] Sheet is not protected/locked

### Script Issues
- [ ] Apps Script code matches `google-apps-script.js` exactly
- [ ] Script is saved (💾)
- [ ] Script is authorized (no permission errors)
- [ ] Latest deployment is active

### Deployment Issues
- [ ] "Who has access" is set to **Anyone** (not "Only myself")
- [ ] Deployment type is **Web app**
- [ ] "Execute as" is **Me** (your email)
- [ ] Using latest deployment URL (not test deployment)

### HTML Issues
- [ ] `RSVP_ENDPOINT` URL is updated
- [ ] No typos in URL
- [ ] URL starts with `https://script.google.com/macros/s/`
- [ ] URL ends with `/exec`
- [ ] File is saved after editing

### Browser Issues
- [ ] Browser console shows no errors (F12 → Console)
- [ ] JavaScript is enabled
- [ ] No ad blockers blocking requests
- [ ] Cookies/localStorage are enabled

---

## 📊 Monitoring

### Daily Checks
- [ ] Check Google Sheet for new RSVPs
- [ ] Verify all data is coming through correctly
- [ ] Respond to any messages left by guests

### Apps Script Logs
Access: Apps Script Editor → Left sidebar → **Executions**
- [ ] See incoming requests
- [ ] Check for any errors
- [ ] Verify timestamps

### Summary Stats (Optional)
- [ ] Run `createRSVPSummary()` function for statistics
- [ ] Check "Summary" sheet for totals

---

## 🎯 Production Ready Checklist

Before sharing the invitation:
- [ ] ✅ Google Sheet is working
- [ ] ✅ Apps Script is deployed
- [ ] ✅ RSVP form tested successfully
- [ ] ✅ Test data deleted from sheet
- [ ] ✅ Mobile version tested
- [ ] ✅ Offline functionality tested
- [ ] ✅ Have access to Google Sheet on phone (for on-the-go checks)
- [ ] ✅ Set up notifications (optional: Google Sheets mobile app)

---

## 📱 Optional: Email Notifications

Want email alerts for new RSVPs? Add to Apps Script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // ... existing code to save to sheet ...
    
    // Send email notification
    MailApp.sendEmail({
      to: "your-email@gmail.com", // Your email here
      subject: "New RSVP: " + data.name,
      body: `New RSVP received!\n\nName: ${data.name}\nPhone: ${data.phone}\nGuests: ${data.guests}\nAttending: ${data.attend}\nMessage: ${data.message}`
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // ... existing error handling ...
  }
}
```

---

## 🎉 You're Done!

If all items are checked ✅, your RSVP system is live and ready!

### Quick Reference
- **Google Sheet**: [Your sheet URL here]
- **Apps Script**: [Your script URL here]
- **Web App**: [Your deployment URL here]

### Support Files
- `QUICK_SETUP.md` - Quick reference
- `GOOGLE_SHEET_SETUP.md` - Detailed guide
- `RSVP_FLOW.md` - Technical docs
- `google-apps-script.js` - Script code

---

**🎊 Congratulations on your wedding, Drishya & Hardeep! 💑**
