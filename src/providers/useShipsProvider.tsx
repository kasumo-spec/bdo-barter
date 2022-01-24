import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { firestore } from "../services";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from "firebase/firestore";
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
    async function loadShips() {
      const q = query(collection(firestore, "ships"));
      const snapshot = await getDocs(q);
      const result: ShipDetails[] = [];
      snapshot.forEach((ship: any) => {
        result.push({
          id: ship.id,
          ...ship.data(),
        });
      });
      setShips(result);
    }
    loadShips();
  }, [userToken]);

  async function addShip(ship: ShipDetails) {
    const shipsCollection = collection(firestore, "ships");
    await addDoc(shipsCollection, ship);
    setShips([...ships, ship]);
  }

  async function deleteShip(ship: ShipDetails) {
    await deleteDoc(doc(firestore, `ships/${ship.id}`));
    setShips(ships.filter((s) => s.id !== ship.id));
  }

  async function editShip(ship: ShipDetails) {
    await updateDoc(doc(firestore, `ships/${ship.id}`), ship);
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
