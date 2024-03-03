import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//create context for user auth

export const userContext = React.createContext();
function App() {
  const [user] = useAuthState(auth);
  return (
    <userContext.Provider value={{ user }}>
      <div className="App">
        <NavBar />
        {!user ? (
          <Welcome />
        ) : (
          <>
            <ChatBox />
          </>
        )}
      </div>
    </userContext.Provider>
  );
}

export default App;