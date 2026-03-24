const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '../support/data/tinder/US RIA Verified Contact Database Mar2026.xlsx');
const outputPath = path.join(__dirname, '../public/investorData.json');

async function main() {
  console.log('Reading Excel file...');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);

  const worksheet = workbook.worksheets[0];
  const rawData = worksheet.getSheetValues()
    .slice(1)
    .map((row) => (Array.isArray(row) ? row.slice(1) : []));

  console.log(`Total rows in sheet: ${rawData.length}`);

  // Row index 0 usually has the title, Row 1 has subtitle
  // Example from preview:
  // R0: US SEC-Registered Investment Adviser Firms...
  // R1: ...
  // R2: SEC#, Firm Name, Legal Name...
  // Let's find the header row by looking for "Firm Name" or similar
  let headerRowIndex = 2; // Default
  for (let i = 0; i < 10; i++) {
    if (
      rawData[i]
      && rawData[i].some(
        (value) =>
          typeof value === 'string'
          && (value.includes('SEC#') || value.includes('Firm Name'))
      )
    ) {
      headerRowIndex = i;
      break;
    }
  }

  console.log(`Headers found at row index: ${headerRowIndex}`);
  const headers = rawData[headerRowIndex];
  console.log('Headers:', headers);

  const rows = rawData
    .slice(headerRowIndex + 1)
    .filter((row) => row.length > 0 && row.some(Boolean));

  const investors = rows.map((row, index) => {
    const obj = { id: index + 1 };
    headers.forEach((header, columnIndex) => {
      if (!header || typeof header !== 'string') return;

      let cleanKey = header
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase();

      if (cleanKey === 'sec') cleanKey = 'sec_id';

      obj[cleanKey] = row[columnIndex] || '';
      obj[`_raw_${cleanKey}`] = header;
    });

    if (obj.firm_name) {
      Object.defineProperty(obj, 'name', { value: obj.firm_name, enumerable: true });
    } else if (obj.legal_name) {
      Object.defineProperty(obj, 'name', { value: obj.legal_name, enumerable: true });
    }

    if (obj.city) {
      Object.defineProperty(obj, 'location', {
        value: obj.city + (obj.state ? `, ${obj.state}` : ''),
        enumerable: true,
      });
    }

    return obj;
  });

  console.log(`Writing ${investors.length} investor records...`);
  fs.writeFileSync(outputPath, JSON.stringify(investors, null, 2));
  console.log(`Done! Output: ${outputPath}`);
}

main().catch((error) => {
  console.error('Failed to convert investor data:', error);
  process.exitCode = 1;
});
