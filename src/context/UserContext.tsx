// import { createContext, useState } from "react";


// type AuthUser = {
//     email: 'string';
//     name: 'string';
// }

// export type UserContextType = {
//     user: any;
//     setUser: any;
// };

// type UserContextProviderType = {
//     children: React.ReactNode;
// }

// export const UserContext = createContext({} as UserContextType); 

// export const UserContextProvider = ({children}: UserContextProviderType) => {
//     const [user, setUser] = useState<AuthUser | null>(null);

//     return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
// }



import { createContext, useContext, useState } from "react";

/** User type */
export type AuthUser = {
  name: string;
  accessToken: string;
};

/** Context type */
type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

/** Create context */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provider */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (user: AuthUser) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Custom hook (recommended) */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
