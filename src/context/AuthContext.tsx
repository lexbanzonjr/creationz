import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  const [getId, setId] = useState<IdParams>(blankId);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = (params: LoginParams) => {
    localStorage.setItem("accessToken", params.token);
    localStorage.setItem("idToken", JSON.stringify(params.idToken));
    setId(params.idToken as IdParams);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    setId(blankId);
    setAuthenticated(false);
  };

  useEffect(() => {
    // Check if the token exists on initial load
    const token = localStorage.getItem("accessToken");
    const isAuth = !!token;
    setAuthenticated(isAuth);

    const idToken = localStorage.getItem("idToken");
    if (idToken) {
      setId(JSON.parse(idToken) as IdParams);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
