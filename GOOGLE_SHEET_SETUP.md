# Google Sheets Integration Setup Guide

This guide will help you connect your RSVP form to a Google Sheet.

## Overview

The RSVP form is already configured to send data to Google Sheets via Google Apps Script. You just need to:
1. Create a Google Sheet
2. Add the Apps Script code
3. Deploy it as a web app
4. Update the endpoint URL in your HTML

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Wedding RSVP Responses"
4. In the first row, add these column headers:
   ```
   Timestamp | Name | Phone | Guests | Attending | Message
   ```

---

## Step 2: Add the Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the script below:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get timestamp
    const timestamp = new Date();
    
    // Prepare row data matching the form fields
    const rowData = [
      timestamp,
      data.name || '',
      data.phone || '',
      data.guests || '',
      data.attend || '',
      data.message || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        phone: '+91 1234567890',
        guests: '2',
        attend: 'yes',
        message: 'Test message'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click **Save** (💾 icon) and name your project (e.g., "Wedding RSVP Handler")

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Wedding RSVP Form Handler" (or any description)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important!)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** that appears (it looks like: `https://script.google.com/macros/s/XXXXX/exec`)

---

## Step 4: Update Your HTML File

1. Open your `index.html` file
2. Find this line (around line 3688):
   ```javascript
   const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxtUvjtepQjX9VSJ5I1hFemHqVnYUqYRoLDn8oy_hTrvOxaktS8fnxsWHEJdFcaxz_V/exec";
   ```
3. Replace the URL with your new Web app URL from Step 3
4. Save the file

---

## Step 5: Test the Form

1. Open your `index.html` in a browser
2. Scroll to the RSVP section
3. Fill out the form and submit
4. Check your Google Sheet - a new row should appear with the data!

---

## Troubleshooting

### Form submits but nothing appears in the sheet
- Make sure the Web app is deployed with "Who has access" set to **Anyone**
- Check that the Apps Script is saved and the latest deployment is active
- Try redeploying the web app

### Getting authorization errors
- Make sure you authorized the script during deployment
- The script needs permission to write to your spreadsheet

### Data appears incorrectly in the sheet
- Check that your column headers match: `Timestamp | Name | Phone | Guests | Attending | Message`
- Make sure the Apps Script code matches exactly as shown above

### Testing the Script
You can test if your script works by:
1. In Apps Script editor, select the `testDoPost` function from the dropdown
2. Click Run (▶️)
3. Check your Google Sheet for a test entry

---

## Features Already Built-In

Your RSVP form already includes:
- ✅ **Offline support**: RSVPs are saved locally if internet is unavailable
- ✅ **Auto-retry**: Failed submissions automatically retry when connection is restored
- ✅ **User feedback**: Success/error messages show after submission
- ✅ **Data validation**: Required fields and input validation
- ✅ **Mobile-friendly**: Works on all devices

---

## Current RSVP Endpoint

Your current endpoint URL is:
```
https://script.google.com/macros/s/AKfycbxtUvjtepQjX9VSJ5I1hFemHqVnYUqYRoLDn8oy_hTrvOxaktS8fnxsWHEJdFcaxz_V/exec
```

If this is already your Google Apps Script deployment, then your form is already connected! Just verify:
1. The Google Sheet has the correct headers
2. The Apps Script code is deployed
3. Test by submitting the form

---

## Need Help?

If you run into issues:
1. Check the browser console for error messages (F12 → Console tab)
2. In Apps Script, go to Executions to see if requests are coming through
3. Make sure the URL in `index.html` exactly matches your deployment URL
