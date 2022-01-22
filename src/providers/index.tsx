import { ReactNode } from "react";
import { AuthProvider, useAuth } from "./userAuthProvider";
import { HeaderStateProvider, useHeader } from "./useHeaderStateProvider";
import { ShipProvider, useShips } from "./useShipsProvider";
import { UserShipsProvider, useUserShips } from "./useUserShipsProvider";

type ProviderProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <AuthProvider>
        <HeaderStateProvider>
          <ShipProvider>
            <UserShipsProvider>{children}</UserShipsProvider>
          </ShipProvider>
        </HeaderStateProvider>
      </AuthProvider>
    </>
  );
};

export { useAuth, Providers, useHeader, useShips, useUserShips };
