export default async function getUserDetails(setUserDetails) {
  let localCreds = localStorage.getItem("sb-eaeokyefsdfamwqqzfko-auth-token");
  let localCredsJSON = JSON.parse(localCreds ? localCreds : null);
  let userDetails = {
    data: localCredsJSON,
  };
  setUserDetails? setUserDetails(userDetails): '';
  console.log('User Details:',userDetails);
  return userDetails;
}
