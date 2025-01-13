// import services from "../services/services";
import authentication from "./authentication";

export default async function getAccessToken(setAccessToken) {
  let userDetails = await authentication.getUserDetails();
  if (!(userDetails && userDetails.data)) return null;
  setAccessToken ? setAccessToken(userDetails.data.access_token) : "";
  return userDetails.data.access_token;
}
