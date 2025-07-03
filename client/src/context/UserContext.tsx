import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  userId: number;
  firstname: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fakeUser = { userId: 1, firstname: "Jerôme" };
    setUser(fakeUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("erreor");
  return context;
};
