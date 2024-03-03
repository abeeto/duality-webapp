import React from "react";
import { AuthButton } from "./AuthButton";

const Welcome = () => {
  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>To start, record your voice to train our models</p>
      <AuthButton/>
    </main>
  );
};

export default Welcome;