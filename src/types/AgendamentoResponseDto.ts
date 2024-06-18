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
  status: string;
  motorista: string;
  veiculo: null | string;
}
