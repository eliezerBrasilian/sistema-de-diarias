import { PedidoRequestDto } from "./AgendamentoRequestDto";
import { PedidoDoUsuarioResponseDto } from "./PedidoDoUsuarioResponseDto";

export interface PedidoContextInterface {
  //getAllPedidos: () => Promise<void>;
  getAllPedidos: () => void;
  pedidos: Array<PedidoDoUsuarioResponseDto>;
  criar: (
    pedidoObj: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) => void;

  getPedido(id: string): Promise<PedidoDoUsuarioResponseDto | null>;
}
