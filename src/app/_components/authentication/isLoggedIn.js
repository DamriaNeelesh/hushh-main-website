// import services from "../services/services";
import authentication from "./authentication";
export default async function isLoggedIn(setIsLoggedIn){
    let userDetails = await authentication.getUserDetails();
    setIsLoggedIn? setIsLoggedIn(!(userDetails.data==null)): '';
    return !(userDetails.data==null);
}

