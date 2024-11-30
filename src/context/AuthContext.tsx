import React, { createContext, useContext, useState, ReactNode } from "react";

interface IdParams {
  name: string;
  email: string;
  roles: string[];
}

interface LoginParams {
  token: string;
  idToken: { roles: string[] };
}

interface AuthContextType {
  getAccessToken: string;
  setAccessToken: (accessToken: string) => void;
  getId: IdParams;
  setId: (params: IdParams) => void;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;

  login: (params: LoginParams) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const blankId = { name: "", email: "", roles: [] };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [getAccessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") ?? ""
  );
  const [getId, setId] = useState<IdParams>(() =>
    JSON.parse(localStorage.getItem("idToken") ?? "{}")
  );
  const [isAuthenticated, setAuthenticated] = useState(
    () => !!localStorage.getItem("accessToken")
  );

  const login = (params: LoginParams) => {
    localStorage.setItem("accessToken", params.token);
    localStorage.setItem("idToken", JSON.stringify(params.idToken));
    setAccessToken(params.token);
    setId(params.idToken as IdParams);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    setAccessToken("");
    setId(blankId);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        setAccessToken,
        getId,
        setId,
        isAuthenticated,
        setAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
