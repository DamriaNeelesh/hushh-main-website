import config from "../config/config";

export default async function signOut() {
  await config.supabaseClient.auth.signOut();
}
