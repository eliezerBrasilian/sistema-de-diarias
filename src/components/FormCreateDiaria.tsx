import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
import s from "../modules/FormCreateDiaria.module.css";

interface FormCreateDiariaProps {
  veiculoSelecionado: string;
  placa: string;
  modelo: string;
  motorista_escalado: string | null;
  horario: string;
  data: null | Date;
  handlePlacaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleModeloChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMotoristaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeVeiculo: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeHorario: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeData: (date: Date | null) => void;
}
export function FormCreateDiaria({
  veiculoSelecionado,
  placa,
  modelo,
  motorista_escalado,
  horario,
  data,
  handlePlacaChange,
  handleModeloChange,
  handleMotoristaChange,
  handleChangeVeiculo,
  onChangeData,
  onChangeHorario,
}: FormCreateDiariaProps) {
  const veiculos = ["carro", "van", "onibus"];

  return (
    <div className={s.container}>
      <div className={s.input_container}>
        <p>Tipo de veículo</p>
        <select
          style={{
            border: "1px solid black",
            width: "fit-content",
            padding: 5,
          }}
          value={veiculoSelecionado}
          onChange={handleChangeVeiculo}
        >
          {veiculos.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className={s.input_container}>
        <p>Placa</p>
        <input
          type="text"
          placeholder="digite o nome da placa..."
          value={placa}
          onChange={handlePlacaChange}
        />
      </div>

      <div className={s.input_container}>
        <p>Modelo</p>
        <input
          type="text"
          placeholder="digite o numero da sua residência..."
          value={modelo}
          onChange={handleModeloChange}
        />
      </div>

      <div className={s.input_container}>
        <p>Motorista escalado</p>
        <input
          type="text"
          placeholder="digite o nome do motorista..."
          value={motorista_escalado == null ? "" : motorista_escalado}
          onChange={handleMotoristaChange}
        />
      </div>

      <div className={s.input_container}>
        <p>Horário</p>
        <InputMask
          type="text"
          mask="99:99"
          placeholder={"horário do exame ou consulta"}
          value={horario}
          onChange={onChangeHorario}
        />
      </div>

      <div className={s.input_container}>
        <p>Data</p>
        <DatePicker
          selected={data}
          onChange={onChangeData}
          dateFormat="dd/MM/yyyy"
          placeholderText="Escolha uma data"
        />
      </div>
    </div>
  );
}
