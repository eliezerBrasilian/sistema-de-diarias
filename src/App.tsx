import "./App.css";
import { AgendamentoContextProvider } from "./context/AgendamentoContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BottomBarContextProvider } from "./context/BottomBarContext";
import { CabecalhoContextProvider } from "./context/CabecalhoContext";
import { RoutesApp } from "./routes/Routes";
function App() {
  return (
    <AuthContextProvider>
      <CabecalhoContextProvider>
        <BottomBarContextProvider>
          <AgendamentoContextProvider>
            <RoutesApp />
          </AgendamentoContextProvider>
        </BottomBarContextProvider>
      </CabecalhoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
