const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '../public/tinder/US RIA Verified Contact Database Mar2026.xlsx');
const outputPath = path.join(__dirname, '../public/investorData.json');

console.log('Reading Excel file...');
const wb = XLSX.readFile(excelPath);
const ws = wb.Sheets[wb.SheetNames[0]];

// Read as 2D array
const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

console.log(`Total rows in sheet: ${rawData.length}`);

// Row index 0 usually has the title, Row 1 has subtitle
// Example from preview: 
// R0: US SEC-Registered Investment Adviser Firms...
// R1: ...
// R2: SEC#, Firm Name, Legal Name...
// Let's find the header row by looking for "Firm Name" or similar

let headerRowIndex = 2; // Default
for(let i=0; i<10; i++) {
  if (rawData[i] && rawData[i].some(v => typeof v === 'string' && (v.includes('SEC#') || v.includes('Firm Name')))) {
    headerRowIndex = i;
    break;
  }
}

console.log(`Headers found at row index: ${headerRowIndex}`);
const headers = rawData[headerRowIndex];
console.log('Headers:', headers);

const rows = rawData.slice(headerRowIndex + 1).filter(r => r.length > 0 && r.some(c => !!c));

const investors = rows.map((row, index) => {
  const obj = { id: index + 1 };
  headers.forEach((h, i) => {
    if (!h || typeof h !== 'string') return;
    // Special cleanups
    let cleanKey = h.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_').toLowerCase();
    
    // Explicit mappings for common columns we want easier access to
    if (cleanKey === 'sec') cleanKey = 'sec_id';
    
    obj[cleanKey] = row[i] || '';
    obj[`_raw_${cleanKey}`] = h; // original header
  });
  
  // Create generic fallbacks for the UI to latch onto easily
  if (obj.firm_name) Object.defineProperty(obj, 'name', { value: obj.firm_name, enumerable: true });
  else if (obj.legal_name) Object.defineProperty(obj, 'name', { value: obj.legal_name, enumerable: true });
  
  if (obj.city) Object.defineProperty(obj, 'location', { value: obj.city + (obj.state ? `, ${obj.state}` : ''), enumerable: true });
  
  return obj;
});

console.log(`Writing ${investors.length} investor records...`);
fs.writeFileSync(outputPath, JSON.stringify(investors, null, 2));
console.log(`Done! Output: ${outputPath}`);
