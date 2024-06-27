import { useState } from "react";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

import down from "../assets/down-arrows.png";
import up from "../assets/up.png";
import { useDiariaContext } from "../context/DiariaContext";
import { AppUtils } from "../utils/AppUtils";
import { StatusItemOrButton } from "./StatusItemOrButton";
import { ButtonStatus } from "../enums/ButtonStatus";
import { ObservacaoField } from "./ObservacaoField";
import { CustomBtn } from "./CustomBtn";

interface DiariaComponentEditableItemProps {
  diariaId: string;
  item: AgendamentoResponseDto;
}

export function DiariaComponentEditableItem({
  diariaId,
  item,
}: DiariaComponentEditableItemProps) {
  const { confirmaIda, cancelaIda } = useDiariaContext();

  const [observacaoInicial, setObservacaoInicial] = useState(item.observacao);
  const [observacaoInputIsVisible, setObservacaoVisibility] = useState(false);

  const toogleObservacaoVisibility = () => {
    setObservacaoVisibility(!observacaoInputIsVisible);
  };

  const [observacaoInput, setObservacaoInput] = useState(item.observacao);

  const onChangeObservacaoInput = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = ev.target.value;
    setObservacaoInput(text);
  };

  const handleConfirmaIda = async () => {
    console.log(item.id);
    await confirmaIda(diariaId, item.id, observacaoInput.trim());
    setObservacaoInicial(item.observacao);
    toogleObservacaoVisibility();
  };

  const handleCancelaIda = async () => {
    await cancelaIda(diariaId, item.id);
  };

  return (
    <tr key={item.id}>
      <td
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          rowGap: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 15,
          }}
        >
          <p>{item.nome_paciente}</p>
          <StatusItemOrButton
            status={item.status}
            buttonText="Confirmar Ida"
            buttonStatus={ButtonStatus.CONFIRM}
            onClick={handleConfirmaIda}
          />
          <StatusItemOrButton
            status={item.status}
            buttonText="Cancelar Ida"
            buttonStatus={ButtonStatus.CANCEL}
            onClick={handleCancelaIda}
          />
        </div>

        <ObservacaoField
          icon={observacaoInputIsVisible ? up : down}
          observacaoInputIsVisible={observacaoInputIsVisible}
          observacaoInicial={observacaoInicial}
          observacao={observacaoInput}
          onClick={toogleObservacaoVisibility}
          status={item.status}
        />

        {observacaoInputIsVisible && (
          <div>
            <textarea
              value={observacaoInput}
              onChange={onChangeObservacaoInput}
              style={{
                width: "70%",
                minHeight: 60,
              }}
            />
            {observacaoInput.trim() != "" && (
              <CustomBtn
                text="Salvar observacao"
                backgroundColor="#79AEA3"
                onClick={handleConfirmaIda}
              />
            )}
          </div>
        )}
      </td>
      <td>{item?.destino?.nome}</td>
      <td>{item.horario}</td>
      <td>{AppUtils.FormatPhone(item.contato)}</td>
    </tr>
  );
}
