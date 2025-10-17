export async function getComposers() {
  const SHEET_ID = '1UiK8QDq98C-9wCpQjdQAVpSdH8mZkpxYgMMEHM3uaGk';
  const API_KEY = 'c6a969ce59a0bf9dd52bbc0934a30b4526f872d9';
  const RANGE = 'Sheet1!A:R';

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
   const res = await fetch(url);
  if (!res.ok) {
    console.error('Failed to fetch sheet:', res.statusText);
    return [];
  }

  const data = await res.json();
  if (!data.values || data.values.length === 0) return [];

  // First row is headers
  const [headers, ...rows] = data.values;

  // Map each row to an object using headers
  const composers = rows.map(row => {
    return Object.fromEntries(
      headers.map((header, i) => [header, row[i] || ''])
    );
  });

  return composers;
}