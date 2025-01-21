const BASE_URL = "https://hushh-api-53407187172.us-central1.run.app/";
// https://hushh-api-53407187172.us-central1.run.app/ 
export async function httpRequest(method, endpoint, options = {}) {
  const { params, body, headers } = options;

  // 1. Build the query string from `params` if provided
  let queryString = "";
  if (params && typeof params === "object" && Object.keys(params).length > 0) {
    queryString = "?" + new URLSearchParams(params).toString();
  }

  // 2. Prepare fetch options
  const fetchOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };

  // 3. Attach body if needed
  if (body && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
    fetchOptions.body = JSON.stringify(body);
  }

  // 4. Perform the fetch using the base URL + endpoint
  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, fetchOptions);

  // 5. Handle non-OK responses
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  }

  // 6. Parse and return the JSON response (or return null if parsing fails)
  try {
    return await response.json();
  } catch (err) {
    return null;
  }
}
