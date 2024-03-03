import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
// import { auth } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { UserContextProvider, useUser } from "./components/UserContextProvider";
import {  AudioContextProvider } from "./components/AudioContextProvider";


function AppContent() {
  const { user } = useUser(); // Use the custom hook to access user

  return (
    <div className="App">
      <NavBar />
      { user ? <ChatBox />  : <Welcome/> }
    </div>
  );    
}

function App() {
  return (
    <UserContextProvider>
      <AudioContextProvider>
        <AppContent />
      </AudioContextProvider>
    </UserContextProvider>
  );
}

export default App;