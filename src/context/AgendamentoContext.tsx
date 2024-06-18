import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { AgendamentoRepository } from "../repositories/AgendamentoRepository";

import { AgendamentoRequestDto } from "../types/AgendamentoRequestDto";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

interface AgendamentoContextInterface {
  getAll: () => void;
  cria: (agendamentoRequestDto: AgendamentoRequestDto) => Promise<void>;
  agendamentos: AgendamentoResponseDto[];
}

const defaultAgendamentoContext: AgendamentoContextInterface = {
  getAll: () => {},
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

  async function getAll() {
    const lista: Array<AgendamentoResponseDto> =
      await agendamentoRepository.getAll();
    console.log(lista);
    setAgendamentos(lista);
  }

  async function cria(agendamento: AgendamentoRequestDto) {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      await agendamentoRepository.createAgendamento(
        agendamento,
        () => {
          window.alert("sucesso");
          setAgendamentos((oldStateList) => {
            var copy: AgendamentoRequestDto[] = [];
            copy.push(agendamento);

            for (let i = 0, j = 1; i < oldStateList.length; i++, j++) {
              copy[j] = oldStateList[i];
            }

            return copy;
          });
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
