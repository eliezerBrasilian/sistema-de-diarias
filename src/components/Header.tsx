import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import { Rotas } from "../enums/Rotas";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";

export function Header() {
  const nav = useNavigate();

  const getOut = () => {
    localStorage.clear();
    nav(Rotas.LOGIN);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15,
        backgroundColor: "#2A856A",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 19 }}>Sistema de Diárias</h1>

      {localStorage.getItem(LocalStorageKeys.TOKEN) != null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 10,
            cursor: "pointer",
          }}
          onClick={getOut}
        >
          <img src={logout} style={{ height: 20, width: 20 }} />
          <p style={{ color: "white", fontSize: 18 }}>Sair da conta</p>
        </div>
      )}
    </div>
  );
}
