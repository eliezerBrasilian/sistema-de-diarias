import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthBtn } from "../components/AuthBtn.js";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useCabecalhoContext } from "../context/CabecalhoContext.js";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas.js";
import ls from "../modules/Login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const nav = useNavigate();

  const { removeVisibility } = useCabecalhoContext();

  const { login } = useAuthContext();

  useEffect(() => {
    removeVisibility();
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token != null) nav(Rotas.HOME);
  }, []);

  const onSuccess = (refreshToken: string) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, refreshToken);

    nav(Rotas.HOME);
  };

  return (
    <div className={ls.container}>
      <div className={ls.a_esquerda}>
        <h3 className={ls.titulo}>{"Entrar"} </h3>
        <p className={ls.subtitulo}>
          Acesse já o sistema de diárias da prefeitura de Brás Pires
        </p>
        <form>
          <div className={ls.inputContainer}>
            <p>Email</p>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={ls.inputContainer}>
            <p>Digite a senha de acesso</p>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="*****"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className={ls.btns}>
            <AuthBtn
              text="Acessar sistema de diárias"
              onClick={() => {
                login(email, senha, onSuccess);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
