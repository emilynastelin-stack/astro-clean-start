import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import { exec } from 'child_process';
import os from 'os';
import path from 'path';

// Load service account JSON
const creds = JSON.parse(fs.readFileSync('c:\\Users\\emily\\Downloads\\SERVICE-ACCOUNT.json'));

// Your Google Sheet ID
const SHEET_ID = '1UiK8QDq98C-9wCpQjdQAVpSdH8mZkpxYgMMEHM3uaGk';

async function exportSheet() {
  const doc = new GoogleSpreadsheet(SHEET_ID);

  // Authenticate
  await doc.useServiceAccountAuth(creds);

  // Load spreadsheet info
  await doc.loadInfo();

  // Grab first sheet (or by title)
  const sheet = doc.sheetsByTitle['MusicList'];
  await sheet.loadHeaderRow();

  // Get all rows
  const rows = await sheet.getRows();

  // Convert to your api.sheets.json format
  const data = {
    __sheet: 'MusicList!A1:Z1000',
    rows: rows.map(r => {
      const obj = {};
      sheet.headerValues.forEach(h => obj[h] = r[h] || '');
      return obj;
    })
  };

  // Write to a temp file
  const tempFile = path.join(os.tmpdir(), 'exported_sheet.json');
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));

  // Open in Notepad immediately
  exec(`notepad "${tempFile}"`, (err) => {
    if (err) console.error('Failed to open Notepad:', err);
  });
}

exportSheet().catch(console.error);
