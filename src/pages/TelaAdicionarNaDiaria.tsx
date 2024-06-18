import { useState } from "react";
import { FormCreateDiaria } from "../components/FormCreateDiaria";
import { TopBar } from "../components/TopBar";

export function TelaAdicionarNaDiaria() {
  const [motorista, setMotorista] = useState<null | string>(null);
  const [modelo, setModelo] = useState("gol");
  const [placa, setPlaca] = useState("avg-5262");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("carro");
  // const [destino, setDestino] = useState<Destino>(
  //   destinationRepository.getAll()[0]
  // );

  const [startDate, setDia] = useState<Date | null>(new Date());
  const [horario, setHorario] = useState("15:30");

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
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}