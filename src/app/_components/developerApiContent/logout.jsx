import { useRouter } from "next/navigation";
import React from "react";
import '../../_styles/developer-fonts.css'
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { session, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/developers");
  };

  return (
    <div>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button
          onClick={() =>
            router.push("/developers/login")
          }
        >
          LogIn
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
