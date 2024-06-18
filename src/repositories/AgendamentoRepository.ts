import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Collections } from "../enums/Collections";
import { db } from "../firebase/config";
import { AgendamentoResponseDto } from "../types/AgendamentoResponseDto";
import { AgendamentoRequestDto } from "./../types/AgendamentoRequestDto";

export class AgendamentoRepository {
  async getAll(): Promise<AgendamentoResponseDto[]> {
    const date = new Date();
    const dia = date.getDay();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const todayFormated = `${dia - 1}/${mes}/${ano}`;

    const q = query(
      collection(db, Collections.AGENDAMENTOS),
      where("data", "==", todayFormated)
    );

    try {
      const querySnapshot = await getDocs(q);
      const agendamentos =
        this.queryDocumentSnapshotToAgendamentoMapper(querySnapshot);

      return agendamentos;
    } catch (error) {
      return [];
    }
  }

  private queryDocumentSnapshotToAgendamentoMapper(
    documents: QuerySnapshot<DocumentData, DocumentData>
  ): AgendamentoResponseDto[] {
    var agendamentoList: AgendamentoResponseDto[] = [];

    documents.forEach((doc) => {
      const data = doc.data();
      agendamentoList.push({
        id: doc.id,
        destino: data.clinica_ou_hospital_de_destino,
        contato: data.contato,
        createdAt: data.createdAt,
        data: data.data,
        horario: data.horario,
        motorista: data.motorista,
        nome_paciente: data.nome_paciente,
        observacao: data.observacao,
        possui_acompanhante: data.possui_acompanhante,
        status: data.status,
        veiculo: data.veiculo,
      });
    });

    return agendamentoList;
  }

  async createAgendamento(
    agendamentoRequestDto: AgendamentoRequestDto,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      const docRef = await addDoc(
        collection(db, Collections.AGENDAMENTOS),
        agendamentoRequestDto
      );
      console.log("Document written with ID: ", docRef.id);
      onSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
      onError();
    }
  }
}
