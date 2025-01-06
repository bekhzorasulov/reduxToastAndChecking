import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

export function useAuthWithGoogle() {
  const provider = new GoogleAuthProvider();
  const [isPending, setIsPanding] = useState();

  const googleSignIn = async () => {
    setIsPanding(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
    } catch {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return { googleSignIn, isPending };
}
