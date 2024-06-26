import check from "../assets/check.png";

import block from "../assets/block.png";

import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { ButtonStatus } from "../enums/ButtonStatus";
import { CustomBtn } from "./CustomBtn";

interface StatusItemProps {
  status: AgendamentoStatus;
  buttonText: string;
  buttonStatus: ButtonStatus;
  onClick: () => void;
}

export function StatusItemOrButton({
  status,
  buttonText,
  buttonStatus,
  onClick,
}: StatusItemProps) {
  if (
    status == AgendamentoStatus.CONFIRMADO &&
    buttonStatus == ButtonStatus.CONFIRM
  ) {
    return (
      <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
        <p style={{ fontWeight: "bold" }}>Ja confirmado</p>
        <img src={check} style={{ height: 27, width: 27 }} />
      </div>
    );
  } else if (
    status == AgendamentoStatus.CANCELADO &&
    buttonStatus == ButtonStatus.CANCEL
  ) {
    return (
      <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
        <p style={{ fontWeight: "bold" }}>Cancelado !</p>
        <img src={block} style={{ height: 22, width: 22 }} />
      </div>
    );
  } else if (
    status == AgendamentoStatus.CANCELADO &&
    buttonStatus == ButtonStatus.CONFIRM
  ) {
    return null;
  } else {
    return (
      <CustomBtn
        text={buttonText}
        backgroundColor={
          buttonStatus == ButtonStatus.CONFIRM ? "#37718E" : "#C83E4D"
        }
        onClick={onClick}
      />
    );
  }
}
