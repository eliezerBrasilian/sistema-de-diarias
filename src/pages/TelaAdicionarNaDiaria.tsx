import { useEffect, useState } from "react";
import { FormCreateDiaria } from "../components/FormCreateDiaria";
import { TopBar } from "../components/TopBar";
import { useAgendamentoContext } from "../context/AgendamentoContext";
import check from "../assets/check.png";
import { useDiariaContext } from "../context/DiariaContext";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";

export function TelaAdicionarNaDiaria() {
  const [motorista, setMotorista] = useState<null | string>(null);
  const [modelo, setModelo] = useState("gol");
  const [placa, setPlaca] = useState("avg-5262");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("carro");
  const [startDate, setDia] = useState<Date | null>(new Date());
  const [horario, setHorario] = useState("15:30");

  const { agendamentos } = useAgendamentoContext();
  const { diarias, getAll } = useDiariaContext();

  useEffect(() => {
    getAll();
  }, []);

  const pacienteAgendadoEstaNaDiaria = (
    pacienteAgendado: AgendamentoResponseDto
  ) => {
    var encontrado = false;
    for (let i = 0; i < diarias.length; i++) {
      if (diarias[i].pacientes.includes(pacienteAgendado.nome_paciente)) {
        encontrado = true;
        break;
      }
    }
    return encontrado;
  };

  const handleChangeVeiculo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVeiculoSelecionado(event.target.value);
  };

  const onChangeMotorista = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotorista(e.target.value);
  };
  const onChangeModelo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelo(e.target.value);
  };
  const onChangePlaca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaca(e.target.value);
  };

  const onChangeData = (date: Date | null) => {
    setDia(date);
  };
  const onChangeHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHorario(e.target.value);
  };

  return (
    <div style={{ padding: 15, height: "100vh", width: "100vw" }}>
      <TopBar text="Montar diária" />
      <div style={{ marginTop: 30 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <FormCreateDiaria
            data={startDate}
            modelo={modelo}
            horario={horario}
            placa={placa}
            motorista_escalado={motorista}
            veiculoSelecionado={veiculoSelecionado}
            handleModeloChange={onChangeModelo}
            handleMotoristaChange={onChangeMotorista}
            handlePlacaChange={onChangePlaca}
            onChangeData={onChangeData}
            onChangeHorario={onChangeHorario}
            handleChangeVeiculo={handleChangeVeiculo}
          />

          <h3 style={{ marginTop: 20, marginBottom: 10 }}>
            Pacientes que voce deseja adicionar na diaria
          </h3>

          {agendamentos.map((v, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 20,
                marginBottom: 5,
              }}
            >
              <img src={pacienteAgendadoEstaNaDiaria(v) ? check : ""} />
              <p>{v.nome_paciente}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
