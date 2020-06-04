import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isClientIn: false,
  accessATM: () => {},
  atm: null,
});
