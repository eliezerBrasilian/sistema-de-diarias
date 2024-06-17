import { ReactNode, createContext, useContext } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { AgendamentoRepository } from "../repositories/AgendamentoRepository";

import { AgendamentoRequestDto } from "../types/AgendamentoRequestDto";

interface AgendamentoContextInterface {
  getAll: () => void;
  cria: (agendamentoRequestDto: AgendamentoRequestDto) => Promise<void>;
  // agendamentos: [];
}

const defaultAgendamentoContext: AgendamentoContextInterface = {
  getAll: () => {},
  cria: async (_agendamentoRequestDto) => {},
  // agendamentos: [],
};

const AgendamentoContext = createContext(defaultAgendamentoContext);

export function useAgendamentoContext() {
  return useContext(AgendamentoContext);
}

interface AgendamentoContextProps {
  children: ReactNode;
}

export function AgendamentoContextProvider({
  children,
}: AgendamentoContextProps) {
  // const [pedidos, setPedidos] = useState<Array<PedidoDoUsuarioResponseDto>>([]);

  const agendamentoRepository = new AgendamentoRepository();

  async function getAll() {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    var userId = localStorage.getItem(LocalStorageKeys.USER_ID);

    if (token != null && userId != null) {
      // const lista = await agendamentoRepository.getAll(token, userId);
      // setPedidos(lista);
    }
  }

  async function cria(agendamento: AgendamentoRequestDto) {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      await agendamentoRepository.createAgendamento(
        agendamento,
        () => {
          window.alert("sucesso");
        },
        () => {
          window.alert("falha");
        }
      );
    }
  }

  return (
    <AgendamentoContext.Provider
      value={{
        getAll,
        cria,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}
