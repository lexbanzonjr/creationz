import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LoginParams {
  token: string;
  idToken: { roles: string[] };
}

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  login: (params: LoginParams) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = (params: LoginParams) => {
    console.log(params);
    localStorage.setItem("accessToken", params.token);
    localStorage.setItem("idToken", JSON.stringify(params.idToken));
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
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
