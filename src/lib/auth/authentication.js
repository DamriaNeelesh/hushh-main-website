import googleSignIn from "./googleSignIn";
import getUserDetails from "./getUserDetails";
import signOut from "./signOut";
import isLoggedIn from "./isLoggedIn";
import getSession from "./getSession";

const authentication = {
  googleSignIn: googleSignIn,
  getUserDetails: getUserDetails,
  signOut: signOut,
  isLoggedIn: isLoggedIn,
  getSession: getSession,
};

export default authentication; 