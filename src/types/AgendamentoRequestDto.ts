export interface AgendamentoRequestDto {
  nome_paciente: string;
  possui_acompanhante: boolean;
  clinica_ou_hospital_de_destino: string;
  contato: string;
  horario: string;
  data: string;
  observacao: string;
  createdAt: number;
  status: string;
  motorista: string;
}
