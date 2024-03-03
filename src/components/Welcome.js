import React from "react";
import { AuthButton } from "./AuthButton";

const Welcome = () => {
  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <AuthButton/>
    </main>
  );
};

export default Welcome;