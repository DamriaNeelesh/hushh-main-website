const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./public/tinder/data.json', 'utf8'));

let businesses = [];
if (data.yelp_data && data.yelp_data.search_results) {
  for (const res of data.yelp_data.search_results) {
    if (res.response_body && res.response_body.search_response_context && res.response_body.search_response_context.search_result) {
      const searchResult = res.response_body.search_response_context.search_result;
      
      // Some hits are in lookaside
      if (searchResult.lookaside && searchResult.lookaside['platform_business/v3/business_search'] && searchResult.lookaside['platform_business/v3/business_search'].hits) {
        Object.values(searchResult.lookaside['platform_business/v3/business_search'].hits).forEach(hit => {
          businesses.push(hit);
        });
      }
      
      if (searchResult.business_list) {
         businesses.push(...searchResult.business_list);
      }
    }
  }
}

console.log(`Extracted ${businesses.length} raw businesses.`);

// Try to find one with good data like name and image
const fullBiz = businesses.find(b => b.name || b.image_url || b.photos);
console.log('Sample Business Structure:');
console.log(JSON.stringify(fullBiz || businesses[0], null, 2));

const allKeys = new Set();
businesses.forEach(b => {
  Object.keys(b).forEach(k => allKeys.add(k));
});
console.log('All available keys:', Array.from(allKeys));
