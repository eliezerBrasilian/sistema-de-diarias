import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections } from "../enums/Collections";
import { db } from "../firebase/config";
import { DiariaDto } from "../types/DiariaDto";
import { AppUtils } from "../utils/AppUtils";
import { AgendamentoStatus } from "../enums/AgendamentoStatus";

export class DiariaRepository {
  async getAll(): Promise<DiariaDto[]> {
    const q = query(
      collection(db, Collections.DIARIAS),
      where("data", "==", AppUtils.DateToDayMonthYear(new Date()))
    );

    try {
      const querySnapshot = await getDocs(q);
      const diarias =
        this.queryDocumentSnapshotToDiariaDtoMapper(querySnapshot);

      return diarias;
    } catch (error) {
      return [];
    }
  }

  private queryDocumentSnapshotToDiariaDtoMapper(
    documents: QuerySnapshot<DocumentData, DocumentData>
  ): DiariaDto[] {
    var diariaList: DiariaDto[] = [];

    documents.forEach((doc) => {
      const data = doc.data();
      diariaList.push({
        id: doc.id,
        modelo: data.modelo,
        data: data.data,
        horario: data.horario,
        motorista: data.motorista,
        tipoVeiculo: data.tipoVeiculo,
        placa: data.placa,
        pacientes: data.pacientes,
      });
    });

    return diariaList;
  }

  async createDiaria(
    diaria: DiariaDto,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      const docRef = await addDoc(collection(db, Collections.DIARIAS), diaria);
      console.log("Document written with ID: ", docRef.id);
      onSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
      onError();
    }
  }

  async confirmarIda(
    diariaId: string,
    pacienteId: string,
    observacao: string,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      const diariaRef = doc(db, Collections.DIARIAS, diariaId);
      const diariaSnap = await getDoc(diariaRef);

      const novosDados = {
        observacao: observacao,
        status: AgendamentoStatus.CONFIRMADO,
      };

      if (diariaSnap.exists()) {
        const diariaData = diariaSnap.data() as DiariaDto;
        const pacientesAtualizados = diariaData.pacientes.map((paciente) =>
          paciente.id === pacienteId ? { ...paciente, ...novosDados } : paciente
        );

        await updateDoc(diariaRef, {
          pacientes: pacientesAtualizados,
        });

        console.log("Paciente atualizado com sucesso no Firestore!");
        onSuccess();
      } else {
        console.log("Diária não encontrada!");
        onError();
      }
    } catch (error) {
      console.error("Erro ao atualizar paciente no Firestore: ", error);
      onError();
    }
  }
}
