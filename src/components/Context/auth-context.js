import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userId: null,
  token: null,
  isClientIn: false,
  accessATM: () => {},
  atm: null,
  exitATM: () => {},
});
