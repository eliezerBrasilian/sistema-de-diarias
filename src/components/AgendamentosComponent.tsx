import tbstyle from "../modules/Tabela.module.css";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";
import { AppUtils } from "../utils/AppUtils";

interface AgendamentosProps {
  agendamentosList: AgendamentoResponseDto[];
}

export function AgendamentosComponent({ agendamentosList }: AgendamentosProps) {
  if (agendamentosList.length == 0) {
    return <p>Nenhum paciente agendado</p>;
  }

  console.log("agendamentosList: ");
  console.log(agendamentosList);

  return (
    <table className={tbstyle.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Clinica-Hospital</th>
          <th>Horário</th>
          <th>Contato</th>
        </tr>
      </thead>
      <tbody>
        {agendamentosList.map((item) => (
          <tr key={item.id}>
            <td>{item.nome_paciente}</td>
            <td>{item.destino?.nome}</td>
            <td>{item.horario}</td>
            <td>{AppUtils.FormatPhone(item.contato)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
