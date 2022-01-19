import { ReactNode } from "react";
import { AuthProvider, useAuth } from "./userAuthProvider";
import { HeaderStateProvider, useHeader } from "./useHeaderStateProvider";

type ProviderProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <AuthProvider>
        <HeaderStateProvider>{children}</HeaderStateProvider>
      </AuthProvider>
    </>
  );
};

export { useAuth, Providers, useHeader };
