'use client';
import React, { createContext, useState, useContext, ReactNode } from "react";
import { loginUser, logoutUser } from "@/app/_services/account.service";

interface UserContextType {
  user: any;
  login: (userData: any) => Promise<User | null>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (userData: any) : Promise<User | null> => {
    var user = await loginUser(userData);
    setUser(userData);
    return user;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
