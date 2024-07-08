import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import { Rotas } from "../enums/Rotas";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { TelaAdicionarNaDiaria } from "../pages/TelaAdicionarNaDiaria";
import { TelaVisualizarDiaria } from "../pages/TelaVisualizarDiaria";

export function RoutesApp() {
  const rotaDiariaSelecionada = Rotas.TELA_VISUALIZAR_DIARIA + "/:id";

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={Rotas.LOGIN} element={<Login />} />
        <Route path={Rotas.HOME} element={<Home />} />

        <Route
          path={Rotas.TELA_MONTAR_DIARIA}
          element={<TelaAdicionarNaDiaria />}
        />

        <Route
          path={rotaDiariaSelecionada}
          element={<TelaVisualizarDiaria />}
        />
      </Routes>
    </BrowserRouter>
  );
}
