import "./App.css";
import { AgendamentoContextProvider } from "./context/AgendamentoContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BottomBarContextProvider } from "./context/BottomBarContext";
import { CabecalhoContextProvider } from "./context/CabecalhoContext";
import { TaxaContextProvider } from "./context/TaxaContext";
import { RoutesApp } from "./routes/Routes";
function App() {
  return (
    <AuthContextProvider>
      <CabecalhoContextProvider>
        <BottomBarContextProvider>
          <TaxaContextProvider>
            <AgendamentoContextProvider>
              <RoutesApp />
            </AgendamentoContextProvider>
          </TaxaContextProvider>
        </BottomBarContextProvider>
      </CabecalhoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
