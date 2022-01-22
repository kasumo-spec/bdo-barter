import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { api } from "../services";
import jwtDecode from "jwt-decode";

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
};

type UserToken = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

type AuthContextData = {
  signIn(credentials: UserCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: UserCredentials): Promise<void>;
  removeTokenLocalStorage(): Promise<void>;
  userId: string | null;
  userName: string | null;
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
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function tokenLocalStorage() {
      const token = localStorage.getItem("token");
      if (token) {
        setUserName(jwtDecode<UserToken>(token).name);
        setUserId(jwtDecode<UserToken>(token).id);
        setUserToken(token);
        setIsAuthenticated(true);
      }
    }
    tokenLocalStorage();
  }, []);

  async function removeTokenLocalStorage() {
    setUserName(null);
    setUserId(null);
    localStorage.clear();
    setUserToken(null);
    setIsAuthenticated(false);
  }

  async function signIn({ email, password }: UserCredentials) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUserName(jwtDecode<UserToken>(token).name);
      setUserId(jwtDecode<UserToken>(token).id);
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
        userId,
        removeTokenLocalStorage,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
