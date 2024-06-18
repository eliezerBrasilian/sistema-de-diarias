import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import { Rotas } from "../enums/Rotas";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { TelaAdicionarNaDiaria } from "../pages/TelaAdicionarNaDiaria";
import { TelaPerfil } from "../pages/TelaPerfil";

export function RoutesApp() {
  // const rotaItemSelecionado = Rotas.TELA_ITEM_SELECIONADO + "/:id";
  // const rotaVerChavePix = Rotas.TELA_VER_CHAVE_PIX + "/:chave";
  // const rotaDetalhesDoPedido = Rotas.TELA_DETALHES_DO_PEDIDO + "/:id";

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={Rotas.LOGIN} element={<Login />} />
        <Route path={Rotas.HOME} element={<Home />} />

        <Route path={Rotas.TELA_PERFIL} element={<TelaPerfil />} />

        <Route
          path={Rotas.TELA_MONTAR_DIARIA}
          element={<TelaAdicionarNaDiaria />}
        />
      </Routes>
      {/* <BottomBar /> */}
    </BrowserRouter>
  );
}
