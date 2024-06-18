import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { Destino } from "./Destino";

export interface AgendamentoResponseDto {
  id: string;
  nome_paciente: string;
  possui_acompanhante: boolean;
  destino: Destino;
  contato: string;
  horario: string;
  data: string;
  observacao: string;
  createdAt: number;
  status: AgendamentoStatus;
  motorista: string;
  veiculo: null | string;
}
