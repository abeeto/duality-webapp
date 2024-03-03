import React from "react";
import { AuthButton } from "./AuthButton";

const Welcome = () => {
  return (
    <main className="welcome">
      <header role="banner" class="heropanel--video" loop = "">
          <div class="heropanel__content">
              <h2>Welcome To Duality</h2>
              <p>Texting Redefined</p>
          </div>
          <p>To start, sign in with a Google account </p>
          <AuthButton/>
      </header>
    </main>
  );
};

export default Welcome;