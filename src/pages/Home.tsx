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
import { DestinationRepository } from "./../repositories/DestinationRepository";
export function Home() {
  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();

  const { cria, getAll, agendamentos } = useAgendamentoContext();

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
      const dia = startDate.getDay();
      const mes = startDate.getMonth() + 1;
      const ano = startDate.getFullYear();
      const formatedDate = `${dia}/${mes}/${ano}`;

      const agendamentoObj: AgendamentoRequestDto = {
        destino: destino,
        contato: contato.trim(),
        createdAt: Date.now(),
        data: formatedDate,
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

      <h1>Pacientes agendados</h1>

      <AgendamentosComponent agendamentosList={agendamentos} />
    </div>
  );
}
