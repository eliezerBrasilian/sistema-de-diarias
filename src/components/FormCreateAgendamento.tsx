import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
import hs from "../modules/Home.module.css";
import { Destino } from "../types/Destino";
import { CustomBtn } from "./CustomBtn";

interface FormCreateAgendamentoProps {
  handleCreateAgendamento: (
    ev: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  nome: string;
  temAcompanhante: boolean;
  destino: Destino;
  contato: string;
  data: Date | null;
  horario: string;
  destinos: Destino[];
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContato: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeData: (date: Date | null) => void;
  onChangeHorario: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toogleAcompanhante: () => void;
  handleChangeHospital: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormCreateAgendamento({
  handleCreateAgendamento,
  nome,
  temAcompanhante,
  destino,
  contato,
  data,
  horario,
  destinos,
  onChangeName,
  onChangeContato,
  onChangeData,
  onChangeHorario,
  toogleAcompanhante,
  handleChangeHospital,
}: FormCreateAgendamentoProps) {
  return (
    <form onSubmit={handleCreateAgendamento}>
      <div className={hs.rowdivs}>
        <div className={hs.column_div}>
          <div className={hs.input_container}>
            <p>Nome do paciente</p>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Digite seu email"
              value={nome}
              onChange={onChangeName}
            />
          </div>
          <div className={hs.input_container}>
            <label>
              <input
                type="checkbox"
                checked={temAcompanhante}
                onChange={toogleAcompanhante}
              />
              Tem acompanhante?
            </label>
          </div>

          <div className={hs.input_container}>
            <p>Nome do Hospital/Clinica</p>
            <select value={destino.nome} onChange={handleChangeHospital}>
              {destinos.map((i) => (
                <option key={i.nome} value={i.nome}>
                  {i.nome}
                </option>
              ))}
            </select>
            {/* <input
            type="text"
            id="lname"
            name="lname"
            placeholder={"hospital ou clinica"}
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          /> */}
          </div>
        </div>
        <div className={hs.column_div}>
          <div className={hs.input_container}>
            <p>Celular para contato</p>
            <InputMask
              type="text"
              mask="(99) 99999-9999"
              placeholder={"(12)34567-8910"}
              value={contato}
              onChange={onChangeContato}
            />
          </div>

          <div className={hs.input_container}>
            <hr />
            <p>Dia</p>
            <DatePicker
              selected={data}
              onChange={onChangeData}
              dateFormat="dd/MM/yyyy"
              placeholderText="Escolha uma data"
            />
          </div>
          <div className={hs.input_container}>
            <p>Horário</p>
            <InputMask
              type="text"
              mask="99:99"
              placeholder={"horário do exame ou consulta"}
              value={horario}
              onChange={onChangeHorario}
            />
          </div>
        </div>
      </div>

      <CustomBtn
        text="Salvar"
        // onClick={handleCreateAgendamento}
        padding={"10px 15px 10px 15px"}
      />
    </form>
  );
}
