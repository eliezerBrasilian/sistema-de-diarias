export interface AuthContextInterface {
  login: (
    email: string,
    senha: string,
    onSuccess: (refreshToken: string) => void
  ) => void;
}
