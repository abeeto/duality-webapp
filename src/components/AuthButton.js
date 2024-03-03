import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const AuthButton = () => {
    const [user] = useAuthState(auth);

    const  googleSignIn = async () => {
        await signInWithPopup(auth, new GoogleAuthProvider());
    }

    const signOut = () => {
        auth.signOut()
    };

    return (
        !user ?
            <button className="sign-in">
            <img
                onClick={googleSignIn}
                src={GoogleSignin}
                alt="sign in with google"
                type="button"
            />
            </button>
        :
            <button className="sign-out" onClick={signOut}>Sign Out</button>
    );
}