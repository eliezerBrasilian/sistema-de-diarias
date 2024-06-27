import { useEffect, useState } from "react";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

import down from "../assets/down-arrows.png";
import up from "../assets/up.png";
import { useDiariaContext } from "../context/DiariaContext";
import { AppUtils } from "../utils/AppUtils";
import { StatusItemOrButton } from "./StatusItemOrButton";
import { ButtonStatus } from "../enums/ButtonStatus";
import { ObservacaoField } from "./ObservacaoField";

interface DiariaComponentEditableItemProps {
  diariaId: string;
  item: AgendamentoResponseDto;
}
export function DiariaComponentEditableItem({
  diariaId,
  item,
}: DiariaComponentEditableItemProps) {
  const { confirmaIda, cancelaIda } = useDiariaContext();

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

  useEffect(() => {
    console.log("diaraId: " + diariaId);
    console.log(item);
    console.log(item.id);
    console.log(item.status);
  }, []);

  const handleConfirmaIda = async () => {
    alert(item.id);
    //await confirmaIda(diariaId, item.id, observacaoInput.trim());
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
          observacao={observacaoInput}
          onClick={toogleObservacaoVisibility}
          status={item.status}
        />

        {observacaoInputIsVisible && (
          <textarea
            value={observacaoInput}
            onChange={onChangeObservacaoInput}
            style={{
              width: "70%",
              minHeight: 60,
            }}
          />
        )}
      </td>
      <td>{item?.destino?.nome}</td>
      <td>{item.horario}</td>
      <td>{AppUtils.FormatPhone(item.contato)}</td>
    </tr>
  );
}
