import { signOutFirebase } from "../firebase/authService";
import { deleteWebsiteSession } from "./sessionClient";

export default async function signOut() {
  try {
    await signOutFirebase();
    await deleteWebsiteSession();
    return { error: null };
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
    return { error };
  }
}
