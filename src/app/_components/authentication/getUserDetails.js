import authConfig from "../../../lib/config/authConfig";

export default async function getUserDetails(setUserDetails) {
  try {
    const {
      data: { session },
    } = await authConfig.supabaseClient.auth.getSession();

    const userDetails = {
      data: session,
    };

    setUserDetails ? setUserDetails(userDetails) : "";
    return userDetails;
  } catch (error) {
    console.error("Error getting user details:", error);
    return { data: null };
  }
}
