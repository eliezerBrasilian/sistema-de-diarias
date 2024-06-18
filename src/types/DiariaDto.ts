import { AgendamentoResponseDto } from "./AgendamentoResponseDto";

export interface DiariaDto {
  id: string;
  tipoVeiculo: string;
  placa: string;
  modelo: string;
  motorista: string | null;
  horario: string;
  data: string;
  pacientes: AgendamentoResponseDto[];
}
