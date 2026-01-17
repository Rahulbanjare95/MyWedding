# Google Sheets RSVP Integration Setup Guide

This guide will help you set up Google Sheets integration for RSVP form submissions.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create a new spreadsheet"
3. Name it "Wedding RSVPs"
4. Create column headers in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Attending`
   - E1: `Number of Guests`
   - F1: `Message`

## Step 2: Create a Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** > **Apps Script**
3. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.attending,
      data.guests,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** > **New Deployment**
5. Select type: **Web app**
6. Configure:
   - Execute as: (Your email/account)
   - Who has access: **Anyone**
7. Click **Deploy**
8. Copy the deployment URL (looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/useless?e=no&stripSet=false`)

## Step 3: Update the React Component

1. Open `/src/components/RsvpSection.tsx`
2. Find this line (around line 30):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/useless?e=no&stripset=false';
   ```
3. Replace `YOUR_SCRIPT_ID` with the deployment URL from Step 2

## Step 4: Test the Integration

1. Start your dev server: `npm run dev`
2. Navigate to the RSVP section
3. Fill out the form and submit
4. Check your Google Sheet - the data should appear as a new row!

## Troubleshooting

### CORS Issues
If you get CORS errors, make sure:
- The Apps Script is deployed as a "Web app"
- "Who has access" is set to "Anyone"

### Data Not Appearing
- Check the Apps Script execution logs for errors
- Verify the Google Sheet column headers match the data being sent
- Ensure the deployment URL is correctly updated in the React component

### Need Help?
Refer to Google's official documentation:
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)

