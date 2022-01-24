import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { auth } from "../services";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutAuth,
} from "firebase/auth";

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setUserName(null);
      }
    });
    async function tokenLocalStorage() {
      const token = localStorage.getItem("token");
      if (token) {
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      setUserName(user.displayName);
      setUserId(user.uid);
      setUserToken(token);
      setIsAuthenticated(true);
    } catch (e) {
      setLoginError("Usuário ou senha inválidos");
    }
  }

  async function signUp({ username, email, password }: UserCredentials) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(user);
      await updateProfile(user, { displayName: username });
      setSignUpError(null);
    } catch (e) {
      setSignUpError("Usuário já existe");
    }
  }

  async function signOut() {
    signOutAuth(auth);
    localStorage.clear();
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
