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
import { AppUtils } from "../utils/AppUtils";

export class AgendamentoRepository {
  async getAll(date: Date): Promise<AgendamentoResponseDto[]> {
    const q = query(
      collection(db, Collections.AGENDAMENTOS),
      where("data", "==", AppUtils.DateToDayMonthYear(date))
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
        destino: data.destino,
        contato: data.contato,
        createdAt: data.createdAt,
        data: data.data,
        horario: data.horario,
        nome_paciente: data.nome_paciente,
        observacao: data.observacao,
        possui_acompanhante: data.possui_acompanhante,
        status: data.status,
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
