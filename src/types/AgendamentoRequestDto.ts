import { Destino } from "./Destino";

export interface AgendamentoRequestDto {
  nome_paciente: string;
  possui_acompanhante: boolean;
  destino: Destino;
  contato: string;
  horario: string;
  data: string;
  observacao: string;
  createdAt: number;
  status: string;
  motorista: string;
}
