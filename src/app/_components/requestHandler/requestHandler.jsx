const BASE_URL = "https://hushh-api-53407187172.us-central1.run.app/";
// Maximum retries for 429 errors
const MAX_RETRIES = 3;

export async function httpRequest(method, endpoint, options = {}) {
  const { params, body, headers } = options;

  // Build the query string from `params` if provided
  let queryString = "";
  if (params && typeof params === "object" && Object.keys(params).length > 0) {
    queryString = "?" + new URLSearchParams(params).toString();
  }

  // Prepare fetch options
  const fetchOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };

  // Attach body if needed
  if (body && ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(body);
  }

  // Retry logic with exponential backoff
  let retries = 0;
  let delay = 1000; // Initial delay in milliseconds

  while (retries <= MAX_RETRIES) {
    const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, fetchOptions);

    if (response.ok) {
      // Parse and return the JSON response
      try {
        return await response.json();
      } catch (err) {
        return null; // Return null if parsing fails
      }
    } else if (response.status === 429) {
      // Handle rate limiting (429 Too Many Requests)
      const retryAfter = response.headers.get("Retry-After");
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay;

      // Wait for the specified time before retrying
      console.warn(`429 Too Many Requests - Retrying in ${waitTime / 1000} seconds`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      // Increment retries and double the delay for exponential backoff
      retries++;
      delay *= 2;
    } else {
      // Handle other errors
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
  }

  // If max retries are exceeded, throw an error
  throw new Error("Max retries exceeded for 429 Too Many Requests");
}
