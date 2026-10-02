# Quick Setup - RSVP to Google Sheets

## ⚡ Quick Steps

### 1️⃣ Create Google Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new sheet: "Wedding RSVP Responses"
- Add headers: `Timestamp | Name | Phone | Guests | Attending | Message`

### 2️⃣ Add Script
- Click **Extensions** → **Apps Script**
- Copy code from `google-apps-script.js` file
- Click **Save** 💾

### 3️⃣ Deploy
- Click **Deploy** → **New deployment**
- Choose **Web app**
- Set **Execute as**: Me
- Set **Who has access**: Anyone
- Click **Deploy** and authorize
- **Copy the URL** 📋

### 4️⃣ Update HTML
- Open `index.html`
- Find line ~3688: `const RSVP_ENDPOINT = "..."`
- Replace with your URL from Step 3
- Save file

### 5️⃣ Test
- Open website and submit test RSVP
- Check Google Sheet for the entry ✅

---

## 📊 Your Current Setup

**Current Endpoint:**
```
https://script.google.com/macros/s/AKfycbxtUvjtepQjX9VSJ5I1hFemHqVnYUqYRoLDn8oy_hTrvOxaktS8fnxsWHEJdFcaxz_V/exec
```

If this is your Apps Script URL, you're already connected! Just verify the sheet and script are set up correctly.

---

## 🎯 What Gets Saved

Every RSVP submission saves:
- ⏰ Timestamp
- 👤 Guest Name
- 📱 Phone Number
- 👥 Number of Guests
- ✅ Attendance (Yes/No)
- 💬 Message/Blessings

---

## 🔧 Troubleshooting

**Nothing appears in sheet?**
→ Check deployment is set to "Anyone" access

**Authorization error?**
→ Authorize the script during deployment

**Old data in sheet?**
→ Clear sheet and re-add headers

---

## 📁 Files You Need

1. **GOOGLE_SHEET_SETUP.md** - Detailed instructions
2. **google-apps-script.js** - Script code to copy
3. **index.html** - Your website (already configured!)

---

## 💡 Pro Tips

- Test with the `testDoPost()` function in Apps Script
- Use `initializeSheet()` to auto-create headers
- Use `createRSVPSummary()` for attendance statistics
- The form works offline and auto-retries failed submissions!

---

## Need Help?

See **GOOGLE_SHEET_SETUP.md** for detailed troubleshooting and instructions.
