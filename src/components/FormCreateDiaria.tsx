import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
import { cores } from "../assets/cores";
import { MunicipioInterno } from "../enums/MunicipiosInternos";
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
  onClick: () => void;
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
  onClick,
}: FormCreateDiariaProps) {
  return (
    <div className={s.container}>
      <div className={s.input_container}>
        <p>Tipo de veículo</p>
        <select
          style={{
            border: "1px solid black",
            width: "fit-content",
            padding: 5,
            backgroundColor: cores.rosa,
          }}
          value={veiculoSelecionado}
          onChange={handleChangeVeiculo}
        >
          <option
            style={{ backgroundColor: "#fff" }}
            value={MunicipioInterno.BRAS_PIRES_PRINCIPAL}
          >
            {MunicipioInterno.BRAS_PIRES_PRINCIPAL}
          </option>
          <option
            style={{ backgroundColor: "#fff" }}
            value={MunicipioInterno.MALACACHETA}
          >
            {MunicipioInterno.MALACACHETA}
          </option>
          <option
            style={{ backgroundColor: "#fff" }}
            value={MunicipioInterno.VARZEA}
          >
            {MunicipioInterno.VARZEA}
          </option>
          <option
            style={{ backgroundColor: "#fff" }}
            value={MunicipioInterno.RIBEIRAO}
          >
            {MunicipioInterno.RIBEIRAO}
          </option>
        </select>
      </div>

      <div className={s.input_container}>
        <p>Placa</p>
        <input
          style={{
            color: "#000",
            padding: 5,
            marginTop: 5,
            border: "1px solid gray",
          }}
          type="text"
          placeholder="digite o nome da sua rua..."
          value={placa}
          onChange={handlePlacaChange}
        />
      </div>

      <div className={s.input_container}>
        <p>Modelo</p>
        <input
          style={{
            color: "#000",
            padding: 5,
            marginTop: 5,
            border: "1px solid gray",
          }}
          type="text"
          placeholder="digite o numero da sua residência..."
          value={modelo}
          onChange={handleModeloChange}
        />
      </div>

      <div className={s.input_container}>
        <p>Motorista escalado</p>
        <input
          style={{
            color: "#000",
            padding: 5,
            marginTop: 5,
            border: "1px solid gray",
          }}
          type="text"
          placeholder="digite o nome do bairro..."
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
