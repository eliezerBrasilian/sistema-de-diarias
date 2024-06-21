import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import down from "../assets/down-arrows.png";
import up from "../assets/up.png";
import { CustomBtn } from "../components/CustomBtn";
import { useAgendamentoContext } from "../context/AgendamentoContext";
import { useBottomBarContext } from "../context/BottomBarContext";
import { AgendamentoStatus } from "../enums/AgendamentoStatus";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";

import { AgendamentosComponent } from "../components/AgendamentosComponent";
import { FormCreateAgendamento } from "../components/FormCreateAgendamento";
import { AgendamentoRequestDto } from "../types/AgendamentoRequestDto";
import { Destino } from "../types/Destino";
import { AppUtils } from "../utils/AppUtils";
import { DestinationRepository } from "./../repositories/DestinationRepository";
import { useDiariaContext } from "../context/DiariaContext";
import { DiariaComponentEditable } from "../components/DiariaComponentEditable";
export function Home() {
  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();

  const { cria, getAll, agendamentos } = useAgendamentoContext();
  const { getAll: getAllDiarias, diarias } = useDiariaContext();

  const destinationRepository = new DestinationRepository();

  const destinos = destinationRepository.getAll();
  const [nome, setNome] = useState("Joao Lucas Abreu Marting Costa");
  const [temAcompanhante, setTemAcompanhamente] = useState(false);
  const [destino, setDestino] = useState<Destino>(
    destinationRepository.getAll()[0]
  );
  const [contato, setContato] = useState("12345678910");
  const [startDate, setDia] = useState<Date | null>(new Date());
  const [horaio, setHorario] = useState("15:30");

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    activateVisibility();
    handleHomeBottomBar();
  }, []);

  useEffect(() => {
    getAll();
    getAllDiarias();
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    }
  }, []);

  const handleChangeHospital = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const destinoencontrado = destinos.find(
      (v) => v.nome == event.target.value
    );
    if (destinoencontrado != undefined) {
      setDestino(destinoencontrado);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const onChangeContato = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContato(e.target.value);
  };
  const onChangeData = (date: Date | null) => {
    setDia(date);
  };
  const onChangeHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHorario(e.target.value);
  };

  const toogleAcompanhante = () => {
    setTemAcompanhamente(!temAcompanhante);
  };

  const handleCreateAgendamento = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();

    if (startDate != null && startDate != undefined) {
      const agendamentoObj: AgendamentoRequestDto = {
        destino: destino,
        contato: contato.trim(),
        createdAt: Date.now(),
        data: AppUtils.DateToDayMonthYear(startDate),
        horario: horaio.trim(),
        motorista: "",
        nome_paciente: nome,
        observacao: "",
        possui_acompanhante: temAcompanhante,
        status: AgendamentoStatus.OCIOSO,
      };
      await cria(agendamentoObj);
    }
  };

  return (
    <div className={hs.container}>
      <div style={{ display: "flex", flexDirection: "row", columnGap: 20 }}>
        <CustomBtn
          text="Agendar paciente"
          backgroundColor="#3E7AB2"
          icon={expanded ? up : down}
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
        <CustomBtn
          text="Montar diária"
          backgroundColor="#943EB2"
          onClick={() => {
            nav(Rotas.TELA_MONTAR_DIARIA);
          }}
        />
      </div>

      {expanded && (
        <FormCreateAgendamento
          handleCreateAgendamento={handleCreateAgendamento}
          nome={nome}
          onChangeName={onChangeName}
          onChangeContato={onChangeContato}
          onChangeData={onChangeData}
          onChangeHorario={onChangeHorario}
          toogleAcompanhante={toogleAcompanhante}
          temAcompanhante={temAcompanhante}
          destino={destino}
          handleChangeHospital={handleChangeHospital}
          contato={contato}
          data={startDate}
          horario={horaio}
          destinos={destinos}
        />
      )}

      <h1 style={{ marginTop: 40, marginBottom: 5 }}>Pacientes agendados</h1>

      <AgendamentosComponent agendamentosList={agendamentos} />

      <hr style={{ marginTop: 50, marginBottom: 50 }} />

      <h1 style={{ marginBottom: 5 }}>Diarias criadas</h1>
      {diarias.map((d, index) => (
        <DiariaComponentEditable
          key={index}
          agendamentosList={agendamentos}
          diaria={d}
        />
      ))}
    </div>
  );
}
