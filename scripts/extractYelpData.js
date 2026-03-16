const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./public/tinder/data.json', 'utf8'));
  let businesses = [];
  
  // Try to find all objects that have a 'name' and 'id' property by deep tree walking
  function traverse(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    if (Array.isArray(obj)) {
      for (const item of obj) traverse(item);
      return;
    }
    
    // If it looks like a business (has name, id, and maybe rating or image_url)
    if (obj.id && obj.name && (obj.image_url !== undefined || obj.rating !== undefined || obj.review_count !== undefined)) {
      businesses.push(obj);
    }
    
    // Also check lookaside dictionary format commonly found in Yelp GraphQL/API responses
    if (obj.business_list && Array.isArray(obj.business_list)) {
      // Just to note, but we'll keep traversing
    }
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        traverse(obj[key]);
      }
    }
  }
  
  traverse(data);
  
  // Deduplicate by id
  const uniqueBiz = new Map();
  for (const b of businesses) {
    uniqueBiz.set(b.id, b);
  }
  const results = Array.from(uniqueBiz.values());
  
  console.log(`Found ${results.length} unique businesses with name & id.`);
  if (results.length > 0) {
    console.log('Sample Business Structure:');
    console.log(JSON.stringify(results[0], null, 2));
    
    // Save extracted data to a simple JSON for the frontend
    fs.writeFileSync('./public/investorData.json', JSON.stringify(results, null, 2));
    console.log('Saved to public/investorData.json');
  }

} catch(err) {
  console.error("Error:", err);
}
