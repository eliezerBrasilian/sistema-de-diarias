import { AgendamentoStatus } from "../enums/AgendamentoStatus";

export interface PacienteUpdateDto {
  observacao: string;
  status: AgendamentoStatus;
}
