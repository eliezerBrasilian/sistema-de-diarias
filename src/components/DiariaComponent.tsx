import carro from "../assets/car.png";
import prefeitura_logo from "../assets/logo_brasao_prefeitura_bras_pires.jpg";
import tbstyle from "../modules/Tabela.module.css";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";
import { DiariaDto } from "../types/DiariaDto";

interface DiariaComponentProps {
  agendamentosList: AgendamentoResponseDto[];
  diaria?: DiariaDto;
  saveAndPrintDiaria?: () => Promise<void>;
  closeDiaria?: () => void;
}
export function DiariaComponent({
  agendamentosList,
  diaria,
  saveAndPrintDiaria = undefined,
  closeDiaria = undefined,
}: DiariaComponentProps) {
  if (agendamentosList.length == 0 || diaria == undefined) {
    return <p>Nenhum paciente agendado</p>;
  }
  return (
    <div>
      <div className={tbstyle.printableTable}>
        <table className={tbstyle.table}>
          <thead>
            <tr>
              <th colSpan={4}>
                <div className={tbstyle.topContent}>
                  <div className={tbstyle.newSection}>
                    <img src={prefeitura_logo} alt="New Header Image" />
                    <div>
                      <h3>PREFEITURA MUNICIPAL DE BRÁS PIRES</h3>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Rua José Colombo Rivelli, 311</span>
                        <p>ADM 2017 / 2020</p>
                      </div>
                      <p>
                        SECRETARIA MUNICIPAL DE SAÚDE - CONTROLE INTERNO DE
                        VIAGENS
                      </p>
                    </div>
                  </div>

                  <div className={tbstyle.headerContent}>
                    <img src={carro} alt="Header Image" />
                    <p>
                      <strong>VEICULO:</strong> {diaria.modelo}
                    </p>
                    <p>
                      <strong>MOTORISTA:</strong> {diaria.motorista}
                    </p>
                    <p>
                      <strong>PLACA:</strong> {diaria.placa}
                    </p>
                  </div>

                  <div className={tbstyle.headerContent}>
                    <p>DATA DE SAÍDA: {diaria.data}</p>
                    <p>HORA: {diaria.horario}</p>
                    <p>KM: _________</p>
                    <p>DESTINO: UBÁ-MG</p>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th>NOME DOS PACIENTES ATENDIDOS</th>
              <th>HOSPITAL/CLÍNICA</th>
              <th>HORÁRIO</th>
              <th>CONTATO</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosList.map((item) => (
              <tr key={item.id}>
                <td>
                  <p> {item.nome_paciente}</p>
                  {item.possui_acompanhante && <p>POSSUI ACOMPANHANTE</p>}
                </td>
                <td>{item?.destino?.nome}</td>
                <td>{item.horario}</td>
                <td>{item.contato}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className={tbstyle.footerContent}>
                  <div>
                    <p>CHEGADA: DATA:____/____/____</p>
                    <p>HORA:___:___</p>
                    <p>KM:________</p>
                  </div>

                  <div>
                    <p>ABASTECIMENTO: VALOR: R$:___________</p>
                    <p>LITROS:_______</p>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        style={{
          marginTop: 20,
          right: 15,
          position: "absolute",
        }}
      >
        <button
          style={{
            background: "red",
            color: "#fff",
            border: "none",
            padding: "9px 20px 9px 20px",
            borderRadius: 11,
            marginRight: 20,
          }}
          className={tbstyle.printButton}
          onClick={closeDiaria}
        >
          Fechar diaria
        </button>
        <button
          style={{
            color: "#fff",
            border: "none",
            padding: "9px 20px 9px 20px",
            borderRadius: 11,
            background: "#406E8E",
          }}
          className={tbstyle.printButton}
          onClick={saveAndPrintDiaria}
        >
          Imprimir diária
        </button>
      </div>
    </div>
  );
}
