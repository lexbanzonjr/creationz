import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthenticated(false);
  };

  useEffect(() => {
    // Check if the token exists on initial load
    const token = localStorage.getItem("accessToken");
    setAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, login, logout }}
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
