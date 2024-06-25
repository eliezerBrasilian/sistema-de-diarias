import { useState } from "react";
import { CustomBtn } from "./CustomBtn";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

import down from "../assets/down-arrows.png";
import up from "../assets/up.png";
import check from "../assets/check.png";
import warning from "../assets/warning.png";
import { useDiariaContext } from "../context/DiariaContext";
import { AppUtils } from "../utils/AppUtils";
import { AgendamentoStatus } from "../enums/AgendamentoStatus";

interface DiariaComponentEditableItemProps {
  diariaId: string;
  item: AgendamentoResponseDto;
}
export function DiariaComponentEditableItem({
  diariaId,
  item,
}: DiariaComponentEditableItemProps) {
  const { confirmaIda } = useDiariaContext();

  const [observacaoInputIsVisible, setObservacaoVisibility] = useState(false);

  const toogleObservacaoVisibility = () => {
    setObservacaoVisibility(!observacaoInputIsVisible);
  };

  console.log("----------item-----------");
  console.log(item);

  const [observacaoInput, setObservacaoInput] = useState(item.observacao);

  const onChangeObservacaoInput = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = ev.target.value;
    setObservacaoInput(text);
  };

  const handleConfirmaDiaria = async () => {
    confirmaIda(diariaId, item.id, observacaoInput.trim());
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
          {item.status != AgendamentoStatus.CONFIRMADO ? (
            <CustomBtn
              text="Confirmar Ida"
              backgroundColor="#37718E"
              onClick={handleConfirmaDiaria}
            />
          ) : (
            <div
              style={{ display: "flex", alignItems: "center", columnGap: 10 }}
            >
              <p style={{ fontWeight: "bold" }}>Ja confirmado</p>
              <img src={check} style={{ height: 27, width: 27 }} />
            </div>
          )}

          <CustomBtn text="Cancelar Ida" backgroundColor="#C83E4D" />
        </div>

        {item.observacao == "" ? (
          <CustomBtn
            backgroundColor="#F4B860"
            text="Adicionar observacao"
            icon={observacaoInputIsVisible ? up : down}
            onClick={() => {
              toogleObservacaoVisibility();
            }}
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <img src={warning} style={{ height: 17, width: 17 }} />
            <p style={{ fontStyle: "italic", fontSize: 16 }}>
              {item.observacao}
            </p>
          </div>
        )}

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
