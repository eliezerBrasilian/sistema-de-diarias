import { ReactNode, createContext, useContext } from "react";
import { AuthContextInterface } from "../types/AuthContextInterface.js";
import { AuthRepository } from "./../repositories/AuthRepository";

const defaultContext: AuthContextInterface = {
  login: (
    _e: string,
    _s: string,
    _onSuccess: (refreshToken: string) => void
  ) => {},
};

const AuthContext = createContext(defaultContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthProviderProps) {
  const authRepository = new AuthRepository();

  async function login(
    email: string,
    senha: string,
    onSuccess: (refreshToken: string) => void
  ) {
    await authRepository.login(email, senha, onSuccess);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
