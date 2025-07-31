import React,{ createContext, useContext, useState } from "react";
export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
