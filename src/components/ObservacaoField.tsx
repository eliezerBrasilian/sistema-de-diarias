import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { CustomBtn } from "./CustomBtn";

import warning from "../assets/warning.png";

interface ObservacaoFieldProps {
  observacao: string;
  status: AgendamentoStatus;
  icon: string;
  onClick: () => void;
}

export function ObservacaoField({
  observacao,
  status,
  icon,
  onClick,
}: ObservacaoFieldProps) {
  if (status == AgendamentoStatus.CANCELADO) return null;
  else {
    if (observacao == "") {
      return (
        <CustomBtn
          backgroundColor="#F4B860"
          text="Adicionar observacao"
          icon={icon}
          onClick={onClick}
        />
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <img src={warning} style={{ height: 17, width: 17 }} />
          <p style={{ fontStyle: "italic", fontSize: 16 }}>{observacao}</p>
        </div>
      );
    }
  }
}
