import { addDoc, collection } from "firebase/firestore";
import { Collections } from "../enums/Collections";
import { db } from "../firebase/config";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { ApiUtils } from "../utils/ApiUtils";
import { AgendamentoRequestDto } from "./../types/AgendamentoRequestDto";

export class AgendamentoRepository {
  async getAll(token: string, userId: string) {
    try {
      const res: any = await new ApiUtils().fazerRequisicao(
        `/user/pedidos/${userId}`,
        token
      );
      console.log(res);
      return res as Array<PedidoDoUsuarioResponseDto>;
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

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
