/**
 * Google Apps Script for Wedding RSVP Form
 * 
 * This script receives form submissions and saves them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions → Apps Script
 * 3. Copy and paste this entire file
 * 4. Click Save (💾)
 * 5. Click Deploy → New deployment
 * 6. Select "Web app" type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click Deploy and copy the web app URL
 * 10. Update the RSVP_ENDPOINT in index.html with your URL
 * 
 * Your Google Sheet should have these headers in the first row:
 * Timestamp | Name | Phone | Guests | Attending | Message
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Name', 'Phone', 'Guests', 'Attending', 'Message'];
      sheet.appendRow(headers);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#A78BCB'); // Purple color to match your theme
      headerRange.setFontColor('#FFFFFF');
      
      // Freeze the header row
      sheet.setFrozenRows(1);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get timestamp in IST (India Standard Time)
    const timestamp = new Date();
    
    // Prepare row data matching the form fields
    const rowData = [
      timestamp,              // Timestamp
      data.name || '',        // Full Name
      data.phone || '',       // Phone Number
      data.guests || '',      // Number of Guests
      data.attending || '',   // Will You Attend? (yes/no)
      data.message || ''      // Message for the Couple
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Optional: Format the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss'); // Format timestamp
    
    // Optional: Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 6);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success',
        message: 'RSVP saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error saving RSVP:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Handle GET requests (for testing)
 * Visit the web app URL in a browser to test if it's working
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Wedding RSVP Handler is active! ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function - Run this to verify the script works
 * 
 * To test:
 * 1. Select "testDoPost" from the function dropdown
 * 2. Click Run (▶️)
 * 3. Check your Google Sheet for a test entry
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        phone: '+91 9876543210',
        guests: '2',
        attending: 'yes',
        message: 'Looking forward to celebrating with you! 🎉'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
  
  // Check the logs: View → Logs
  console.log('Test completed! Check your sheet for the test entry.');
}

/**
 * Optional: Initialize the sheet with headers if they don't exist
 * 
 * To use:
 * 1. Select "initializeSheet" from the function dropdown
 * 2. Click Run (▶️)
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Check if headers already exist
  if (sheet.getLastRow() === 0) {
    const headers = ['Timestamp', 'Name', 'Phone', 'Guests', 'Attending', 'Message'];
    sheet.appendRow(headers);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#A78BCB'); // Purple color to match your theme
    headerRange.setFontColor('#FFFFFF');
    
    // Freeze the header row
    sheet.setFrozenRows(1);
    
    console.log('Sheet initialized with headers!');
  } else {
    console.log('Headers already exist. No changes made.');
  }
}

/**
 * Optional: Get statistics about RSVPs
 * This creates a summary on a separate sheet
 */
function createRSVPSummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let summarySheet = ss.getSheetByName('Summary');
  
  // Create summary sheet if it doesn't exist
  if (!summarySheet) {
    summarySheet = ss.insertSheet('Summary');
  }
  
  const dataSheet = ss.getSheets()[0]; // First sheet with RSVP data
  const data = dataSheet.getDataRange().getValues();
  
  // Skip header row
  const rsvps = data.slice(1);
  
  // Calculate statistics
  const totalResponses = rsvps.length;
  const attending = rsvps.filter(row => row[4] === 'yes').length;
  const notAttending = rsvps.filter(row => row[4] === 'no').length;
  const totalGuests = rsvps.reduce((sum, row) => sum + (parseInt(row[3]) || 0), 0);
  
  // Clear existing summary
  summarySheet.clear();
  
  // Write summary
  summarySheet.appendRow(['RSVP Summary']);
  summarySheet.appendRow(['']);
  summarySheet.appendRow(['Total Responses', totalResponses]);
  summarySheet.appendRow(['Attending', attending]);
  summarySheet.appendRow(['Not Attending', notAttending]);
  summarySheet.appendRow(['Total Guests', totalGuests]);
  summarySheet.appendRow(['']);
  summarySheet.appendRow(['Last Updated', new Date()]);
  
  // Format summary
  summarySheet.getRange('A1').setFontSize(14).setFontWeight('bold');
  summarySheet.getRange('A3:A8').setFontWeight('bold');
  summarySheet.autoResizeColumns(1, 2);
  
  console.log('Summary created successfully!');
}
