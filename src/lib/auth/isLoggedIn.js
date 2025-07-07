import getUserDetails from "./getUserDetails";

export default async function isLoggedIn(setIsLoggedIn) {
  try {
    const userDetails = await getUserDetails(null);
    const loggedIn = !(userDetails.data == null);
    
    if (setIsLoggedIn) {
      setIsLoggedIn(loggedIn);
    }
    
    return loggedIn;
  } catch (error) {
    console.error('Error checking login status:', error);
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
    return false;
  }
} 