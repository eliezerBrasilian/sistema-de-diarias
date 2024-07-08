import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { AgendamentoRepository } from "../repositories/AgendamentoRepository";

import { AgendamentoRequestDto } from "../types/AgendamentoRequestDto";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

interface AgendamentoContextInterface {
  getAll: (date: Date) => Promise<AgendamentoResponseDto[]>;
  cria: (agendamentoRequestDto: AgendamentoRequestDto) => Promise<void>;
  agendamentos: AgendamentoResponseDto[];
}

const defaultAgendamentoContext: AgendamentoContextInterface = {
  getAll: async (_date: Date) => [],
  cria: async (_agendamentoRequestDto) => {},
  agendamentos: [],
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
  const [agendamentos, setAgendamentos] = useState<
    Array<AgendamentoResponseDto>
  >([]);

  const agendamentoRepository = new AgendamentoRepository();

  async function getAll(date: Date) {
    const lista: Array<AgendamentoResponseDto> =
      await agendamentoRepository.getAll(date);

    setAgendamentos(lista);
    return lista;
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
        agendamentos,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}
