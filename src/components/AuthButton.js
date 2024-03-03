import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userContext } from "../App";


export const AuthButton = () => {
    const { user } = React.useContext(userContext);

    const  googleSignIn = async () => {
        try{
            await signInWithPopup(auth, new GoogleAuthProvider());
        }catch (err){
            console.error(err)
        }
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