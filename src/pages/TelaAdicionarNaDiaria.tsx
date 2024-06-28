import { useEffect, useState } from "react";
import check from "../assets/check.png";
import { CustomBtn } from "../components/CustomBtn";
import { DiariaComponent } from "../components/DiariaComponent";
import { FormCreateDiaria } from "../components/FormCreateDiaria";
import { useAgendamentoContext } from "../context/AgendamentoContext";
import { useDiariaContext } from "../context/DiariaContext";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";
import { DiariaDto } from "../types/DiariaDto";
import { AppUtils } from "../utils/AppUtils";

export function TelaAdicionarNaDiaria() {
  const [motorista, setMotorista] = useState<null | string>(null);
  const [modelo, setModelo] = useState("gol");
  const [placa, setPlaca] = useState("avg-5262");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("carro");
  const [data, setData] = useState<Date | null>(new Date());
  const [horario, setHorario] = useState("15:30");

  const [continuePressed, setContinuePressed] = useState(false);

  const [diaria, setDiaria] = useState<DiariaDto>();

  const { getAll: getAllAgendamentos } = useAgendamentoContext();

  const [agendamentos, setAgendamentos] = useState<AgendamentoResponseDto[]>(
    []
  );
  const { diarias, getAll, cria } = useDiariaContext();

  const [pacientesNaDiariaState, setPacientesNaDiariaStateList] = useState<
    AgendamentoResponseDto[]
  >([]);

  useEffect(() => {
    async function getData() {
      if (data != null) {
        getAll(data);

        const lista = await getAllAgendamentos(data);
        console.log("---------lista");
        console.log(lista);
        setAgendamentos(lista);
      }
    }
    getData();
  }, [data]);

  const pacienteAgendadoEstaNaDiaria = (
    pacienteAgendado: AgendamentoResponseDto
  ) => {
    var encontrado = false;
    for (let i = 0; i < diarias.length; i++) {
      if (diarias[i].pacientes.includes(pacienteAgendado)) {
        encontrado = true;
        break;
      }
    }
    return encontrado;
  };

  const pacienteAgendadoEstaNaStateList = (
    pacienteAgendado: AgendamentoResponseDto
  ) => {
    var encontrado = false;
    for (let i = 0; i < pacientesNaDiariaState.length; i++) {
      if (pacientesNaDiariaState.includes(pacienteAgendado)) {
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
    setData(date);
  };

  const onChangeHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHorario(e.target.value);
  };

  const onClick = () => {
    setContinuePressed(!continuePressed);
    if (data != null) {
      const newDiaria: DiariaDto = {
        data: AppUtils.DateToDayMonthYear(data),
        horario: horario,
        modelo: modelo,
        id: "",
        motorista: motorista,
        pacientes: pacientesNaDiariaState,
        placa: placa,
        tipoVeiculo: veiculoSelecionado,
      };

      console.log(newDiaria);

      setDiaria(newDiaria);
    }
  };

  const saveAndPrintDiaria = async () => {
    if (diaria != undefined) {
      await cria(diaria);
      // window.print();
    }
  };

  const closeDiaria = () => {
    setContinuePressed(false);
  };

  return (
    <div style={{ padding: 15, height: "100vh", width: "100vw" }}>
      {continuePressed ? (
        <div style={{ marginTop: 50 }}>
          <DiariaComponent
            agendamentosList={pacientesNaDiariaState}
            diaria={diaria}
            saveAndPrintDiaria={saveAndPrintDiaria}
            closeDiaria={closeDiaria}
          />
        </div>
      ) : (
        <div style={{ marginTop: 50 }}>
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
              data={data}
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
              Selecione os pacientes agendados que voce deseja adicionar na
              diaria
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
                <div
                  onClick={() => {
                    const encontrado = pacienteAgendadoEstaNaStateList(v);

                    if (!encontrado) {
                      setPacientesNaDiariaStateList((oldStateList) => {
                        var copy = oldStateList.map((v) => v);
                        copy.push(v);
                        return copy;
                      });
                    } else {
                      setPacientesNaDiariaStateList((oldStateList) => {
                        var copy = oldStateList.filter((item) => item != v);
                        return copy;
                      });
                    }
                  }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {pacienteAgendadoEstaNaDiaria(v) ||
                    (pacienteAgendadoEstaNaStateList(v) && (
                      <img style={{ height: 20, width: 20 }} src={check} />
                    ))}
                </div>

                <p>{v.nome_paciente}</p>
              </div>
            ))}
          </div>
          <CustomBtn
            text="Continuar"
            backgroundColor="#3E7AB2"
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
}
