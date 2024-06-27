import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { DiariaDto } from "../types/DiariaDto";
import { DiariaRepository } from "../repositories/DiariaRepository";
import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { PacienteUpdateDto } from "../types/PacienteUpdateDto";

interface DiariaContextInterface {
  getAll: () => void;
  getDocumentById(id: string): Promise<DiariaDto | null>;
  cria: (diaria: DiariaDto) => Promise<void>;
  confirmaIda: (
    diariaId: string,
    pacienteId: string,
    observacao: string
  ) => Promise<void>;
  cancelaIda: (diariaId: string, pacienteId: string) => Promise<void>;
  diarias: DiariaDto[];
  reloadDiaria: boolean;
}

const defaultDiariaContext: DiariaContextInterface = {
  getAll: () => {},
  getDocumentById: async (_id: string) => null,
  cria: async (_diariaDto) => {},
  confirmaIda: async (
    _diariaId: string,
    _pacienteId: string,
    _observacao: string
  ) => {},
  cancelaIda: async (_diariaId: string, _pacienteId: string) => {},
  diarias: [],
  reloadDiaria: false,
};

const DiariaContext = createContext(defaultDiariaContext);

export function useDiariaContext() {
  return useContext(DiariaContext);
}

interface DiariaContextProps {
  children: ReactNode;
}

export function DiariaContextProvider({ children }: DiariaContextProps) {
  const [diarias, setDiarias] = useState<Array<DiariaDto>>([]);
  const [reloadDiaria, setReloadDiaria] = useState(true);

  const diariaRepository = new DiariaRepository();

  async function getAll() {
    const lista: Array<DiariaDto> = await diariaRepository.getAll();
    console.log("DIARIA LIST");
    console.log(lista);
    setDiarias(lista);
    setReloadDiaria(false);
  }

  async function getDocumentById(id: string) {
    const diaria = await diariaRepository.getDocumentById(id);

    return diaria;
  }

  async function cria(diaria: DiariaDto) {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      await diariaRepository.createDiaria(
        diaria,
        () => {
          window.alert("sucesso");
          setDiarias((oldStateList) => {
            var copy: DiariaDto[] = [];
            copy.push(diaria);

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

  async function confirmaIda(
    diariaId: string,
    pacienteId: string,
    observacao: string
  ) {
    const novosDados: PacienteUpdateDto = {
      observacao: observacao,
      status: AgendamentoStatus.CONFIRMADO,
    };

    const onSuccess = () => {
      setDiarias((oldListState) => {
        var diariaIndex = oldListState.findIndex(
          (diaria) => diaria.id === diariaId
        );

        if (diariaIndex === -1) return oldListState;

        var newList = oldListState.map((i) => i);
        var pacientes = newList[diariaIndex].pacientes.map((paciente) => {
          if (paciente.id === pacienteId) {
            return {
              ...paciente,
              observacao: novosDados.observacao,
              status: novosDados.status,
            };
          }
          return paciente;
        });

        newList[diariaIndex].pacientes = pacientes;

        return newList;
      });
    };

    await diariaRepository.confirmarIda(
      diariaId,
      pacienteId,
      novosDados,
      onSuccess,
      () => {}
    );
  }

  async function cancelaIda(diariaId: string, pacienteId: string) {
    const onSuccess = () => {
      setDiarias((oldListState) => {
        var diariaIndex = oldListState.findIndex(
          (diaria) => diaria.id === diariaId
        );

        if (diariaIndex === -1) return oldListState;

        var newList = oldListState.map((i) => i);
        var pacientes = newList[diariaIndex].pacientes.map((paciente) => {
          if (paciente.id === pacienteId) {
            return {
              ...paciente,
              status: AgendamentoStatus.CANCELADO,
            };
          }
          return paciente;
        });

        newList[diariaIndex].pacientes = pacientes;

        return newList;
      });
    };

    await diariaRepository.cancelarIda(
      diariaId,
      pacienteId,
      onSuccess,
      () => {}
    );
  }

  return (
    <DiariaContext.Provider
      value={{
        getAll,
        getDocumentById,
        cria,
        confirmaIda,
        cancelaIda,
        diarias,
        reloadDiaria,
      }}
    >
      {children}
    </DiariaContext.Provider>
  );
}
