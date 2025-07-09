export type User = {
  id: number;
  firstname: string;
  lastname: string;
  street?: string;
  city?: string;
  zip_code?: string;
  email: string;
  phonr: string;
  password: string;
  role: "client" | "admin";
  created_at: Date;
};

export type AuthContextType = {
  currentUser: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
};
