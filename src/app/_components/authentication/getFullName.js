// import services from "../services/services";
import authentication from "./authentication";
export default async function getFullName(setFullName) {
  let userDetails = await authentication.getUserDetails();
  let full_name = userDetails?.data?.user?.user_metadata?.full_name;
  setFullName ? setFullName(full_name) : "";
  return full_name;
}
