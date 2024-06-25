import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { DiariaDto } from "../types/DiariaDto";
import { DiariaRepository } from "../repositories/DiariaRepository";

interface DiariaContextInterface {
  getAll: () => void;
  cria: (diaria: DiariaDto) => Promise<void>;
  confirmaIda: (
    diariaId: string,
    pacienteId: string,
    observacao: string
  ) => Promise<void>;
  diarias: DiariaDto[];
}
const defaultDiariaContext: DiariaContextInterface = {
  getAll: () => {},
  cria: async (_diariaDto) => {},
  confirmaIda: async (
    _diariaId: string,
    _pacienteId: string,
    _observacao: string
  ) => {},
  diarias: [],
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

  const diariaRepository = new DiariaRepository();

  async function getAll() {
    const lista: Array<DiariaDto> = await diariaRepository.getAll();

    setDiarias(lista);
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
    //alert(`${diariaId} - ${pacienteId} - ${observacao}`);
    diariaRepository.confirmarIda(
      diariaId,
      pacienteId,
      observacao,
      () => {
        alert("ida confirmada com sucesso");
      },
      () => {}
    );
  }

  return (
    <DiariaContext.Provider
      value={{
        getAll,
        cria,
        confirmaIda,
        diarias,
      }}
    >
      {children}
    </DiariaContext.Provider>
  );
}
