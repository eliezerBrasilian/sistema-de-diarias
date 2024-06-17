import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
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
import { AgendamentoRequestDto } from "../types/AgendamentoRequestDto";

export function Home() {
  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();

  const { cria } = useAgendamentoContext();

  const [nome, setNome] = useState("Joao Lucas Abreu Marting Costa");
  const [temAcompanhante, setTemAcompanhamente] = useState(false);
  const [destino, setDestino] = useState("Hospital Santa Isabel");
  const [contato, setContato] = useState("12345678910");
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startDate, setDia] = useState<Date | null>(new Date());
  const [horaio, setHorario] = useState("15:30");

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    activateVisibility();
    handleHomeBottomBar();
  }, []);

  // useEffect(() => {
  //   if (!carregado) {
  //     getAllSalgados();
  //   }
  // }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    }
  }, []);

  const handleCreateAgendamento = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    if (startDate != null) {
      const agendamentoObj: AgendamentoRequestDto = {
        clinica_ou_hospital_de_destino: destino.trim(),
        contato: contato.trim(),
        createdAt: Date.now(),
        data: startDate.toString(),
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
        <CustomBtn text="Confirmar paciente" backgroundColor="#943EB2" />
      </div>

      {expanded && (
        <form onSubmit={handleCreateAgendamento}>
          <div className={hs.input_container}>
            <p>Nome do paciente</p>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Digite seu email"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={hs.input_container}>
            <label>
              <input
                type="checkbox"
                checked={temAcompanhante}
                onChange={() => {
                  setTemAcompanhamente(!temAcompanhante);
                }}
              />
              Tem acompanhante?
            </label>
          </div>

          <div className={hs.input_container}>
            <p>Nome do Hospital/Clinica</p>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder={"hospital ou clinica"}
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>

          <div className={hs.input_container}>
            <p>Celular para contato</p>
            <InputMask
              type="text"
              mask="(99) 99999-9999"
              placeholder={"(12)34567-8910"}
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </div>

          <div className={hs.input_container}>
            <hr />
            <p>Dia</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setDia(date)}
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
              value={horaio}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>

          <CustomBtn
            text="Salvar"
            // onClick={handleCreateAgendamento}
            padding={"10px 15px 10px 15px"}
          />
        </form>
      )}

      {/* <h1>Promoções imperdíveis</h1>

      {salgadosEmPromocao.length == 0 ? (
        <p>Não temos promoções no momento, mas fique ligado(a)</p>
      ) : (
        <div
          style={{
            marginTop: 15,
            paddingBottom: 80,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {salgadosEmPromocao?.map((item, index) => (
            <HomeSalgado
              key={index}
              salgadoDto={item}
              handlePopUpEdicaoVisibilidade={() => {}}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
