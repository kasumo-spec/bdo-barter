import { createContext, ReactNode, useState, useContext } from "react";
import { api } from "../services";

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
};

type AuthContextData = {
  signIn(credentials: UserCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: UserCredentials): Promise<void>;
  tokenLocalStorage(): Promise<void>;
  removeTokenLocalStorage(): Promise<void>;
  isAuthenticated: boolean;
  userToken: string | null;
  loginError: string | null;
  signUpError: string | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  async function tokenLocalStorage() {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);
    }
  }

  async function removeTokenLocalStorage() {
    localStorage.clear();
    setUserToken(null);
    setIsAuthenticated(false);
  }

  async function signIn({ email, password }: UserCredentials) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      setUserToken(token);
      setIsAuthenticated(true);
    } catch (e) {
      setLoginError("Usuário ou senha inválidos");
    }
  }

  async function signUp({ username, email, password }: UserCredentials) {
    try {
      await api.post("/signup", { username, email, password });
      setSignUpError(null);
    } catch (e) {
      setSignUpError("Usuário já existe");
    }
  }

  async function signOut() {
    setUserToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        userToken,
        loginError,
        signUpError,
        tokenLocalStorage,
        removeTokenLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
