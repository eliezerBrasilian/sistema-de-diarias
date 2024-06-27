import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { CustomBtn } from "./CustomBtn";

import warning from "../assets/warning.png";

interface ObservacaoFieldProps {
  observacao: string;
  observacaoInputIsVisible: boolean;
  status: AgendamentoStatus;
  observacaoInicial: string;
  icon: string;
  onClick: () => void;
}

export function ObservacaoField({
  observacao,
  status,
  icon,
  observacaoInputIsVisible,
  observacaoInicial,
  onClick,
}: ObservacaoFieldProps) {
  if (status == AgendamentoStatus.CANCELADO) return null;
  else {
    if (!observacaoInputIsVisible && observacaoInicial == "") {
      return (
        <CustomBtn
          backgroundColor="#F4B860"
          text="Adicionar observacao"
          icon={icon}
          onClick={onClick}
        />
      );
    } else if (observacaoInicial != "") {
      return (
        <div style={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <img src={warning} style={{ height: 17, width: 17 }} />
          <p style={{ fontStyle: "italic", fontSize: 16 }}>{observacao}</p>
        </div>
      );
    }
  }
}
