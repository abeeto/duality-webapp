import React, { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

// Create context
const UserContext = createContext();

// Provider component
export const UserContextProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
