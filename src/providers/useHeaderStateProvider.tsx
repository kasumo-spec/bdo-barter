import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type HeaderStateProviderProps = {
  children: ReactNode;
};

type HeaderStateContextData = {
  firstButton: string;
  setFirstButton: (firstButton: string) => void;
  actualLocation: string;
  setActualLocation: (actualLocation: string) => void;
};

export const HeaderStateContext = createContext<HeaderStateContextData>(
  {} as HeaderStateContextData
);

export const HeaderStateProvider = ({ children }: HeaderStateProviderProps) => {
  const [actualLocation, setActualLocation] = useState("");
  const [firstButton, setFirstButton] = useState("");

  useEffect(() => {
    if (actualLocation === "/dashboard") {
      setFirstButton("/allShips");
    } else if (actualLocation === "/allShips") {
      setFirstButton("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualLocation]);

  return (
    <HeaderStateContext.Provider
      value={{ firstButton, setFirstButton, actualLocation, setActualLocation }}
    >
      {children}
    </HeaderStateContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderStateContext);
