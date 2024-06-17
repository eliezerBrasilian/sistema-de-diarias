import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Collections } from "../enums/Collections";
import { db } from "../firebase/config";
import { AgendamentoRequestDto } from "./../types/AgendamentoRequestDto";

export class AgendamentoRepository {
  async getAll() {
    const date = new Date()
    const dia = date.getDay();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const todayFormated = `${dia}/${mes}/${ano}`

    const q = query(collection(db, Collections.AGENDAMENTOS), where("data", "==", todayFormated));
  
    try {
       const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    } catch (error) {
      return [];
    }

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
