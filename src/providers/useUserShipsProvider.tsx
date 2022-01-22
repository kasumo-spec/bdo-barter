import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { api } from "../services";
import { useAuth } from ".";

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
  const { userId, userToken } = useAuth();
  const [userShips, setUserShips] = useState<UserShipsDetails[]>([]);

  useEffect(() => {
    async function getUserShips() {
      const response = await api.get(
        `/user-ships/?filter[where][userId]=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setUserShips(response.data);
    }
    getUserShips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function addUserShip(userShip: UserShipsDetails) {
    const response = await api.post("/user-ships/", userShip, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setUserShips([...userShips, response.data]);
  }

  async function deleteUserShip(userShip: UserShipsDetails) {
    await api.delete(`/user-ships/${userShip.id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setUserShips(userShips.filter((ship) => ship.id !== userShip.id));
  }

  async function editUserShip(userShip: UserShipsDetails) {
    await api.put(`/user-ships/${userShip.id}`, userShip, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

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
