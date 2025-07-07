export default async function getUserDetails(setUserDetails) {
  try {
    const localCreds = localStorage.getItem("sb-gsqmwxqgqrgzhlhmbscg-auth-token");
    const localCredsJSON = localCreds ? JSON.parse(localCreds) : null;
    
    const userDetails = {
      data: localCredsJSON,
    };
    
    if (setUserDetails) {
      setUserDetails(userDetails);
    }
    
    return userDetails;
  } catch (error) {
    console.error('Error getting user details:', error);
    return { data: null };
  }
} 