import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export class AuthRepository {
  async login(
    email: string,
    senha: string,
    onSuccess: (refreshToken: string) => void
  ) {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, senha);
      const user = resp.user;
      onSuccess(user.refreshToken);
    } catch (e: any) {
      console.log("erro: " + e);
      throw new Error(e);
    }
  }
}
