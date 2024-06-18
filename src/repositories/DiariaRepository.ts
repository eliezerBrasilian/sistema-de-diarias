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
import { DiariaDto } from "../types/DiariaDto";

export class DiariaRepository {
  async getAll(): Promise<DiariaDto[]> {
    const date = new Date();
    const dia = date.getDay();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const todayFormated = `${dia - 1}/${mes}/${ano}`;

    const q = query(
      collection(db, Collections.DIARIAS),
      where("data", "==", todayFormated)
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
}
