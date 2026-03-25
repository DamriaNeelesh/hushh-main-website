import getSession from "./getSession";

export default async function getUserDetails(setUserDetails) {
  try {
    const { data } = await getSession();

    const userDetails = {
      data: data?.session || null,
    };

    if (setUserDetails) {
      setUserDetails(userDetails);
    }

    return userDetails;
  } catch (error) {
    console.error("Error getting user details:", error);
    return { data: null };
  }
}
