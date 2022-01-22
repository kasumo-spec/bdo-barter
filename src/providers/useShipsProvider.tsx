import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { api } from "../services";
import { useAuth } from ".";

export type ShipDetails = {
  id?: string;
  name: string;
  shipPhoto: string;
  type: "T1" | "T2" | "T3" | "T4" | "T5";
  itens: {
    [key: string]: {
      name: string;
      value: number;
      img: string;
    };
  };
};

type ShipContextData = {
  ships: ShipDetails[];
  setShips: (ships: ShipDetails[]) => void;
  addShip: (ship: ShipDetails) => void;
  deleteShip: (ship: ShipDetails) => void;
  editShip: (ship: ShipDetails) => void;
};

type ShipProviderProps = {
  children: ReactNode;
};

export const ShipContext = createContext<ShipContextData>(
  {} as ShipContextData
);

export const ShipProvider = ({ children }: ShipProviderProps) => {
  const { userToken } = useAuth();

  const [ships, setShips] = useState<ShipDetails[]>([]);

  useEffect(() => {
    async function getShips() {
      const response = await api.get("/ships/", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setShips(response.data);
    }
    getShips();
  }, [userToken]);

  async function addShip(ship: ShipDetails) {
    const response = await api.post("/ships/", ship, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setShips([...ships, response.data]);
  }

  async function deleteShip(ship: ShipDetails) {
    await api.delete(`/ships/${ship.id}/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setShips(ships.filter((s) => s.id !== ship.id));
  }

  async function editShip(ship: ShipDetails) {
    await api.put(`/ships/${ship.id}/`, ship, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setShips(ships.map((s) => (s.id === ship.id ? ship : s)));
  }

  return (
    <ShipContext.Provider
      value={{
        ships,
        setShips,
        addShip,
        deleteShip,
        editShip,
      }}
    >
      {children}
    </ShipContext.Provider>
  );
};

export const useShips = () => useContext(ShipContext);
