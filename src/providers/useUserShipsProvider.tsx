import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { firestore } from "../services";
import { useAuth } from ".";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export type UserShipsDetails = {
  id?: string;
  userId: string | null;
  shipId: string | undefined;
  shipUserItens: {
    [key: string]: number;
  };
};

type UserShipsContextData = {
  userShips: UserShipsDetails[];
  setUserShips: (userShips: UserShipsDetails[]) => void;
  addUserShip: (userShip: UserShipsDetails) => void;
  deleteUserShip: (userShip: UserShipsDetails) => void;
  editUserShip: (userShip: UserShipsDetails) => void;
};

type UserShipsProviderProps = {
  children: ReactNode;
};

export const UserShipsContext = createContext<UserShipsContextData>(
  {} as UserShipsContextData
);

export const UserShipsProvider = ({ children }: UserShipsProviderProps) => {
  const { userId } = useAuth();
  const [userShips, setUserShips] = useState<UserShipsDetails[]>([]);

  useEffect(() => {
    async function getUserShips() {
      const userShipsCollection = collection(firestore, "userShips");
      const results = await getDocs(userShipsCollection);
      const result: UserShipsDetails[] = [];
      results.forEach((userShip: any) => {
        result.push({
          id: userShip.id,
          userId: userShip.userId,
          shipId: userShip.shipId,
          shipUserItens: userShip.shipUserItens,
        });
      });
      const shipUser = result.find(
        (userShip: UserShipsDetails) => userShip.userId === userId
      );
      if (shipUser) {
        setUserShips(result);
      }
    }
    getUserShips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function addUserShip(userShip: UserShipsDetails) {
    const userShipsCollection = collection(firestore, "userShips");
    await addDoc(userShipsCollection, userShip);
    setUserShips([...userShips, userShip]);
  }

  async function deleteUserShip(userShip: UserShipsDetails) {
    await deleteDoc(doc(firestore, `userShips/${userShip.id}`));
    setUserShips(userShips.filter((ship) => ship.id !== userShip.id));
  }

  async function editUserShip(userShip: UserShipsDetails) {
    await updateDoc(doc(firestore, `userShips/${userShip.id}`), userShip);
    setUserShips(userShips.filter((ship) => ship.id !== userShip.id));
  }

  return (
    <UserShipsContext.Provider
      value={{
        userShips,
        setUserShips,
        addUserShip,
        deleteUserShip,
        editUserShip,
      }}
    >
      {children}
    </UserShipsContext.Provider>
  );
};

export const useUserShips = () => useContext(UserShipsContext);
